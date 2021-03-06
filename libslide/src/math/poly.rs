#![allow(clippy::should_implement_trait)]

use crate::grammar::{BinaryExpr, BinaryOperator, Expr, Expression};
use crate::math::gcd;
use crate::partial_evaluator::flatten::flatten_expr;
use crate::utils::{get_flattened_binary_args, unflatten_binary_expr, UnflattenStrategy};

use core::cmp::{max, min};
use std::collections::{HashMap, HashSet};
use std::rc::Rc;

#[derive(Default, Clone, Eq, PartialEq, Debug)]
pub struct Poly {
    pub vec: Vec<isize>,
}

impl From<Vec<isize>> for Poly {
    fn from(v: Vec<isize>) -> Poly {
        Self::new(v)
    }
}

impl From<&Vec<isize>> for Poly {
    fn from(v: &Vec<isize>) -> Poly {
        Self::new(v.clone())
    }
}

/// Creates a new polynomial.
///
/// # Examples:
///
/// ```ignore
/// poly![1, 2, -4]; // x^2 + 2x - 4
/// poly![]; // empty polynomial
/// ```
#[macro_export]
macro_rules! poly {
    ($($x:expr),+ $(,)?) => (
        Poly::new(vec![$($x),+])
    );

    () => {
        Poly::empty()
    };
}

impl Poly {
    pub fn new(vec: Vec<isize>) -> Self {
        Self { vec }
    }

    pub fn empty() -> Self {
        Self::new(vec![])
    }

    #[inline]
    pub fn is_empty(&self) -> bool {
        self.vec.is_empty() || self.vec.iter().all(|&n| n == 0)
    }

    #[inline]
    pub fn is_one(&self) -> bool {
        let is_one = self.vec.last() == Some(&1);
        for coeff in self.vec.iter().rev().skip(1) {
            if coeff != &0 {
                // A higher-order term has a non-zero coefficient.
                return false;
            }
        }
        is_one
    }

    /// Gets the degree of the polynomial.
    #[inline]
    pub fn deg(&self) -> isize {
        self.vec.len() as isize - 1
    }

    /// Returns the [primitive polynomial] of `self` over the integers.
    ///
    /// # Examples:
    ///
    /// ```ignore
    /// // 6x^2 + 4x + 2 -> 3x^2 + 2x + 1
    /// assert_eq!(poly![6, 4, 2], poly![3, 2, 1]);
    /// ```
    ///
    /// [primitive polynomial]: https://en.wikipedia.org/wiki/Primitive_part_and_content
    pub fn primitive(self) -> Self {
        if self.is_empty() {
            return self;
        }
        let largest_gcd = self
            .vec
            .iter()
            .fold(self.vec[0].abs() as usize, |largest_gcd, item| {
                gcd(item.abs() as usize, largest_gcd)
            }) as isize;

        if largest_gcd == 1 {
            self
        } else {
            Poly::new(self.vec.iter().map(|e| e / largest_gcd).collect())
        }
    }

    /// Adds a term of form `coeff`x^`pow` to `self`.
    ///
    /// # Examples:
    ///
    /// ```ignore
    /// // (x + 2) + 3x^2 -> 3x^2 + x + 2
    /// assert_eq!(poly![1, 2].add_term(3, 2), poly![3, 1, 2]);
    /// ```
    fn add_term(mut self, coeff: isize, pow: isize) -> Self {
        if coeff == 0 {
            return self;
        }

        let deg = self.deg();
        if pow == deg {
            // (x^2 + 2x + 3) + x^2
            self.vec[0] += coeff;
        } else if pow >= deg {
            // (x^2 + 2x + 3) + x^4
            // [1, 2, 3] -> [3, 2, 1] -> [3, 2, 1, 0] :: [1] -> [3, 2, 1, 0, 4] -> [1, 0, 1, 2, 3]
            let extra_needed = pow - self.deg() - 1;
            let extended = self
                .vec
                .into_iter()
                .rev()
                .chain(vec![0; extra_needed as usize].into_iter())
                .chain(vec![coeff].into_iter());
            self.vec = extended.rev().collect();
        } else {
            // (x^2 + 2x + 3) + 2x
            self.vec[(deg - pow) as usize] += coeff;
        }
        self
    }

    /// Multiplies a term of form `coeff`x^`pow` to `self`.
    ///
    /// # Examples:
    ///
    /// ```ignore
    /// // (x + 2) * 3x^2 -> 3x^3 + 6x^2
    /// assert_eq!(poly![1, 2].mul_term(3, 2), poly![3, 6, 0, 0]);
    /// ```
    fn mul_term(mut self, coeff: isize, pow: isize) -> Self {
        if coeff == 0 || self.is_empty() {
            return Poly::empty();
        }
        for term in self.vec.iter_mut() {
            *term *= coeff;
        }
        for _ in 0..pow {
            self.vec.push(0);
        }
        self
    }

