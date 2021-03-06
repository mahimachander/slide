mod pattern;
mod transformer;
pub use pattern::*;
pub use transformer::*;

use crate::scanner::types::{Token, TokenType};

use core::cmp::Ordering;
use core::convert::TryFrom;
use core::fmt;
use std::rc::Rc;

pub trait Grammar
where
    Self: fmt::Display + fmt::Debug,
{
    /// Returns the S-expression form of this expression.
    /// For example, 1 + 1 -> (+ 1 1).
    fn s_form(&self) -> String;
}
pub trait Expression
where
    Self: fmt::Display + From<BinaryExpr<Self>> + From<UnaryExpr<Self>>,
{
    /// Returns whether the expression is a statically-evaluatable constant.
    fn is_const(&self) -> bool;

    /// Paranthesizes `inner`.
    fn paren(inner: Rc<Self>) -> Self;

    /// Brackets `inner`.
    fn bracket(inner: Rc<Self>) -> Self;

    /// Returns an empty expression.
    fn empty() -> Self;
}

#[derive(Clone, Debug)]
pub enum Stmt {
    Expr(Expr),
    Assignment(Assignment),
}

impl Grammar for Stmt {
    fn s_form(&self) -> String {
        match self {
            Self::Expr(expr) => expr.s_form(),
            Self::Assignment(Assignment { var, rhs }) => format!("(= {} {})", var, rhs.s_form()),
        }
    }
}

impl From<Expr> for Stmt {
    fn from(expr: Expr) -> Self {
        Stmt::Expr(expr)
    }
}

impl From<Assignment> for Stmt {
    fn from(asgn: Assignment) -> Self {
        Stmt::Assignment(asgn)
    }
}

impl fmt::Display for Stmt {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use Stmt::*;
        write!(
            f,
            "{}",
            match self {
                Expr(expr) => expr.to_string(),
                Assignment(asgn) => asgn.to_string(),
            }
        )
    }
}

#[derive(Clone, Debug)]
pub struct Assignment {
    pub var: String,
    pub rhs: Rc<Expr>,
}

impl fmt::Display for Assignment {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{} = {}", self.var, self.rhs)
    }
}

#[derive(Clone, PartialEq, Debug)]
pub enum Expr {
    Const(f64),
    Var(String),
    BinaryExpr(BinaryExpr<Self>),
    UnaryExpr(UnaryExpr<Self>),
    /// An expression wrapped in parentheses
    Parend(Rc<Self>),
    /// An expression wrapped in brackets
    Bracketed(Rc<Self>),
}

impl Expr {
    pub fn complexity(&self) -> u8 {
        1 + match self {
            Self::Const(_) => 0,
            Self::Var(_) => 0,
            Self::BinaryExpr(BinaryExpr { lhs, rhs, .. }) => lhs.complexity() + rhs.complexity(),
            Self::UnaryExpr(UnaryExpr { rhs, .. }) => rhs.complexity(),
            Self::Parend(expr) | Self::Bracketed(expr) => expr.complexity(),
        }
    }

    /// Gets the constant value stored in this expression, if any.
    pub fn get_const(&self) -> Option<f64> {
        match self {
            Self::Const(c) => Some(*c),
            _ => None,
        }
    }
}

impl Eq for Expr {}

