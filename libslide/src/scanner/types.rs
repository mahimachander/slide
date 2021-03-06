// A definition of a token - used in the scanner
// Written by Luke Bhan, 2/19/2020
//
//

use crate::common::Span;
use core::fmt;

#[derive(PartialEq, Clone, Debug)]
pub enum TokenType {
    // Stores a floating point number as dp
    Float(f64),

    // Identifies addition
    Plus,

    // Identifies subtraction
    Minus,

    // Identifies multiplication
    Mult,

    // Identifies division
    Div,

    // Identifies modulo
    Mod,

    // Identifies exponent
    Exp,

    // Identifies an equal sign
    Equal,

    // open parentheses (
    OpenParen,

    // close parentheses )
    CloseParen,

    // open bracket [
    OpenBracket,

    // close bracket ]
    //
    CloseBracket,

    // variable name
    Variable(String),

    // a variable pattern, of form $name
    VariablePattern(String),

    // a constant pattern, of form #name
    ConstPattern(String),

    // an any pattern, of form #name
    AnyPattern(String),

    // invalid token
    Invalid(String),

    // end of file
    EOF,
}

impl fmt::Display for TokenType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use TokenType::*;
        write!(
            f,
            "{}",
            match self {
                Float(num) => num.to_string(),
                Plus => "+".into(),
                Minus => "-".into(),
                Mult => "*".into(),
                Div => "/".into(),
                Mod => "%".into(),
                Exp => "^".into(),
                Equal => "=".into(),
                OpenParen => "(".into(),
                CloseParen => ")".into(),
                OpenBracket => "[".into(),
                CloseBracket => "]".into(),
                Variable(s) => s.to_string(),
                VariablePattern(s) => s.to_string(),
                ConstPattern(s) => s.to_string(),
                AnyPattern(s) => s.to_string(),
                Invalid(s) => s.to_string(),
                EOF => "end of file".into(),
            }
        )
    }
}

/// Describes a token in a slide program.
#[derive(PartialEq, Clone, Debug)]
pub struct Token {
    pub ty: TokenType,
    pub span: Span,
}

impl Token {
    pub fn new<S>(ty: TokenType, span: S) -> Self
    where
        S: Into<Span>,
    {
        Self {
            ty,
            span: span.into(),
        }
    }
}

impl fmt::Display for Token {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.ty.to_string())
    }
}

#[cfg(test)]
mod tests {
    mod format {
        use crate::scanner::types::*;

        macro_rules! format_tests {
            ($($name:ident: $ty:expr, $format_str:expr)*) => {
            $(
                #[test]
                fn $name() {
                    use TokenType::*;
                    let tok = Token {ty: $ty, span: (0, 0).into()};
                    assert_eq!(tok.to_string(), $format_str);
                }
            )*
            }
        }

        format_tests! {
            float: Float(1.3), "1.3"
            plus: Plus, "+"
            minus: Minus, "-"
            mult: Mult, "*"
            div: Div, "/"
            modulo: Mod, "%"
            exp: Exp, "^"
            equal: Equal, "="
            open_paren: OpenParen, "("
            close_paren: CloseParen, ")"
            open_bracket: OpenBracket, "["
            close_bracket: CloseBracket, "]"
            variable: Variable("ab".into()), "ab"
            invalid: Invalid("@&@".into()), "@&@"
        }
    }
}