    /// Negates each term of the polynomial.
    #[inline]
    fn negate(self) -> Self {
        self.mul_scalar(-1)
    }

    /// Multiplies each term in the polynomial by a scalar.
    #[inline]
    pub fn mul_scalar(mut self, c: isize) -> Self {
        for term in self.vec.iter_mut() {
            *term *= c;
        }
        self
    }

    /// Divides each term in the polynomial by a scalar.
    /// If the scalar divisor is 0, an error is returned.
    pub fn div_scalar(self, c: isize) -> Result<Self, &'static str> {
        if c == 0 {
            Err("Cannot divide a polynomial by 0")
        } else {
            Ok(self.mul_scalar(1 / c))
        }
    }

    /// Subtracts `other` from `self`, yielding a new polynomial.
    ///
    /// # Examples:
    ///
    /// ```ignore
    /// // (x + 2) - (3x^2 + 2x) -> -3x^2 - x + 2
    /// assert_eq!(poly![1, 2].sub(poly![3, 2, 0]), poly![-3, -1, 2]);
    /// ```
    fn sub(mut self, other: Self) -> Self {
        if other.vec.is_empty() {
            return other.negate();
        }
        if other.vec.is_empty() {
            return self;
        }
        let d_self = self.deg();
        let d_other = other.deg();
        if d_self == d_other {
            for i in (0..self.vec.len()).rev() {
                self.vec[i] -= other.vec[i];
            }
            self.truncate_zeros()
        } else {
            let mut lhs = self.vec;
            let mut rhs = other.vec;
            let extra_terms = (d_self as isize - d_other as isize).abs() as usize;
            let mut new_poly: Poly;
            if d_self > d_other {
                // (x^2 + x + 1) - (x + 1)
                new_poly = Poly::new(lhs[..extra_terms].to_vec()); // push extra terms not in `other`
                lhs = lhs[extra_terms..].to_vec();
            } else {
                // (x + 1) - (x^2 + x + 1)
                new_poly = Poly::new(rhs[..extra_terms].to_vec()).negate(); // push extra terms not in `self`
                rhs = rhs[extra_terms..].to_vec();
            }
            for i in 0..min(lhs.len(), rhs.len()) {
                lhs[i] -= rhs[i];
            }
            new_poly.vec.append(&mut lhs);

            new_poly.truncate_zeros()
        }
    }

    /// Removes leading zero terms in a polynomial.
    #[inline]
    fn truncate_zeros(mut self) -> Self {
        let mut count = 0;
        for i in &self.vec {
            if *i == 0 {
                count += 1;
            } else {
                break;
            }
        }
        self.vec = self.vec.into_iter().skip(count).collect();
        self
    }

    /// Divides one polynomial by another, returning a tuple of (quotient, remainder) or an error
    /// if division failed.
    ///
    /// # Examples:
    ///
    /// ```ignore
    /// // (x^2 - 4) / (x + 2) -> ((x - 2), 0)
    /// assert_eq!(poly![1, 0, -4].div(poly![1, 2]), Ok((poly![1, -2], poly![])));
    ///
    /// // (x^2 - 2x) / (x + 1) -> ((x - 3), 3)
    /// assert_eq!(poly![1, 0, -2].div(poly![1, 1]), Ok((poly![1, -3], poly![3])));
    /// ```
    pub fn div(self, other: Poly) -> Result<(Self, Self), &'static str> {
        let d_self = self.deg();
        let d_other = other.deg();
        if other.vec.is_empty() {
            return Err("Cannot divide by a 0 polynomial");
        } else if d_self < d_other {
            return Ok((poly![], Poly::new(self.vec)));
        }
        let lc_other = other.lc();
        let mut rem_poly = self;
        let mut d_rem = d_self;
        let mut quo = poly![];
        loop {
            let lc_rem = rem_poly.lc();
            // Currently, this only supports integer division.
            // TODO: Expand this to handle fractions.
            if lc_rem % lc_other != 0 {
                // The current iteration won't divide evenly, so we're done.
                // TODO: above
                break;
            }
            let cur_term_coeff = lc_rem / lc_other;
            quo = quo.add_term(cur_term_coeff, d_rem - d_other);

            rem_poly = rem_poly.sub(
                // Subtract (current term coeff * rhs) from the rest of polynomial we need to
                // divide.
                other.clone().mul_term(cur_term_coeff, d_rem - d_other),
            );

            let d_rem_old = d_rem;
            d_rem = rem_poly.deg();
            if d_rem < d_other {
                break;
            } else if d_rem >= d_rem_old {
                return Err("Unexpected state: remainder degreee not lower after division");
            }
        }
        Ok((quo, rem_poly))
    }

    /// Returns the max norm of a polynomial.
    /// This is equivalent to the largest absolute value of each term's coefficient.
    pub fn max_norm(&self) -> usize {
        let mut max_n = 0;
        for i in &self.vec {
            max_n = max(max_n, i.abs() as usize);
        }
        max_n
    }

    /// Returns the leading coefficient, i.e. the coefficient of the highest-degree term, of the
    /// polynomial.
    /// If the polynomial is empty, the leading coefficient is 0.
    #[inline]
    pub fn lc(&self) -> isize {
        *self.vec.get(0).unwrap_or(&0)
    }

    /// Evaluates the polynomial at a value `x`.
    ///
    /// # Examples:
    ///
    /// ```ignore
    /// // (x^2 - 4)(1) -> -3
    /// assert_eq!(poly![1, 0, -4].eval(1), -3);
    /// ```
    #[inline]
    pub fn eval(&self, x: isize) -> isize {
        self.vec.iter().fold(0, |mut res, &n| {
            res *= x;
            res + n
        })
    }

    /// Transforms an expression into a polynomial relative to some term.
    /// If `relative_to` is not none, the constructed polynomial will be relative to that term.
    /// Otherwise, the polynomial will be relative to the term in the expression sequence.
    ///
    /// If transformation is successful, the return value is a tuple of (polynomial, relative term).
    /// Transformation may fail for a number of reasons, including the expression containing a
    /// non-unique term, consisting of non-integer coefficients, or non-integer exponents.
    ///
    /// ## Examples
    ///
    /// ```ignore
    /// from_expr("x + 2x^2", None) == Some(poly![2, 1, 0], Some(Var("x")))
    /// from_expr("5", None) == Some(poly![5], None)
    /// from_expr("x + 2x^2", Some(Var("x"))) == Some(poly![2, 1, 0], Some(Var("x")))
    /// from_expr("y + 2y^2", Some(Var("x"))) == None
    /// from_expr("2.5x", None) == None
    /// from_expr("x^{2.5}", None) == None
    /// from_expr("x^{-2}", None) == None
    /// ```
    pub fn from_expr(
        expr: &Rc<Expr>,
        relative_to: Option<&Rc<Expr>>,
    ) -> Result<(Self, Option<Rc<Expr>>), String> {
        // First, let's try to flatten the expression which will automatically combine terms for
        // us. If the expr is an addition or subtraction, this will also normalize it to an
        // addition.
        let expr = flatten_expr(&Rc::clone(expr));
        // Next, let's unroll the addition into its individual polynomial parts.
        // TODO: we should really rename this, it overlaps with `flatten_expr`.
        // TODO: we can more efficient by getting the unrolled args during flattening, skipping
        //       this step
        let poly_parts = get_flattened_binary_args(expr, BinaryOperator::Plus);

        let mut uniq_terms = HashSet::<&Rc<Expr>>::new();
        // Polynomial degree -> coefficient for that term
        let mut degree_coeffs = HashMap::<usize, isize>::new();
        if let Some(ref term) = relative_to {
            uniq_terms.insert(term);
        }
        let mut konst_f64 = 0.;
        for poly_part in poly_parts.iter() {
            match poly_part.as_ref() {
                Expr::Const(c) => konst_f64 += c,
                Expr::BinaryExpr(BinaryExpr {
                    op: BinaryOperator::Mult,
                    lhs,
                    rhs,
                }) if lhs.is_const() || rhs.is_const() => {
                    let (c_f64, term) = if lhs.is_const() {
                        (lhs.get_const().unwrap(), rhs)
                    } else {
                        (rhs.get_const().unwrap(), lhs)
                    };
                    let coeff = c_f64 as isize;
                    if (coeff as f64 - c_f64).abs() > std::f64::EPSILON {
                        // Currently we only support `isize` for polynomial coefficients, so bail
                        // out if the conversion is lossy.
                        return Err(format!("Expected an integer coefficient for {}", poly_part));
                    }

                    // Get the raw term and exponent.
                    let (term, pow) = term_and_pow_from_expr(term)?;

                    degree_coeffs.insert(pow, coeff);
                    uniq_terms.insert(term);
                }

                // TODO: we should probably be smarter with other terms, and even multiplication.
                _ => {
                    let (term, pow) = term_and_pow_from_expr(poly_part)?;
                    // We couldn't unroll the coefficient in the above match, so make it one here.
                    degree_coeffs.insert(pow, 1);
                    uniq_terms.insert(term);
                }
            }

            if uniq_terms.len() > 1 {
                // Polynomials should be based on a singular unique term.
                return Err(format!(
                    "Expected a singular unique term, found {}: {:#?}",
                    uniq_terms.len(),
                    uniq_terms
                ));
            }
        }

        let konst = konst_f64 as isize;
        if (konst as f64 - konst_f64).abs() > std::f64::EPSILON {
            return Err(format!("Expected an integer constant, got {}", konst_f64));
        }

        let degree = degree_coeffs.keys().max();
        match degree {
            None => {
                // There are no explicit terms in the polynomial, just return the constant or an
                // empty polynomial.
                let poly = if konst == 0 { poly![] } else { poly![konst] };
                Ok((poly, None))
            }
            Some(degree) => {
                let len = degree + 1;
                let mut poly = vec![0; len];
                for (pow, coeff) in degree_coeffs.into_iter() {
                    poly[len - pow - 1] = coeff;
                }
                poly[len - 1] = konst;
                Ok((
                    Self::new(poly),
                    uniq_terms.into_iter().next().map(Rc::clone),
                ))
            }
        }
    }

    /// Converts a polynomial, relative to some term, into an expression.
    ///
    /// ## Examples
    ///
    /// ```ignore
    /// poly![3, 2, 1].to_expr("x") == "3 * (x ^ 2) + 2 * x + 1"
    /// ```
    pub fn to_expr(&self, relative_to: &Rc<Expr>) -> Rc<Expr> {
        let mut terms = Vec::with_capacity(self.vec.len());
        for (pow, coeff) in self.vec.iter().rev().enumerate() {
            let term = match coeff {
                0 => {
                    continue;
                }
                1 => Rc::clone(relative_to),
                _ => Rc::new(Expr::BinaryExpr(BinaryExpr::mult(
                    Expr::Const(*coeff as f64),
                    Rc::clone(relative_to),
                ))),
            };

            terms.push(match pow {
                0 => Rc::new(Expr::Const(*coeff as f64)),
                1 => term,
                _ => Rc::new(Expr::BinaryExpr(BinaryExpr::exp(
                    term,
                    Rc::new(Expr::Const(pow as f64)),
                ))),
            });
        }
        if terms.is_empty() {
            return Rc::new(Expr::Const(0.));
        }

        unflatten_binary_expr(
            terms.as_ref(),
            BinaryOperator::Plus,
            UnflattenStrategy::Left,
        )
    }
}

