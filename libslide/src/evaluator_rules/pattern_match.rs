use crate::grammar::*;
use crate::utils::hash;

use std::collections::HashMap;
use std::rc::Rc;

/// Represents pattern-matched replacements betwen a rule and a target expression.
///
/// The rhs of a rule may be transfomed with an instance of `PatternMatch` to obtain the result of a
/// rule applied on a target expression.
pub struct PatternMatch<E: Expression> {
    map: HashMap<
        u64,   // pointer to rule pattern, like #a
        Rc<E>, // target expr,             like 10
    >,
}

impl<E: Expression> Default for PatternMatch<E> {
    fn default() -> Self {
        Self {
            map: HashMap::new(),
        }
    }
}

pub trait MatchRule<E: Expression> {
    /// Pattern matches a rule template against an expression. If successful, the results of the
    /// matching are returned as a mapping of rule to target expressions replacements.
    ///
    /// A sucessful pattern matching is one that matches the target expression wholly, abiding the
    /// expression pattern matching rules.
    fn match_rule(rule: Rc<ExprPat>, target: Rc<E>) -> Option<PatternMatch<E>>;
}

impl MatchRule<Expr> for PatternMatch<Expr> {
    fn match_rule(rule: Rc<ExprPat>, target: Rc<Expr>) -> Option<PatternMatch<Expr>> {
        match (rule.as_ref(), target.as_ref()) {
            // The happiest path -- if a pattern matches an expression, return replacements for it!
            (ExprPat::VarPat(_), Expr::Var(_))
            | (ExprPat::ConstPat(_), Expr::Const(_))
            | (ExprPat::AnyPat(_), _) => {
                let mut replacements = PatternMatch::default();
                replacements.insert(&rule, target);
                Some(replacements)
            }
            (ExprPat::Const(a), Expr::Const(b)) => {
                if (a - b).abs() > std::f64::EPSILON {
                    // Constants don't match; rule can't be applied.
                    return None;
                }
                // Constant values are... constant, so there is no need to replace them.
                Some(PatternMatch::default())
            }
            (ExprPat::BinaryExpr(rule), Expr::BinaryExpr(expr)) => {
                if rule.op != expr.op {
                    return None;
                }
                // Expressions are of the same type; match the rest of the expression by recursing on
                // the arguments.
                let replacements_lhs =
                    Self::match_rule(Rc::clone(&rule.lhs), Rc::clone(&expr.lhs))?;
                let replacements_rhs =
                    Self::match_rule(Rc::clone(&rule.rhs), Rc::clone(&expr.rhs))?;
                PatternMatch::try_merge(replacements_lhs, replacements_rhs)
            }
            (ExprPat::UnaryExpr(rule), Expr::UnaryExpr(expr)) => {
                if rule.op != expr.op {
                    return None;
                }
                // Expressions are of the same type; match the rest of the expression by recursing on
                // the argument.
                Self::match_rule(Rc::clone(&rule.rhs), Rc::clone(&expr.rhs))
            }
            (ExprPat::Parend(rule), Expr::Parend(expr)) => {
                Self::match_rule(Rc::clone(rule), Rc::clone(expr))
            }
            (ExprPat::Bracketed(rule), Expr::Bracketed(expr)) => {
                Self::match_rule(Rc::clone(rule), Rc::clone(expr))
            }
            _ => None,
        }
    }
}

impl MatchRule<ExprPat> for PatternMatch<ExprPat> {
    fn match_rule(rule: Rc<ExprPat>, target: Rc<ExprPat>) -> Option<PatternMatch<ExprPat>> {
        match (rule.as_ref(), target.as_ref()) {
            (ExprPat::VarPat(_), ExprPat::VarPat(_))
            | (ExprPat::ConstPat(_), ExprPat::ConstPat(_))
            | (ExprPat::AnyPat(_), _) => {
                let mut replacements = PatternMatch::default();
                replacements.insert(&rule, target);
                Some(replacements)
            }
            (ExprPat::Const(a), ExprPat::Const(b)) => {
                if (a - b).abs() > std::f64::EPSILON {
                    return None;
                }
                Some(PatternMatch::default())
            }
            (ExprPat::BinaryExpr(rule), ExprPat::BinaryExpr(expr)) => {
                if rule.op != expr.op {
                    return None;
                }
                let replacements_lhs =
                    Self::match_rule(Rc::clone(&rule.lhs), Rc::clone(&expr.lhs))?;
                let replacements_rhs =
                    Self::match_rule(Rc::clone(&rule.rhs), Rc::clone(&expr.rhs))?;
                PatternMatch::try_merge(replacements_lhs, replacements_rhs)
            }
            (ExprPat::UnaryExpr(rule), ExprPat::UnaryExpr(expr)) => {
                if rule.op != expr.op {
                    return None;
                }
                Self::match_rule(Rc::clone(&rule.rhs), Rc::clone(&expr.rhs))
            }
            (ExprPat::Parend(rule), ExprPat::Parend(expr)) => {
                Self::match_rule(Rc::clone(rule), Rc::clone(expr))
            }
            (ExprPat::Bracketed(rule), ExprPat::Bracketed(expr)) => {
                Self::match_rule(Rc::clone(rule), Rc::clone(expr))
            }
            _ => None,
        }
    }
}