impl PartialOrd for Expr {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl Ord for Expr {
    // For expression normalization.
    fn cmp(&self, other: &Self) -> Ordering {
        match (self, other) {
            (Self::Var(a), Self::Var(b)) => a.cmp(b),
            (Self::Var(_), Self::Const(_)) => Ordering::Less,
            (Self::Const(a), Self::Const(b)) => a.partial_cmp(b).unwrap(), // assume NaNs don't exist
            (Self::Var(_), Self::UnaryExpr(UnaryExpr { rhs: expr, .. }))
            | (Self::Var(_), Self::Parend(expr))
            | (Self::Var(_), Self::Bracketed(expr))
            | (Self::Const(_), Self::UnaryExpr(UnaryExpr { rhs: expr, .. }))
            | (Self::Const(_), Self::Parend(expr))
            | (Self::Const(_), Self::Bracketed(expr)) => match expr.as_ref() {
                Self::Const(_) | Self::Var(_) => self.cmp(expr),
                _ => Ordering::Less,
            },
            (Self::Const(_), Self::Var(_))
            | (Self::UnaryExpr(_), Self::Var(_))
            | (Self::Parend(_), Self::Var(_))
            | (Self::Bracketed(_), Self::Var(_))
            | (Self::UnaryExpr(_), Self::Const(_))
            | (Self::Parend(_), Self::Const(_))
            | (Self::Bracketed(_), Self::Const(_)) => other.cmp(self).reverse(),
            (Self::Var(_), Self::BinaryExpr(_)) | (Self::Const(_), Self::BinaryExpr(_)) => {
                Ordering::Less
            }
            _ => Ordering::Equal,
        }
    }
}

// TODO: We can do better than hashing to a string as well, but we'll save that til we have an
// arbitrary-precision numeric type.
#[allow(clippy::derive_hash_xor_eq)]
impl core::hash::Hash for Expr {
    fn hash<H: core::hash::Hasher>(&self, state: &mut H) {
        use Expr::*;
        match self {
            // TODO: We can do better than hashing to a string as well, but we'll save that til we
            // have an arbitrary-precision numeric type.
            Const(f) => state.write(f.to_string().as_bytes()),
            Var(v) => v.hash(state),
            BinaryExpr(e) => e.hash(state),
            UnaryExpr(e) => e.hash(state),
            e @ Parend(_) => e.to_string().hash(state),
            e @ Bracketed(_) => e.to_string().hash(state),
        }
    }
}

impl Grammar for Expr {
    fn s_form(&self) -> String {
        match self {
            Self::Const(konst) => konst.to_string(),
            Self::Var(var) => var.to_string(),
            Self::BinaryExpr(BinaryExpr { op, lhs, rhs }) => {
                format!("({} {} {})", op.to_string(), lhs.s_form(), rhs.s_form())
            }
            Self::UnaryExpr(UnaryExpr { op, rhs }) => {
                format!("({} {})", op.to_string(), rhs.s_form())
            }
            Self::Parend(inner) => format!("({})", inner.s_form()),
            Self::Bracketed(inner) => format!("[{}]", inner.s_form()),
        }
    }
}
impl Grammar for Rc<Expr> {
    fn s_form(&self) -> String {
        self.as_ref().s_form()
    }
}

impl Expression for Expr {
    #[inline]
    fn is_const(&self) -> bool {
        matches!(self, Self::Const(_))
    }

    #[inline]
    fn paren(inner: Rc<Self>) -> Self {
        Self::Parend(inner)
    }

    #[inline]
    fn bracket(inner: Rc<Self>) -> Self {
        Self::Bracketed(inner)
    }

    #[inline]
    fn empty() -> Self {
        // Variables must be named, so we can encode an unnamed variable as an empty expression.
        Expr::Var(String::new())
    }
}

impl From<f64> for Expr {
    fn from(f: f64) -> Self {
        Self::Const(f)
    }
}

impl From<BinaryExpr<Self>> for Expr {
    fn from(binary_expr: BinaryExpr<Self>) -> Self {
        Self::BinaryExpr(binary_expr)
    }
}

impl From<UnaryExpr<Self>> for Expr {
    fn from(unary_expr: UnaryExpr<Self>) -> Self {
        Self::UnaryExpr(unary_expr)
    }
}

impl fmt::Display for Expr {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use Expr::*;
        write!(
            f,
            "{}",
            match self {
                Const(num) => num.to_string(),
                Var(var) => var.to_string(),
                BinaryExpr(binary_expr) => binary_expr.to_string(),
                UnaryExpr(unary_expr) => unary_expr.to_string(),
                Parend(expr) => format!("({})", expr.to_string()),
                Bracketed(expr) => format!("[{}]", expr.to_string()),
            }
        )
    }
}

#[derive(PartialEq, Eq, Clone, Copy, Hash, Debug)]
pub enum BinaryOperator {
    // Discrimant values exist for ease of operator partial ordering. See the `PartialOrd` impl
    // below for more details.
    Plus = 1,
    Minus = 2,
    Mult = 10,
    Div = 11,
    Mod = 12,
    Exp = 20,
}

impl PartialOrd for BinaryOperator {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        if self == other {
            return Some(Ordering::Equal);
        }

        let (l, r) = (*self as u8 / 10, *other as u8 / 10);

        match l.cmp(&r) {
            Ordering::Less => Some(Ordering::Less),
            Ordering::Greater => Some(Ordering::Greater),
            _ => None,
        }
    }
}