/// Gets the term and power of an expression.
/// Returns None if the power is not a positive integer.
fn term_and_pow_from_expr(expr: &Rc<Expr>) -> Result<(&Rc<Expr>, usize), String> {
    match expr.as_ref() {
        Expr::BinaryExpr(BinaryExpr {
            op: BinaryOperator::Exp,
            lhs,
            rhs,
        }) if rhs.is_const() => {
            let (pow_f64, term) = (rhs.get_const().unwrap(), lhs);
            let pow = pow_f64 as usize;
            if (pow as f64 - pow_f64).abs() > std::f64::EPSILON {
                // And we only support integer powers in the polynomial.
                return Err(format!("Expected a positive term degree for {}", expr));
            }
            Ok((term, pow))
        }
        // If there is no explicit exponentiation, just treat the whole expression
        // as a term.
        _ => Ok((expr, 1)),
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::parse_expr;

    #[test]
    fn add_1() {
        assert_eq!(poly![2, -1].add_term(2, 4), poly![2, 0, 0, 2, -1]);
    }

    #[test]
    fn add_2() {
        assert_eq!(poly![2, -1].add_term(2, 1), poly![4, -1]);
    }

    #[test]
    fn add_3() {
        assert_eq!(poly![3, 0, 5].add_term(2, 1), poly![3, 2, 5]);
    }

    #[test]
    fn mul_1() {
        assert_eq!(poly![3, 0, 5].mul_term(0, 2), poly![]);
    }

    #[test]
    fn mul_2() {
        assert_eq!(poly![3, 0, 5].mul_term(2, 2), poly![6, 0, 10, 0, 0]);
    }

    #[test]
    fn sub_1() {
        assert_eq!(poly![3, 0, 5].sub(poly![1, 0, 1]), poly![2, 0, 4]);
    }

    #[test]
    fn sub_2() {
        assert_eq!(poly![1, 0, -1].sub(poly![1, -2]), poly![1, -1, 1]);
    }

    #[test]
    fn sub_3() {
        assert_eq!(poly![1, 0, -1].sub(poly![1, -1, 0]), poly![1, -1]);
    }

    #[test]
    fn sub_4() {
        assert_eq!(poly![1, 0, -1].sub(poly![2, 3]), poly![1, -2, -4]);
    }

    #[test]
    fn sub_5() {
        assert_eq!(poly![2, 3].sub(poly![1, 0, -1]), poly![-1, 2, 4]);
    }

    #[test]
    fn div_1() {
        assert_eq!(
            poly![1, 0, -1].div(poly![2, -4]).unwrap(),
            (poly![], poly![1, 0, -1])
        );
    }

    #[test]
    fn div_2() {
        assert_eq!(
            poly![1, 0, -1].div(poly![1, -1]).unwrap(),
            (poly![1, 1], poly![])
        )
    }

    #[test]
    fn is_one() {
        let cases = [
            (poly![1], true),
            (poly![0, 0, 0, 0, 1], true),
            (poly![0, 1, 0, 0, 1], false),
            (poly![0, 0, 0, 0, 0], false),
            (poly![2], false),
            (poly![], false),
        ];
        for (poly, is_one) in cases.iter() {
            assert_eq!(poly.is_one(), *is_one);
        }
    }

    macro_rules! poly_from_expr_tests {
        ($($case:ident: $expr:expr => $expected:expr)*) => {
        $(
            poly_from_expr_tests!($case: $expr, None => $expected);
        )*
        };

        ($($case:ident: $expr:expr, $relative:expr => $expected:expr)*) => {
        $(
            #[test]
            fn $case() {
                let expr = parse_expr!($expr);
                let relative: Option<&str> = $relative;
                let has_relative = relative.is_some();
                let rel = relative.map(|r: &str| parse_expr!(r)).unwrap_or(Rc::new(Expr::empty()));
                let rel_opt = if has_relative { Some(&rel) } else { None };
                let poly = Poly::from_expr(&expr, rel_opt).ok().map(|(p, t)| (p, t.map(|expr| expr.to_string())));
                assert_eq!(poly, $expected);
            }
        )*
        };
    }

    poly_from_expr_tests! {
        empty: "0" => Some((poly![], None))
        konst: "1 + 2" => Some((poly![3], None))
        single_deg: "x" => Some((poly![1, 0], Some("x".to_string())))
        multi_deg: "10 + x + x^2 + x^4 + x^8" => Some((poly![1, 0, 0, 0, 1, 0, 1, 1, 10], Some("x".to_string())))
        with_coeff: "2x + x^3 + 10x^2 + 5x^4" => Some((poly![5, 1, 10, 2, 0], Some("x".to_string())))
        complex_term: "2(x + y ^ z) + 5(x + y ^ z)^3" => Some((poly![5, 0, 2, 0], Some("(x + y ^ z)".to_string())))
        multi_term: "10 + x + y^2" => None
        // TODO: this doesn't work yet, `flatten` and/or Poly::from_expr need to be smarter about unaries
        // add_and_sub: "10 + x - 2x^2 + 3x^4 - 4x^8" => Some((poly![1, 0, 0, 0, 1, 0, 1, 1, 10], Some("x".to_string())))
    }

    poly_from_expr_tests! {
        relative: "10 + x + x^2 + x^4", Some("x") => Some((poly![1, 0, 1, 1, 10], Some("x".to_string())))
        relative_fails: "10 + x + x^2 + x^4", Some("y") => None
    }

    macro_rules! poly_to_expr_tests {
        ($($case:ident: $poly:expr, $relative:expr => $expected:expr)*) => {
        $(
            #[test]
            fn $case() {
                let rel = parse_expr!($relative);
                let expr = $poly.to_expr(&rel);
                assert_eq!(expr.to_string(), $expected);
            }
        )*
        };
    }

    poly_to_expr_tests! {
        to_empty: poly![], "x" => "0"
        to_empty_all_zeros: poly![0, 0, 0, 0], "x" => "0"
        zero_coefficient: poly![0, 10], "x" => "10"
        one_coefficient: poly![1, 0, 1, 1, 5], "x" => "5 + x + x ^ 2 + x ^ 4"
        larger_coefficient: poly![5, 4, 3, 2, 1], "x" => "1 + 2 * x + (3 * x) ^ 2 + (4 * x) ^ 3 + (5 * x) ^ 4"
    }
}