impl Transformer<Rc<ExprPat>, Rc<Expr>> for PatternMatch<Expr> {
    /// Transforms a pattern expression into an expression by replacing patterns with target
    /// expressions known by the [`PatternMatch`].
    ///
    /// This transformation can be used to apply a rule on an expression by transforming the RHS
    /// using patterns matched between the LHS of the rule and the target expression.
    ///
    /// [`PatternMatch`]: PatternMatch
    fn transform(&self, item: Rc<ExprPat>) -> Rc<Expr> {
        fn transform(
            repls: &PatternMatch<Expr>,
            item: Rc<ExprPat>,
            cache: &mut HashMap<u64, Rc<Expr>>,
        ) -> Rc<Expr> {
            if let Some(result) = cache.get(&hash(item.as_ref())) {
                return Rc::clone(result);
            }

            let transformed = match item.as_ref() {
                ExprPat::VarPat(_) | ExprPat::ConstPat(_) | ExprPat::AnyPat(_) => {
                    match repls.map.get(&hash(&item)) {
                        Some(transformed) => Rc::clone(transformed),

                        // A pattern can only be transformed into an expression if it has an
                        // expression replacement. Patterns are be validated before transformation,
                        // so this branch should never be hit.
                        None => unreachable!(),
                    }
                }

                ExprPat::Const(f) => Expr::Const(*f).into(),
                ExprPat::BinaryExpr(binary_expr) => Expr::BinaryExpr(BinaryExpr {
                    op: binary_expr.op,
                    lhs: transform(repls, Rc::clone(&binary_expr.lhs), cache),
                    rhs: transform(repls, Rc::clone(&binary_expr.rhs), cache),
                })
                .into(),
                ExprPat::UnaryExpr(unary_expr) => Expr::UnaryExpr(UnaryExpr {
                    op: unary_expr.op,
                    rhs: transform(repls, Rc::clone(&unary_expr.rhs), cache),
                })
                .into(),
                ExprPat::Parend(expr) => {
                    let inner = transform(repls, Rc::clone(expr), cache);
                    Expr::Parend(inner).into()
                }
                ExprPat::Bracketed(expr) => {
                    let inner = transform(repls, Rc::clone(expr), cache);
                    Expr::Bracketed(inner).into()
                }
            };

            let result = cache
                .entry(hash(item.as_ref()))
                .or_insert_with(|| transformed);
            Rc::clone(result)
        }

        // Expr pointer -> transformed expression. Assumes that transient expressions of the same
        // value are reference counters pointing to the same underlying expression. This is done
        // via common subexpression elimination during parsing.
        let mut cache = HashMap::new();
        transform(self, item, &mut cache)
    }
}

impl Transformer<Rc<ExprPat>, Rc<ExprPat>> for PatternMatch<ExprPat> {
    fn transform(&self, item: Rc<ExprPat>) -> Rc<ExprPat> {
        fn transform(
            repls: &PatternMatch<ExprPat>,
            item: Rc<ExprPat>,
            cache: &mut HashMap<u64, Rc<ExprPat>>,
        ) -> Rc<ExprPat> {
            if let Some(result) = cache.get(&hash(item.as_ref())) {
                return Rc::clone(result);
            }

            let transformed = match item.as_ref() {
                ExprPat::VarPat(_) | ExprPat::ConstPat(_) | ExprPat::AnyPat(_) => {
                    match repls.map.get(&hash(&item)) {
                        Some(transformed) => Rc::clone(transformed),
                        None => unreachable!(),
                    }
                }

                ExprPat::Const(f) => ExprPat::Const(*f).into(),
                ExprPat::BinaryExpr(binary_expr) => ExprPat::BinaryExpr(BinaryExpr {
                    op: binary_expr.op,
                    lhs: transform(repls, Rc::clone(&binary_expr.lhs), cache),
                    rhs: transform(repls, Rc::clone(&binary_expr.rhs), cache),
                })
                .into(),
                ExprPat::UnaryExpr(unary_expr) => ExprPat::UnaryExpr(UnaryExpr {
                    op: unary_expr.op,
                    rhs: transform(repls, Rc::clone(&unary_expr.rhs), cache),
                })
                .into(),
                ExprPat::Parend(expr) => {
                    let inner = transform(repls, Rc::clone(expr), cache);
                    ExprPat::Parend(inner).into()
                }
                ExprPat::Bracketed(expr) => {
                    let inner = transform(repls, Rc::clone(expr), cache);
                    ExprPat::Bracketed(inner).into()
                }
            };

            let result = cache
                .entry(hash(item.as_ref()))
                .or_insert_with(|| transformed);
            Rc::clone(result)
        }

        // ExprPat pointer -> transformed expression. Assumes that transient expressions of the same
        // value are reference counters pointing to the same underlying expression. This is done
        // via common subexpression elimination during parsing.
        let mut cache = HashMap::new();
        transform(self, item, &mut cache)
    }
}