impl TryFrom<&Token> for BinaryOperator {
    type Error = ();

    fn try_from(token: &Token) -> Result<Self, Self::Error> {
        use BinaryOperator::*;
        match token.ty {
            TokenType::Plus => Ok(Plus),
            TokenType::Minus => Ok(Minus),
            TokenType::Mult => Ok(Mult),
            TokenType::Div => Ok(Div),
            TokenType::Mod => Ok(Mod),
            TokenType::Exp => Ok(Exp),
            _ => Err(()),
        }
    }
}

impl fmt::Display for BinaryOperator {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use BinaryOperator::*;
        write!(
            f,
            "{}",
            match self {
                Plus => "+",
                Minus => "-",
                Mult => "*",
                Div => "/",
                Mod => "%",
                Exp => "^",
            }
        )
    }
}

#[derive(PartialEq, Clone, Hash, Debug)]
pub struct BinaryExpr<E: Expression> {
    pub op: BinaryOperator,
    pub lhs: Rc<E>,
    pub rhs: Rc<E>,
}

macro_rules! mkop {
    ($($op_name:ident: $binop:path)*) => {
    $(
        pub fn $op_name<T, U>(lhs: T, rhs: U) -> Self
        where
            T: Into<Rc<E>>,
            U: Into<Rc<E>>,
        {
            Self {
                op: $binop,
                lhs: lhs.into(),
                rhs: rhs.into(),
            }
        }
    )*
    }
}

impl<E> BinaryExpr<E>
where
    E: Expression,
{
    mkop! {
        mult: BinaryOperator::Mult
        div:  BinaryOperator::Div
        exp:  BinaryOperator::Exp
    }
}

macro_rules! display_binary_expr {
    (<$expr:ident>) => {
        impl fmt::Display for BinaryExpr<$expr> {
            fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
                let mut result = String::with_capacity(128);
                use $expr::*;
                let format_arg = |arg: &Rc<$expr>| match arg.as_ref() {
                    BinaryExpr(l) => {
                        if l.op < self.op {
                            format!("({})", l)
                        } else {
                            l.to_string()
                        }
                    }
                    expr => expr.to_string(),
                };
                result.push_str(&format!(
                    "{} {} {}",
                    format_arg(&self.lhs),
                    self.op,
                    format_arg(&self.rhs)
                ));
                f.write_str(&result)
            }
        }
    };
}

display_binary_expr!(<Expr>);
display_binary_expr!(<ExprPat>);

#[derive(PartialEq, Clone, Copy, Hash, Debug)]
pub enum UnaryOperator {
    SignPositive,
    SignNegative,
}

impl TryFrom<&Token> for UnaryOperator {
    type Error = ();

    fn try_from(token: &Token) -> Result<Self, Self::Error> {
        use UnaryOperator::*;
        match token.ty {
            TokenType::Plus => Ok(SignPositive),
            TokenType::Minus => Ok(SignNegative),
            _ => Err(()),
        }
    }
}

impl fmt::Display for UnaryOperator {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use UnaryOperator::*;
        write!(
            f,
            "{}",
            match self {
                SignPositive => "+",
                SignNegative => "-",
            }
        )
    }
}

#[derive(PartialEq, Clone, Hash, Debug)]
pub struct UnaryExpr<E: Expression> {
    pub op: UnaryOperator,
    pub rhs: Rc<E>,
}

impl<E> UnaryExpr<E>
where
    E: Expression,
{
    pub fn negate<T>(expr: T) -> Self
    where
        T: Into<Rc<E>>,
    {
        Self {
            op: UnaryOperator::SignNegative,
            rhs: expr.into(),
        }
    }
}

macro_rules! display_unary_expr {
    (<$expr:ident>) => {
        impl fmt::Display for UnaryExpr<$expr> {
            fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
                let mut result = String::with_capacity(128);
                use $expr::*;
                let format_arg = |arg: &Rc<$expr>| match arg.as_ref() {
                    BinaryExpr(l) => format!("({})", l),
                    expr => expr.to_string(),
                };
                result.push_str(&format!("{}{}", self.op, format_arg(&self.rhs)));
                f.write_str(&result)
            }
        }
    };
}

display_unary_expr!(<Expr>);
display_unary_expr!(<ExprPat>);
