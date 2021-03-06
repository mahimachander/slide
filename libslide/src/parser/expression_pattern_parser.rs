use super::{extra_tokens_diag, Parser};
use crate::common::Span;
use crate::diagnostics::Diagnostic;
use crate::grammar::*;
use crate::scanner::types::Token;
use crate::utils::{hash, PeekIter};

use std::collections::HashMap;
use std::rc::Rc;

pub fn parse(input: Vec<Token>) -> (Rc<ExprPat>, Vec<Diagnostic>) {
    let mut parser = ExpressionPatternParser::new(input);
    (parser.parse(), parser.diagnostics)
}

pub struct ExpressionPatternParser {
    _input: PeekIter<Token>,
    diagnostics: Vec<Diagnostic>,
    // We use an untyped hash here because we don't want to clone an Expr into the map in case it's
    // already there when using an entry API.
    // TODO: replace with Expr when raw_entry API is stabilized (see rust#56167)
    seen: HashMap<u64, Rc<ExprPat>>,
}

impl Parser<Rc<ExprPat>> for ExpressionPatternParser {
    type Expr = ExprPat;

    fn new(input: Vec<Token>) -> Self {
        Self {
            _input: PeekIter::new(input.into_iter()),
            diagnostics: vec![],
            seen: HashMap::new(),
        }
    }

    fn input(&mut self) -> &mut PeekIter<Token> {
        &mut self._input
    }

    fn push_diag(&mut self, diagnostic: Diagnostic) {
        self.diagnostics.push(diagnostic);
    }

    fn parse(&mut self) -> Rc<ExprPat> {
        let parsed = self.expr();
        if !self.done() {
            let extra_tokens_diag = extra_tokens_diag(self.input());
            self.push_diag(extra_tokens_diag);
        }
        parsed
    }

    fn parse_float(&mut self, f: f64, _span: Span) -> Self::Expr {
        Self::Expr::Const(f)
    }

    fn parse_variable(&mut self, name: String, span: Span) -> Self::Expr {
        self.push_diag(
            Diagnostic::span_err(
                span,
                "Variables cannot be used in an expression pattern",
                Some("unexpected variable".into()),
            )
            .with_help(format!(
                r##"consider using "${name}", "#{name}", or "_{name}" as a pattern"##,
                name = name,
            )),
        );
        Self::Expr::VarPat(name)
    }

    fn parse_var_pattern(&mut self, name: String, _span: Span) -> Self::Expr {
        Self::Expr::VarPat(name)
    }

    fn parse_const_pattern(&mut self, name: String, _span: Span) -> Self::Expr {
        Self::Expr::ConstPat(name)
    }

    fn parse_any_pattern(&mut self, name: String, _span: Span) -> Self::Expr {
        Self::Expr::AnyPat(name)
    }

    fn finish_expr(&mut self, expr: Self::Expr) -> Rc<Self::Expr> {
        let p = self
            .seen
            .entry(hash(&expr))
            .or_insert_with(|| Rc::new(expr));
        Rc::clone(p)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::scan;

    parser_tests! {
        parse_expression_pattern

        pattern:                 "$a"
        pattern_in_op_left:      "$a + 1"
        pattern_in_op_right:     "1 + $a"
    }

    #[test]
    fn common_subexpression_elimination() {
        let program = "$v * #c + $v * #c";
        let tokens = scan(program).tokens;
        let (parsed, _) = parse(tokens);
        let (l, r) = match (*parsed).clone() {
            ExprPat::BinaryExpr(BinaryExpr { lhs, rhs, .. }) => (lhs, rhs),
            _ => unreachable!(),
        };
        assert!(std::ptr::eq(l.as_ref(), r.as_ref())); // $v * #c

        let (ll, lr, rl, rr) = match (l.as_ref(), r.as_ref()) {
            (
                ExprPat::BinaryExpr(BinaryExpr {
                    lhs: ll, rhs: lr, ..
                }),
                ExprPat::BinaryExpr(BinaryExpr {
                    lhs: rl, rhs: rr, ..
                }),
            ) => (ll, lr, rl, rr),
            _ => unreachable!(),
        };
        assert!(std::ptr::eq(ll.as_ref(), rl.as_ref())); // 1
        assert!(std::ptr::eq(lr.as_ref(), rr.as_ref())); // 2
    }
}