impl<E: Expression + Eq> PatternMatch<E> {
    /// Merges two `PatternMatch`. If the `PatternMatch` are of incompatible state (i.e. contain
    /// different mappings), merging fails and nothing is returned.
    fn try_merge(left: PatternMatch<E>, right: PatternMatch<E>) -> Option<PatternMatch<E>> {
        let mut replacements = left;
        for (from, to_r) in right.map.into_iter() {
            if let Some(to_l) = replacements.map.get(&from) {
                if to_r != *to_l {
                    // Replacement already exists and its value does not match exactly; bail out.
                    return None;
                }
                continue; // no need to insert replacement again
            }
            // Replacement is new, add it.
            replacements.map.insert(from, to_r);
        }
        Some(replacements)
    }

    fn insert(&mut self, k: &Rc<ExprPat>, v: Rc<E>) -> Option<Rc<E>> {
        self.map.insert(hash(k.as_ref()), v)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{parse_expression, parse_expression_pattern, scan};

    fn parse_rule(prog: &str) -> ExprPat {
        let (expr, _) = parse_expression_pattern(scan(prog).tokens);
        expr.as_ref().clone()
    }

    fn parse_expr(prog: &str) -> Expr {
        match parse_expression(scan(prog).tokens) {
            (Stmt::Expr(expr), _) => expr,
            _ => unreachable!(),
        }
    }

    mod replacements {
        use super::*;

        #[test]
        fn try_merge() {
            let a = Rc::new(ExprPat::VarPat("a".into()));
            let b = Rc::new(ExprPat::VarPat("b".into()));
            let c = Rc::new(ExprPat::VarPat("c".into()));

            let mut left = PatternMatch::default();
            left.insert(&a, Expr::Const(1.).into());
            left.insert(&b, Expr::Const(2.).into());

            let mut right = PatternMatch::default();
            right.insert(&b, Expr::Const(2.).into());
            right.insert(&c, Expr::Const(3.).into());

            let merged = PatternMatch::try_merge(left, right).unwrap();
            assert_eq!(merged.map.len(), 3);
            assert_eq!(merged.map.get(&hash(&a)).unwrap().to_string(), "1");
            assert_eq!(merged.map.get(&hash(&b)).unwrap().to_string(), "2");
            assert_eq!(merged.map.get(&hash(&c)).unwrap().to_string(), "3");
        }

        #[test]
        fn try_merge_overlapping_non_matching() {
            let a = Rc::new(ExprPat::VarPat("a".into()));

            let mut left = PatternMatch::default();
            left.insert(&a, Expr::Const(1.).into());

            let mut right = PatternMatch::default();
            right.insert(&a, Expr::Const(2.).into());

            let merged = PatternMatch::try_merge(left, right);
            assert!(merged.is_none());
        }

        #[test]
        fn transform_common_subexpression_elimination() {
            let parsed_rule = Rc::new(parse_rule("#a * _b + #a * _b"));
            let parsed_target = Rc::new(parse_expr("0 * 0 + 0 * 0"));

            let repls =
                PatternMatch::match_rule(Rc::clone(&parsed_rule), Rc::clone(&parsed_target))
                    .unwrap();
            let transformed = repls.transform(Rc::clone(&parsed_rule));
            let (l, r) = match transformed.as_ref() {
                Expr::BinaryExpr(BinaryExpr { lhs, rhs, .. }) => (lhs, rhs),
                _ => unreachable!(),
            };
            assert!(std::ptr::eq(l.as_ref(), r.as_ref())); // #a * _b

            let (ll, lr, rl, rr) = match (l.as_ref(), r.as_ref()) {
                (
                    Expr::BinaryExpr(BinaryExpr {
                        lhs: ll, rhs: lr, ..
                    }),
                    Expr::BinaryExpr(BinaryExpr {
                        lhs: rl, rhs: rr, ..
                    }),
                ) => (ll, lr, rl, rr),
                _ => unreachable!(),
            };
            assert!(std::ptr::eq(ll.as_ref(), lr.as_ref())); // check 0s
            assert!(std::ptr::eq(lr.as_ref(), rl.as_ref()));
            assert!(std::ptr::eq(rl.as_ref(), rr.as_ref()));
        }
    }

    mod match_rule {
        use super::*;

        macro_rules! match_rule_tests {
            ($($name:ident: $rule:expr => $target:expr => $expected_repls:expr)*) => {
            $(
                #[test]
                fn $name() {
                    let parsed_rule = parse_rule($rule);
                    let parsed_target = parse_expr($target);

                    let repls = PatternMatch::match_rule(parsed_rule.into(), parsed_target.into());
                    let (repls, expected_repls): (PatternMatch<Expr>, Vec<&str>) =
                        match (repls, $expected_repls) {
                            (None, expected_matches) => {
                                assert!(expected_matches.is_none());
                                return;
                            }
                            (Some(repl), expected_matches) => {
                                assert!(expected_matches.is_some());
                                (repl, expected_matches.unwrap())
                            }
                        };

                    let expected_repls = expected_repls
                        .into_iter()
                        .map(|m| m.split(": "))
                        .map(|mut i| (i.next().unwrap(), i.next().unwrap()))
                        .map(|(r, t)| (parse_rule(r), parse_expr(t)));

                    assert_eq!(expected_repls.len(), repls.map.len());

                    for (expected_pattern, expected_repl) in expected_repls {
                        assert_eq!(
                            expected_repl.to_string(),
                            repls.map.get(&hash(&expected_pattern)).unwrap().to_string()
                        );
                    }
                }
            )*
            }
        }

        match_rule_tests! {
            consts:                     "0" => "0" => Some(vec![])
            consts_unmatched:           "0" => "1" => None

            variable_pattern:           "$a" => "x"     => Some(vec!["$a: x"])
            variable_pattern_on_const:  "$a" => "0"     => None
            variable_pattern_on_binary: "$a" => "x + 0" => None
            variable_pattern_on_unary:  "$a" => "+x"    => None

            const_pattern:              "#a" => "1"     => Some(vec!["#a: 1"])
            const_pattern_on_var:       "#a" => "x"     => None
            const_pattern_on_binary:    "#a" => "1 + x" => None
            const_pattern_on_unary:     "#a" => "+1"    => None

            any_pattern_on_variable:    "_a" => "x"     => Some(vec!["_a: x"])
            any_pattern_on_const:       "_a" => "1"     => Some(vec!["_a: 1"])
            any_pattern_on_binary:      "_a" => "1 + x" => Some(vec!["_a: 1 + x"])
            any_pattern_on_unary:       "_a" => "+(2)"  => Some(vec!["_a: +(2)"])

            binary_pattern:             "$a + #b" => "x + 0" => Some(vec!["$a: x", "#b: 0"])
            binary_pattern_wrong_op:    "$a + #b" => "x - 0" => None
            binary_pattern_partial:     "$a + #b" => "x + y" => None

            unary_pattern:              "+$a" => "+x" => Some(vec!["$a: x"])
            unary_pattern_wrong_op:     "+$a" => "-x" => None
            unary_pattern_partial:      "+$a" => "+1" => None

            parend:                     "($a + #b)" => "(x + 0)" => Some(vec!["$a: x", "#b: 0"])
            parend_on_bracketed:           "($a + #b)" => "[x + 0]" => None

            bracketed:                     "[$a + #b]" => "[x + 0]" => Some(vec!["$a: x", "#b: 0"])
            bracketed_on_parend:           "[$a + #b]" => "(x + 0)" => None
        }

        #[test]
        fn common_subexpression_elimination() {
            let parsed_rule = parse_rule("#a * _b + _c * #d");
            let parsed_target = parse_expr("0 * 0 + 0 * 0");
            let l = match &parsed_target {
                Expr::BinaryExpr(BinaryExpr { lhs, .. }) => Rc::clone(lhs),
                _ => unreachable!(),
            };
            let ll = match l.as_ref() {
                Expr::BinaryExpr(BinaryExpr { lhs, .. }) => lhs,
                _ => unreachable!(),
            };

            let repls =
                PatternMatch::match_rule(Rc::new(parsed_rule), Rc::new(parsed_target)).unwrap();
            let zeros = repls.map.values().collect::<Vec<_>>();
            assert!(std::ptr::eq(ll.as_ref(), zeros[0].as_ref()));
            assert!(std::ptr::eq(zeros[0].as_ref(), zeros[1].as_ref()));
            assert!(std::ptr::eq(zeros[1].as_ref(), zeros[2].as_ref()));
            assert!(std::ptr::eq(zeros[2].as_ref(), zeros[3].as_ref()));
        }
    }
}
