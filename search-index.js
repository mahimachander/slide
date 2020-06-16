var searchIndex = JSON.parse('{\
"libslide":{"doc":"","i":[[3,"EvaluatorContext","libslide","",null,null],[12,"rule_blacklist","","Rules that should not be included in the evaluation of an…",0,null],[12,"always_flatten","","Whether an expression should always be flattened before it…",0,null],[5,"parse_expression","","",null,[[["vec",3],["token",3]]]],[5,"parse_expression_pattern","","",null,[[["vec",3],["token",3]]]],[5,"evaluate","","Evaluates an expression to as simplified a form as…",null,[[["stmt",4],["evaluatorcontext",3]],[["box",3],["expr",4],["result",4]]]],[0,"common","","",null,null],[3,"Span","libslide::common","Describes the character span of a substring in a text.",null,null],[12,"lo","","Inclusive lower bound index of the span",1,null],[12,"hi","","Exclusive upper bound index of the span",1,null],[0,"diagnostics","libslide","",null,null],[3,"Diagnostic","libslide::diagnostics","A diagnostic for slide source code.",null,null],[12,"kind","","",2,null],[12,"span","","",2,null],[12,"msg","","",2,null],[12,"associated_diagnostics","","",2,null],[4,"DiagnosticKind","","The kind of a slide diagnostic.",null,null],[13,"Error","","An error diagnostic. Generally, this diagnostic should be…",3,null],[13,"Note","","A note diagnostic is a generic annotation with no specific…",3,null],[11,"span_err","","Creates an error diagnostic at a span.",2,[[],["diagnostic",3]]],[11,"with_note","","Adds a note to the diagnostic, possibly at a different span.",2,[[],["diagnostic",3]]],[0,"scanner","libslide","",null,null],[3,"ScanResult","libslide::scanner","",null,null],[12,"tokens","","",4,null],[12,"diagnostics","","",4,null],[3,"Scanner","","",null,null],[12,"pos","","",5,null],[12,"input","","",5,null],[12,"output","","",5,null],[12,"diagnostics","","",5,null],[5,"scan","","",null,[[["into",8]],["scanresult",3]]],[0,"types","","",null,null],[3,"Token","libslide::scanner::types","Describes a token in a slide program.",null,null],[12,"ty","","",6,null],[12,"span","","",6,null],[4,"TokenType","","",null,null],[13,"Float","","",7,null],[13,"Plus","","",7,null],[13,"Minus","","",7,null],[13,"Mult","","",7,null],[13,"Div","","",7,null],[13,"Mod","","",7,null],[13,"Exp","","",7,null],[13,"Equal","","",7,null],[13,"OpenParen","","",7,null],[13,"CloseParen","","",7,null],[13,"OpenBracket","","",7,null],[13,"CloseBracket","","",7,null],[13,"Variable","","",7,null],[13,"VariablePattern","","",7,null],[13,"ConstPattern","","",7,null],[13,"AnyPattern","","",7,null],[13,"Invalid","","",7,null],[13,"EOF","","",7,null],[11,"new","","",6,[[["tokentype",4]]]],[11,"new","libslide::scanner","",5,[[],["scanner",3]]],[11,"peek","","",5,[[],["option",4]]],[11,"next","","",5,[[],["option",4]]],[11,"push_diag","","",5,[[["diagnostic",3]]]],[11,"collect_while","","",5,[[],["string",3]]],[11,"scan","","",5,[[]]],[11,"scan_symbol","","",5,[[]]],[11,"scan_num","","",5,[[]]],[11,"scan_var_str","","",5,[[],["string",3]]],[11,"scan_var","","",5,[[]]],[11,"scan_var_pattern","","",5,[[]]],[11,"scan_const_pattern","","",5,[[]]],[11,"scan_any_pattern","","",5,[[]]],[0,"parser","libslide","",null,null],[0,"test_utils","libslide::parser","",null,null],[0,"expression_parser","","",null,null],[3,"ExpressionParser","libslide::parser::expression_parser","",null,null],[12,"_input","","",8,null],[12,"_errors","","",8,null],[12,"seen","","",8,null],[5,"parse","","",null,[[["vec",3],["token",3]]]],[11,"assignment","","",8,[[["string",3]],["stmt",4]]],[11,"parse_pattern","","",8,[[["string",3]],["expr",4]]],[0,"expression_pattern_parser","libslide::parser","",null,null],[3,"ExpressionPatternParser","libslide::parser::expression_pattern_parser","",null,null],[12,"_input","","",9,null],[12,"_errors","","",9,null],[12,"seen","","",9,null],[5,"parse","","",null,[[["vec",3],["token",3]]]],[8,"Parser","libslide::parser","",null,null],[16,"Expr","","",10,null],[16,"Error","","",10,null],[10,"new","","",10,[[["vec",3],["token",3]]]],[10,"errors","","",10,[[],["vec",3]]],[10,"input","","",10,[[],["peekiter",3]]],[10,"parse","","",10,[[]]],[10,"parse_float","","",10,[[]]],[10,"parse_variable","","",10,[[["string",3]]]],[10,"parse_var_pattern","","",10,[[["string",3]]]],[10,"parse_const_pattern","","",10,[[["string",3]]]],[10,"parse_any_pattern","","",10,[[["string",3]]]],[10,"parse_open_paren","","",10,[[]]],[10,"parse_open_bracket","","",10,[[]]],[10,"finish_expr","","",10,[[],["rc",3]]],[11,"done","","",10,[[]]],[11,"expr","","",10,[[],["rc",3]]],[11,"add_sub_term","","",10,[[],["rc",3]]],[11,"mul_divide_mod_term","","",10,[[],["rc",3]]],[11,"exp_term","","",10,[[],["rc",3]]],[11,"num_term","","",10,[[],["rc",3]]],[0,"partial_evaluator","libslide","",null,null],[5,"evaluate","libslide::partial_evaluator","Evaluates an expression to as simplified a form as…",null,[[["stmt",4],["evaluatorcontext",3]],[["box",3],["expr",4],["result",4]]]],[0,"flatten","","This module tries to flatten expressions as far as…",null,null],[5,"flatten_expr","libslide::partial_evaluator::flatten","Attempts to flatten an expression, folding constant…",null,[[["rc",3]],[["rc",3],["expr",4]]]],[5,"flatten_add_or_sub","","Flattens an addition or subtraction, folding constants and…",null,[[["rc",3]],[["rc",3],["expr",4]]]],[0,"types","libslide::partial_evaluator","",null,null],[3,"EvaluatorContext","libslide::partial_evaluator::types","",null,null],[12,"rule_blacklist","","Rules that should not be included in the evaluation of an…",0,null],[12,"always_flatten","","Whether an expression should always be flattened before it…",0,null],[11,"with_blacklist","libslide","",0,[[]]],[11,"always_flatten","","",0,[[]]],[0,"evaluator_rules","","",null,null],[0,"pattern_match","libslide::evaluator_rules","",null,null],[3,"PatternMatch","libslide::evaluator_rules::pattern_match","Represents pattern-matched replacements betwen a rule and…",null,null],[12,"map","","",11,null],[8,"MatchRule","","",null,null],[10,"match_rule","","Pattern matches a rule template against an expression. If…",12,[[["rc",3],["exprpat",4],["rc",3]],[["option",4],["patternmatch",3]]]],[11,"try_merge","","Merges two `PatternMatch`. If the `PatternMatch` are of…",11,[[["patternmatch",3]],[["option",4],["patternmatch",3]]]],[11,"insert","","",11,[[["rc",3],["rc",3]],[["rc",3],["option",4]]]],[0,"registry","libslide::evaluator_rules","",null,null],[3,"RuleSet","libslide::evaluator_rules::registry","Set of unbuilt rules.",null,null],[12,"rules","","",13,null],[12,"custom_rules","","",13,null],[3,"BuildRuleErrors","","",null,null],[12,"errors","","",14,null],[4,"RuleName","","",null,null],[13,"UnwrapExplicitParens","","",15,null],[13,"UnwrapExplicitBrackets","","",15,null],[13,"Add","","",15,null],[13,"Subtract","","",15,null],[13,"Multiply","","",15,null],[13,"Divide","","",15,null],[13,"Modulo","","",15,null],[13,"Exponentiate","","",15,null],[13,"Posate","","",15,null],[13,"Negate","","",15,null],[13,"MultiplicateIdentity","","",15,null],[13,"AdditiveIdentity","","",15,null],[13,"AdditiveInverse","","",15,null],[13,"SubtractiveIdentity","","",15,null],[13,"ReorderConstants","","",15,null],[13,"DistributeNegation","","",15,null],[13,"FoldNegatedAddition","","",15,null],[5,"get_all_rules","","",null,[[],[["rulename",4],["hashmap",3],["unbuiltrule",4]]]],[0,"fn_rules","","",null,null],[5,"add","libslide::evaluator_rules::registry::fn_rules","",null,[[["rc",3],["expr",4]],[["option",4],["rc",3]]]],[5,"subtract","","",null,[[["rc",3],["expr",4]],[["option",4],["rc",3]]]],[5,"multiply","","",null,[[["rc",3],["expr",4]],[["option",4],["rc",3]]]],[5,"divide","","",null,[[["rc",3],["expr",4]],[["option",4],["rc",3]]]],[5,"modulo","","",null,[[["rc",3],["expr",4]],[["option",4],["rc",3]]]],[5,"exponentiate","","",null,[[["rc",3],["expr",4]],[["option",4],["rc",3]]]],[5,"posate","","",null,[[["rc",3],["expr",4]],[["option",4],["rc",3]]]],[5,"negate","","",null,[[["rc",3],["expr",4]],[["option",4],["rc",3]]]],[11,"build","libslide::evaluator_rules::registry","Creates a list of `Rules`s from the unbuilt rule set.",13,[[],[["result",4],["buildruleerrors",3],["vec",3]]]],[11,"remove","","Remove a named rule from the rule set.",13,[[["rulename",4]]]],[11,"insert_custom","","Insert a custom unbuilt rule into the rule set.",13,[[["into",8],["unbuiltrule",4]]]],[11,"get_bootstrapping_rules","","Retrieves a set of rules to be used in bootstrapping other…",13,[[],[["rule",4],["vec",3]]]],[11,"get_boostrap_blacklist","","Retrieves a set of rules to be excluded from being…",13,[[],[["hashset",3],["option",4]]]],[0,"rule","libslide::evaluator_rules","",null,null],[3,"PatternMap","libslide::evaluator_rules::rule","A mapping between two expression patterns.",null,null],[12,"from","","",16,null],[12,"to","","",16,null],[3,"UnresolvedMapping","","",null,null],[12,"map","","",17,null],[12,"unresolved_pats","","",17,null],[4,"Rule","","",null,null],[13,"PatternMap","","",18,null],[13,"Evaluate","","",18,null],[5,"fn_name","","",null,[[]]],[11,"from_str","","Converts a string representation of a rule to a…",16,[[]]],[11,"bootstrap","","Bootstraps a `PatternMap` rule with a one-pass application…",16,[[]]],[11,"validate","","Checks a `PatternMap` is resolvable, returning an error if…",16,[[],[["unresolvedmapping",3],["option",4]]]],[11,"from_fn","","",18,[[]]],[0,"unbuilt_rule","libslide::evaluator_rules","",null,null],[4,"UnbuiltRule","libslide::evaluator_rules::unbuilt_rule","An unbuilt rule, generally used to express a rule in a…",null,null],[13,"S","","An expression-mapping rule.",19,null],[13,"F","","A function rule.",19,null],[0,"grammar","libslide","",null,null],[3,"Assignment","libslide::grammar","",null,null],[12,"var","","",20,null],[12,"rhs","","",20,null],[3,"BinaryExpr","","",null,null],[12,"op","","",21,null],[12,"lhs","","",21,null],[12,"rhs","","",21,null],[3,"UnaryExpr","","",null,null],[12,"op","","",22,null],[12,"rhs","","",22,null],[4,"Stmt","","",null,null],[13,"Expr","","",23,null],[13,"Assignment","","",23,null],[4,"Expr","","",null,null],[13,"Const","","",24,null],[13,"Var","","",24,null],[13,"BinaryExpr","","",24,null],[13,"UnaryExpr","","",24,null],[13,"Parend","","An expression wrapped in parentheses",24,null],[13,"Bracketed","","An expression wrapped in brackets",24,null],[4,"BinaryOperator","","",null,null],[13,"Plus","","",25,null],[13,"Minus","","",25,null],[13,"Mult","","",25,null],[13,"Div","","",25,null],[13,"Mod","","",25,null],[13,"Exp","","",25,null],[4,"UnaryOperator","","",null,null],[13,"SignPositive","","",26,null],[13,"SignNegative","","",26,null],[0,"pattern","","",null,null],[4,"ExprPat","libslide::grammar::pattern","",null,null],[13,"Const","","",27,null],[13,"VarPat","","Pattern matching a variable",27,null],[13,"ConstPat","","Pattern matching a constant",27,null],[13,"AnyPat","","Pattern matching any expression",27,null],[13,"BinaryExpr","","",27,null],[13,"UnaryExpr","","",27,null],[13,"Parend","","",27,null],[13,"Bracketed","","",27,null],[0,"transformer","libslide::grammar","",null,null],[8,"Transformer","libslide::grammar::transformer","A trait for transforming one grammar into another. This…",null,null],[10,"transform","","",28,[[]]],[8,"Grammar","libslide::grammar","",null,null],[10,"s_form","","Returns the S-expression form of this expression. For…",29,[[],["string",3]]],[8,"Expression","","",null,null],[10,"is_const","","",30,[[]]],[11,"complexity","","",24,[[]]],[11,"mult","","",21,[[]]],[11,"negate","","",22,[[]]],[0,"math","libslide","",null,null],[0,"gcd","libslide::math","",null,null],[5,"gcd","libslide::math::gcd","Calculates the GCD for (u, v) ∈ (Z, Z).",null,[[["primint",8],["unsigned",8]],[["primint",8],["unsigned",8]]]],[5,"binary_gcd","","The [Binary GCD] algorithm, or Stein\'s algorithm.…",null,[[["primint",8],["unsigned",8]],[["primint",8],["unsigned",8]]]],[5,"euclidean_gcd","","The [Euclidean GCD] algorithm. Implemented ∀ (u, v) ∈ (Z,…",null,[[["primint",8],["unsigned",8]],[["primint",8],["unsigned",8]]]],[0,"poly","libslide::math","",null,null],[3,"Poly","libslide::math::poly","",null,null],[12,"vec","","",31,null],[11,"new","","",31,[[["vec",3]]]],[11,"empty","","",31,[[]]],[11,"is_empty","","",31,[[]]],[11,"deg","","Gets the degree of the polynomial.",31,[[]]],[11,"primitive","","Returns the [primitive polynomial] of `self` over the…",31,[[]]],[11,"add_term","","Adds a term of form `coeff`x^`pow` to `self`.",31,[[]]],[11,"mul_term","","Multiplies a term of form `coeff`x^`pow` to `self`.",31,[[]]],[11,"negate","","Negates each term of the polynomial.",31,[[]]],[11,"mul_scalar","","Multiplies each term in the polynomial by a scalar.",31,[[]]],[11,"div_scalar","","Divides each term in the polynomial by a scalar. If the…",31,[[],["result",4]]],[11,"sub","","Subtracts `other` from `self`, yielding a new polynomial.",31,[[]]],[11,"truncate_zeros","","Removes leading zero terms in a polynomial.",31,[[]]],[11,"div","","Divides one polynomial by another, returning a tuple of…",31,[[["poly",3]],["result",4]]],[11,"max_norm","","Returns the max norm of a polynomial. This is equivalent…",31,[[]]],[11,"lc","","Returns the leading coefficient, i.e. the coefficient of…",31,[[]]],[11,"eval","","Evaluates the polynomial at a value `x`.",31,[[]]],[0,"gcd_poly_zz","libslide::math","",null,null],[5,"gcd_poly_zz_heu","libslide::math::gcd_poly_zz","Calculates the GCD of two polynomials, `f` and `g`, in ZZ…",null,[[["poly",3]],["result",4]]],[5,"poly_coeffs_gcd","","Returns the GCD of a polynomial\'s term coefficients.",null,[[["poly",3]]]],[5,"poly_extract_common","","Extracts a constant coefficient from two polynomials.…",null,[[["poly",3]]]],[5,"trivial_gcd","","Handles trivial polynomial GCD cases, namely if one…",null,[[["poly",3]],["option",4]]],[5,"gcd_interpolate","","Interpolates step-wise gcd of h and x into a polynomial.",null,[[],["poly",3]]],[0,"utils","libslide","",null,null],[0,"grammar","libslide::utils","",null,null],[4,"UnflattenStrategy","libslide::utils::grammar","",null,null],[13,"Left","","",32,null],[13,"Right","","",32,null],[5,"get_symmetric_expressions","","",null,[[["rc",3],["expr",4]],[["vec",3],["rc",3]]]],[5,"get_flattened_binary_args","","",null,[[["binaryoperator",4],["rc",3],["expr",4]],[["vec",3],["rc",3]]]],[5,"negate","","",null,[[["rc",3],["expr",4]],[["rc",3],["expr",4]]]],[5,"unflatten_binary_expr","","",null,[[["binaryoperator",4],["unflattenstrategy",4]],["rc",3]]],[5,"unique_pats","","Returns all unique patterns in a pattern expression.",null,[[["rc",3]],[["hashset",3],["rc",3]]]],[5,"normalize","","",null,[[["rc",3],["expr",4]],[["rc",3],["expr",4]]]],[0,"hash","libslide::utils","",null,null],[5,"hash","libslide::utils::hash","",null,[[]]],[0,"iter","libslide::utils","",null,null],[3,"PeekingTakeWhile","libslide::utils::iter","A [`TakeWhile`]-like struct that tests a predicate by…",null,null],[12,"peeker","","A mutable reference to the underlying iterator is taken…",33,null],[12,"predicate","","",33,null],[3,"PeekIter","","An iterator that supports arbitrary-length peeking.",null,null],[12,"iter","","",34,null],[12,"lookahead","","A store of items we had to consume from the iterator for…",34,null],[11,"new","","",34,[[["intoiter",3]]]],[11,"peek","","Returns a reference to the next value in the iterator,…",34,[[],["option",4]]],[11,"peek_map_n","","Returns a deque of up to `n` peeked items mapped over a…",34,[[],["vecdeque",3]]],[11,"push_front","","Adds an item to the front of the current iteration.",34,[[]]],[0,"string","libslide::utils","",null,null],[5,"indent","libslide::utils::string","Indents all lines of a string with `n` spaces.",null,[[["into",8],["string",3]],["string",3]]],[8,"StringUtils","","",null,null],[10,"substring","","",35,[[]]],[8,"Grammar","libslide","",null,null],[10,"s_form","","Returns the S-expression form of this expression. For…",29,[[],["string",3]]],[14,"poly","","Creates a new polynomial.",null,null],[11,"from","","",0,[[]]],[11,"into","","",0,[[]]],[11,"borrow","","",0,[[]]],[11,"try_from","","",0,[[],["result",4]]],[11,"try_into","","",0,[[],["result",4]]],[11,"borrow_mut","","",0,[[]]],[11,"type_id","","",0,[[],["typeid",3]]],[11,"checked_as","","",0,[[],["option",4]]],[11,"az","","",0,[[]]],[11,"wrapping_as","","",0,[[]]],[11,"saturating_as","","",0,[[]]],[11,"overflowing_as","","",0,[[]]],[11,"from","libslide::common","",1,[[]]],[11,"into","","",1,[[]]],[11,"to_owned","","",1,[[]]],[11,"clone_into","","",1,[[]]],[11,"borrow","","",1,[[]]],[11,"try_from","","",1,[[],["result",4]]],[11,"try_into","","",1,[[],["result",4]]],[11,"borrow_mut","","",1,[[]]],[11,"type_id","","",1,[[],["typeid",3]]],[11,"checked_as","","",1,[[],["option",4]]],[11,"az","","",1,[[]]],[11,"wrapping_as","","",1,[[]]],[11,"saturating_as","","",1,[[]]],[11,"overflowing_as","","",1,[[]]],[11,"from","libslide::diagnostics","",2,[[]]],[11,"into","","",2,[[]]],[11,"borrow","","",2,[[]]],[11,"try_from","","",2,[[],["result",4]]],[11,"try_into","","",2,[[],["result",4]]],[11,"borrow_mut","","",2,[[]]],[11,"type_id","","",2,[[],["typeid",3]]],[11,"checked_as","","",2,[[],["option",4]]],[11,"az","","",2,[[]]],[11,"wrapping_as","","",2,[[]]],[11,"saturating_as","","",2,[[]]],[11,"overflowing_as","","",2,[[]]],[11,"from","","",3,[[]]],[11,"into","","",3,[[]]],[11,"borrow","","",3,[[]]],[11,"try_from","","",3,[[],["result",4]]],[11,"try_into","","",3,[[],["result",4]]],[11,"borrow_mut","","",3,[[]]],[11,"type_id","","",3,[[],["typeid",3]]],[11,"checked_as","","",3,[[],["option",4]]],[11,"az","","",3,[[]]],[11,"wrapping_as","","",3,[[]]],[11,"saturating_as","","",3,[[]]],[11,"overflowing_as","","",3,[[]]],[11,"from","libslide::scanner","",4,[[]]],[11,"into","","",4,[[]]],[11,"borrow","","",4,[[]]],[11,"try_from","","",4,[[],["result",4]]],[11,"try_into","","",4,[[],["result",4]]],[11,"borrow_mut","","",4,[[]]],[11,"type_id","","",4,[[],["typeid",3]]],[11,"checked_as","","",4,[[],["option",4]]],[11,"az","","",4,[[]]],[11,"wrapping_as","","",4,[[]]],[11,"saturating_as","","",4,[[]]],[11,"overflowing_as","","",4,[[]]],[11,"from","","",5,[[]]],[11,"into","","",5,[[]]],[11,"borrow","","",5,[[]]],[11,"try_from","","",5,[[],["result",4]]],[11,"try_into","","",5,[[],["result",4]]],[11,"borrow_mut","","",5,[[]]],[11,"type_id","","",5,[[],["typeid",3]]],[11,"checked_as","","",5,[[],["option",4]]],[11,"az","","",5,[[]]],[11,"wrapping_as","","",5,[[]]],[11,"saturating_as","","",5,[[]]],[11,"overflowing_as","","",5,[[]]],[11,"from","libslide::scanner::types","",6,[[]]],[11,"into","","",6,[[]]],[11,"to_owned","","",6,[[]]],[11,"clone_into","","",6,[[]]],[11,"to_string","","",6,[[],["string",3]]],[11,"borrow","","",6,[[]]],[11,"try_from","","",6,[[],["result",4]]],[11,"try_into","","",6,[[],["result",4]]],[11,"borrow_mut","","",6,[[]]],[11,"type_id","","",6,[[],["typeid",3]]],[11,"checked_as","","",6,[[],["option",4]]],[11,"az","","",6,[[]]],[11,"wrapping_as","","",6,[[]]],[11,"saturating_as","","",6,[[]]],[11,"overflowing_as","","",6,[[]]],[11,"from","","",7,[[]]],[11,"into","","",7,[[]]],[11,"to_owned","","",7,[[]]],[11,"clone_into","","",7,[[]]],[11,"borrow","","",7,[[]]],[11,"try_from","","",7,[[],["result",4]]],[11,"try_into","","",7,[[],["result",4]]],[11,"borrow_mut","","",7,[[]]],[11,"type_id","","",7,[[],["typeid",3]]],[11,"checked_as","","",7,[[],["option",4]]],[11,"az","","",7,[[]]],[11,"wrapping_as","","",7,[[]]],[11,"saturating_as","","",7,[[]]],[11,"overflowing_as","","",7,[[]]],[11,"from","libslide::parser::expression_parser","",8,[[]]],[11,"into","","",8,[[]]],[11,"borrow","","",8,[[]]],[11,"try_from","","",8,[[],["result",4]]],[11,"try_into","","",8,[[],["result",4]]],[11,"borrow_mut","","",8,[[]]],[11,"type_id","","",8,[[],["typeid",3]]],[11,"checked_as","","",8,[[],["option",4]]],[11,"az","","",8,[[]]],[11,"wrapping_as","","",8,[[]]],[11,"saturating_as","","",8,[[]]],[11,"overflowing_as","","",8,[[]]],[11,"from","libslide::parser::expression_pattern_parser","",9,[[]]],[11,"into","","",9,[[]]],[11,"borrow","","",9,[[]]],[11,"try_from","","",9,[[],["result",4]]],[11,"try_into","","",9,[[],["result",4]]],[11,"borrow_mut","","",9,[[]]],[11,"type_id","","",9,[[],["typeid",3]]],[11,"checked_as","","",9,[[],["option",4]]],[11,"az","","",9,[[]]],[11,"wrapping_as","","",9,[[]]],[11,"saturating_as","","",9,[[]]],[11,"overflowing_as","","",9,[[]]],[11,"from","libslide::evaluator_rules::pattern_match","",11,[[]]],[11,"into","","",11,[[]]],[11,"borrow","","",11,[[]]],[11,"try_from","","",11,[[],["result",4]]],[11,"try_into","","",11,[[],["result",4]]],[11,"borrow_mut","","",11,[[]]],[11,"type_id","","",11,[[],["typeid",3]]],[11,"checked_as","","",11,[[],["option",4]]],[11,"az","","",11,[[]]],[11,"wrapping_as","","",11,[[]]],[11,"saturating_as","","",11,[[]]],[11,"overflowing_as","","",11,[[]]],[11,"from","libslide::evaluator_rules::registry","",13,[[]]],[11,"into","","",13,[[]]],[11,"borrow","","",13,[[]]],[11,"try_from","","",13,[[],["result",4]]],[11,"try_into","","",13,[[],["result",4]]],[11,"borrow_mut","","",13,[[]]],[11,"type_id","","",13,[[],["typeid",3]]],[11,"checked_as","","",13,[[],["option",4]]],[11,"az","","",13,[[]]],[11,"wrapping_as","","",13,[[]]],[11,"saturating_as","","",13,[[]]],[11,"overflowing_as","","",13,[[]]],[11,"from","","",14,[[]]],[11,"into","","",14,[[]]],[11,"to_string","","",14,[[],["string",3]]],[11,"borrow","","",14,[[]]],[11,"try_from","","",14,[[],["result",4]]],[11,"try_into","","",14,[[],["result",4]]],[11,"borrow_mut","","",14,[[]]],[11,"type_id","","",14,[[],["typeid",3]]],[11,"checked_as","","",14,[[],["option",4]]],[11,"az","","",14,[[]]],[11,"wrapping_as","","",14,[[]]],[11,"saturating_as","","",14,[[]]],[11,"overflowing_as","","",14,[[]]],[11,"from","","",15,[[]]],[11,"into","","",15,[[]]],[11,"to_owned","","",15,[[]]],[11,"clone_into","","",15,[[]]],[11,"borrow","","",15,[[]]],[11,"try_from","","",15,[[],["result",4]]],[11,"try_into","","",15,[[],["result",4]]],[11,"borrow_mut","","",15,[[]]],[11,"type_id","","",15,[[],["typeid",3]]],[11,"checked_as","","",15,[[],["option",4]]],[11,"az","","",15,[[]]],[11,"wrapping_as","","",15,[[]]],[11,"saturating_as","","",15,[[]]],[11,"overflowing_as","","",15,[[]]],[11,"from","libslide::evaluator_rules::rule","",16,[[]]],[11,"into","","",16,[[]]],[11,"to_owned","","",16,[[]]],[11,"clone_into","","",16,[[]]],[11,"to_string","","",16,[[],["string",3]]],[11,"borrow","","",16,[[]]],[11,"try_from","","",16,[[],["result",4]]],[11,"try_into","","",16,[[],["result",4]]],[11,"borrow_mut","","",16,[[]]],[11,"type_id","","",16,[[],["typeid",3]]],[11,"checked_as","","",16,[[],["option",4]]],[11,"az","","",16,[[]]],[11,"wrapping_as","","",16,[[]]],[11,"saturating_as","","",16,[[]]],[11,"overflowing_as","","",16,[[]]],[11,"from","","",17,[[]]],[11,"into","","",17,[[]]],[11,"to_string","","",17,[[],["string",3]]],[11,"borrow","","",17,[[]]],[11,"try_from","","",17,[[],["result",4]]],[11,"try_into","","",17,[[],["result",4]]],[11,"borrow_mut","","",17,[[]]],[11,"type_id","","",17,[[],["typeid",3]]],[11,"checked_as","","",17,[[],["option",4]]],[11,"az","","",17,[[]]],[11,"wrapping_as","","",17,[[]]],[11,"saturating_as","","",17,[[]]],[11,"overflowing_as","","",17,[[]]],[11,"from","","",18,[[]]],[11,"into","","",18,[[]]],[11,"to_string","","",18,[[],["string",3]]],[11,"borrow","","",18,[[]]],[11,"try_from","","",18,[[],["result",4]]],[11,"try_into","","",18,[[],["result",4]]],[11,"borrow_mut","","",18,[[]]],[11,"type_id","","",18,[[],["typeid",3]]],[11,"checked_as","","",18,[[],["option",4]]],[11,"az","","",18,[[]]],[11,"wrapping_as","","",18,[[]]],[11,"saturating_as","","",18,[[]]],[11,"overflowing_as","","",18,[[]]],[11,"from","libslide::evaluator_rules::unbuilt_rule","",19,[[]]],[11,"into","","",19,[[]]],[11,"to_owned","","",19,[[]]],[11,"clone_into","","",19,[[]]],[11,"borrow","","",19,[[]]],[11,"try_from","","",19,[[],["result",4]]],[11,"try_into","","",19,[[],["result",4]]],[11,"borrow_mut","","",19,[[]]],[11,"type_id","","",19,[[],["typeid",3]]],[11,"checked_as","","",19,[[],["option",4]]],[11,"az","","",19,[[]]],[11,"wrapping_as","","",19,[[]]],[11,"saturating_as","","",19,[[]]],[11,"overflowing_as","","",19,[[]]],[11,"from","libslide::grammar","",20,[[]]],[11,"into","","",20,[[]]],[11,"to_owned","","",20,[[]]],[11,"clone_into","","",20,[[]]],[11,"to_string","","",20,[[],["string",3]]],[11,"borrow","","",20,[[]]],[11,"try_from","","",20,[[],["result",4]]],[11,"try_into","","",20,[[],["result",4]]],[11,"borrow_mut","","",20,[[]]],[11,"type_id","","",20,[[],["typeid",3]]],[11,"checked_as","","",20,[[],["option",4]]],[11,"az","","",20,[[]]],[11,"wrapping_as","","",20,[[]]],[11,"saturating_as","","",20,[[]]],[11,"overflowing_as","","",20,[[]]],[11,"from","","",21,[[]]],[11,"into","","",21,[[]]],[11,"to_owned","","",21,[[]]],[11,"clone_into","","",21,[[]]],[11,"to_string","","",21,[[],["string",3]]],[11,"borrow","","",21,[[]]],[11,"try_from","","",21,[[],["result",4]]],[11,"try_into","","",21,[[],["result",4]]],[11,"borrow_mut","","",21,[[]]],[11,"type_id","","",21,[[],["typeid",3]]],[11,"checked_as","","",21,[[],["option",4]]],[11,"az","","",21,[[]]],[11,"wrapping_as","","",21,[[]]],[11,"saturating_as","","",21,[[]]],[11,"overflowing_as","","",21,[[]]],[11,"from","","",22,[[]]],[11,"into","","",22,[[]]],[11,"to_owned","","",22,[[]]],[11,"clone_into","","",22,[[]]],[11,"to_string","","",22,[[],["string",3]]],[11,"borrow","","",22,[[]]],[11,"try_from","","",22,[[],["result",4]]],[11,"try_into","","",22,[[],["result",4]]],[11,"borrow_mut","","",22,[[]]],[11,"type_id","","",22,[[],["typeid",3]]],[11,"checked_as","","",22,[[],["option",4]]],[11,"az","","",22,[[]]],[11,"wrapping_as","","",22,[[]]],[11,"saturating_as","","",22,[[]]],[11,"overflowing_as","","",22,[[]]],[11,"from","","",23,[[]]],[11,"into","","",23,[[]]],[11,"to_owned","","",23,[[]]],[11,"clone_into","","",23,[[]]],[11,"to_string","","",23,[[],["string",3]]],[11,"borrow","","",23,[[]]],[11,"try_from","","",23,[[],["result",4]]],[11,"try_into","","",23,[[],["result",4]]],[11,"borrow_mut","","",23,[[]]],[11,"type_id","","",23,[[],["typeid",3]]],[11,"checked_as","","",23,[[],["option",4]]],[11,"az","","",23,[[]]],[11,"wrapping_as","","",23,[[]]],[11,"saturating_as","","",23,[[]]],[11,"overflowing_as","","",23,[[]]],[11,"from","","",24,[[]]],[11,"into","","",24,[[]]],[11,"to_owned","","",24,[[]]],[11,"clone_into","","",24,[[]]],[11,"to_string","","",24,[[],["string",3]]],[11,"borrow","","",24,[[]]],[11,"try_from","","",24,[[],["result",4]]],[11,"try_into","","",24,[[],["result",4]]],[11,"borrow_mut","","",24,[[]]],[11,"type_id","","",24,[[],["typeid",3]]],[11,"checked_as","","",24,[[],["option",4]]],[11,"az","","",24,[[]]],[11,"wrapping_as","","",24,[[]]],[11,"saturating_as","","",24,[[]]],[11,"overflowing_as","","",24,[[]]],[11,"from","","",25,[[]]],[11,"into","","",25,[[]]],[11,"to_owned","","",25,[[]]],[11,"clone_into","","",25,[[]]],[11,"to_string","","",25,[[],["string",3]]],[11,"borrow","","",25,[[]]],[11,"try_from","","",25,[[],["result",4]]],[11,"try_into","","",25,[[],["result",4]]],[11,"borrow_mut","","",25,[[]]],[11,"type_id","","",25,[[],["typeid",3]]],[11,"checked_as","","",25,[[],["option",4]]],[11,"az","","",25,[[]]],[11,"wrapping_as","","",25,[[]]],[11,"saturating_as","","",25,[[]]],[11,"overflowing_as","","",25,[[]]],[11,"from","","",26,[[]]],[11,"into","","",26,[[]]],[11,"to_owned","","",26,[[]]],[11,"clone_into","","",26,[[]]],[11,"to_string","","",26,[[],["string",3]]],[11,"borrow","","",26,[[]]],[11,"try_from","","",26,[[],["result",4]]],[11,"try_into","","",26,[[],["result",4]]],[11,"borrow_mut","","",26,[[]]],[11,"type_id","","",26,[[],["typeid",3]]],[11,"checked_as","","",26,[[],["option",4]]],[11,"az","","",26,[[]]],[11,"wrapping_as","","",26,[[]]],[11,"saturating_as","","",26,[[]]],[11,"overflowing_as","","",26,[[]]],[11,"from","libslide::grammar::pattern","",27,[[]]],[11,"into","","",27,[[]]],[11,"to_owned","","",27,[[]]],[11,"clone_into","","",27,[[]]],[11,"to_string","","",27,[[],["string",3]]],[11,"borrow","","",27,[[]]],[11,"try_from","","",27,[[],["result",4]]],[11,"try_into","","",27,[[],["result",4]]],[11,"borrow_mut","","",27,[[]]],[11,"type_id","","",27,[[],["typeid",3]]],[11,"checked_as","","",27,[[],["option",4]]],[11,"az","","",27,[[]]],[11,"wrapping_as","","",27,[[]]],[11,"saturating_as","","",27,[[]]],[11,"overflowing_as","","",27,[[]]],[11,"from","libslide::math::poly","",31,[[]]],[11,"into","","",31,[[]]],[11,"to_owned","","",31,[[]]],[11,"clone_into","","",31,[[]]],[11,"borrow","","",31,[[]]],[11,"try_from","","",31,[[],["result",4]]],[11,"try_into","","",31,[[],["result",4]]],[11,"borrow_mut","","",31,[[]]],[11,"type_id","","",31,[[],["typeid",3]]],[11,"checked_as","","",31,[[],["option",4]]],[11,"az","","",31,[[]]],[11,"wrapping_as","","",31,[[]]],[11,"saturating_as","","",31,[[]]],[11,"overflowing_as","","",31,[[]]],[11,"from","libslide::utils::grammar","",32,[[]]],[11,"into","","",32,[[]]],[11,"borrow","","",32,[[]]],[11,"try_from","","",32,[[],["result",4]]],[11,"try_into","","",32,[[],["result",4]]],[11,"borrow_mut","","",32,[[]]],[11,"type_id","","",32,[[],["typeid",3]]],[11,"checked_as","","",32,[[],["option",4]]],[11,"az","","",32,[[]]],[11,"wrapping_as","","",32,[[]]],[11,"saturating_as","","",32,[[]]],[11,"overflowing_as","","",32,[[]]],[11,"from","libslide::utils::iter","",33,[[]]],[11,"into","","",33,[[]]],[11,"into_iter","","",33,[[]]],[11,"borrow","","",33,[[]]],[11,"try_from","","",33,[[],["result",4]]],[11,"try_into","","",33,[[],["result",4]]],[11,"borrow_mut","","",33,[[]]],[11,"type_id","","",33,[[],["typeid",3]]],[11,"checked_as","","",33,[[],["option",4]]],[11,"az","","",33,[[]]],[11,"wrapping_as","","",33,[[]]],[11,"saturating_as","","",33,[[]]],[11,"overflowing_as","","",33,[[]]],[11,"from","","",34,[[]]],[11,"into","","",34,[[]]],[11,"into_iter","","",34,[[]]],[11,"borrow","","",34,[[]]],[11,"try_from","","",34,[[],["result",4]]],[11,"try_into","","",34,[[],["result",4]]],[11,"borrow_mut","","",34,[[]]],[11,"type_id","","",34,[[],["typeid",3]]],[11,"checked_as","","",34,[[],["option",4]]],[11,"az","","",34,[[]]],[11,"wrapping_as","","",34,[[]]],[11,"saturating_as","","",34,[[]]],[11,"overflowing_as","","",34,[[]]],[11,"new","libslide::parser::expression_parser","",8,[[["vec",3],["token",3]]]],[11,"errors","","",8,[[],["vec",3]]],[11,"input","","",8,[[],["peekiter",3]]],[11,"parse","","",8,[[],["stmt",4]]],[11,"parse_float","","",8,[[]]],[11,"parse_variable","","",8,[[["string",3]]]],[11,"parse_var_pattern","","",8,[[["string",3]]]],[11,"parse_const_pattern","","",8,[[["string",3]]]],[11,"parse_any_pattern","","",8,[[["string",3]]]],[11,"parse_open_paren","","",8,[[]]],[11,"parse_open_bracket","","",8,[[]]],[11,"finish_expr","","",8,[[],["rc",3]]],[11,"new","libslide::parser::expression_pattern_parser","",9,[[["vec",3],["token",3]]]],[11,"errors","","",9,[[],["vec",3]]],[11,"input","","",9,[[],["peekiter",3]]],[11,"parse","","",9,[[],[["exprpat",4],["rc",3]]]],[11,"parse_float","","",9,[[]]],[11,"parse_variable","","",9,[[["string",3]]]],[11,"parse_var_pattern","","",9,[[["string",3]]]],[11,"parse_const_pattern","","",9,[[["string",3]]]],[11,"parse_any_pattern","","",9,[[["string",3]]]],[11,"parse_open_paren","","",9,[[]]],[11,"parse_open_bracket","","",9,[[]]],[11,"finish_expr","","",9,[[],["rc",3]]],[11,"match_rule","libslide::evaluator_rules::pattern_match","",11,[[["expr",4],["rc",3],["rc",3],["exprpat",4]],[["patternmatch",3],["option",4]]]],[11,"match_rule","","",11,[[["exprpat",4],["rc",3]],[["option",4],["patternmatch",3]]]],[11,"transform","","Transforms a pattern expression into an expression by…",11,[[["exprpat",4],["rc",3]],[["rc",3],["expr",4]]]],[11,"transform","","",11,[[["exprpat",4],["rc",3]],[["exprpat",4],["rc",3]]]],[11,"transform","libslide::evaluator_rules::rule","Attempts to apply a rule on a target expression by",18,[[["rc",3],["expr",4]],[["rc",3],["expr",4]]]],[11,"transform","","Bootstraps a rule with another (or possibly the same) rule.",18,[[["exprpat",4],["rc",3]],[["exprpat",4],["rc",3]]]],[11,"s_form","libslide::grammar::pattern","",27,[[],["string",3]]],[11,"s_form","libslide::grammar","",23,[[],["string",3]]],[11,"s_form","","",24,[[],["string",3]]],[11,"is_const","libslide::grammar::pattern","",27,[[]]],[11,"is_const","libslide::grammar","",24,[[]]],[11,"from","libslide::common","",1,[[]]],[11,"from","","",1,[[["range",3]]]],[11,"from","libslide::evaluator_rules::unbuilt_rule","",19,[[]]],[11,"from","libslide::grammar::pattern","",27,[[["binaryexpr",3]]]],[11,"from","","",27,[[["unaryexpr",3]]]],[11,"from","libslide::grammar","",23,[[["expr",4]]]],[11,"from","","",23,[[["assignment",3]]]],[11,"from","","",24,[[]]],[11,"from","","",24,[[["binaryexpr",3]]]],[11,"from","","",24,[[["unaryexpr",3]]]],[11,"from","libslide::math::poly","",31,[[["vec",3]],["poly",3]]],[11,"from","","",31,[[["vec",3]],["poly",3]]],[11,"next","libslide::utils::iter","",33,[[],["option",4]]],[11,"next","","",34,[[],["option",4]]],[11,"clone","libslide::common","",1,[[],["span",3]]],[11,"clone","libslide::scanner::types","",7,[[],["tokentype",4]]],[11,"clone","","",6,[[],["token",3]]],[11,"clone","libslide::evaluator_rules::registry","",15,[[],["rulename",4]]],[11,"clone","libslide::evaluator_rules::rule","",16,[[],["patternmap",3]]],[11,"clone","libslide::evaluator_rules::unbuilt_rule","",19,[[],["unbuiltrule",4]]],[11,"clone","libslide::grammar::pattern","",27,[[],["exprpat",4]]],[11,"clone","libslide::grammar","",23,[[],["stmt",4]]],[11,"clone","","",20,[[],["assignment",3]]],[11,"clone","","",24,[[],["expr",4]]],[11,"clone","","",25,[[],["binaryoperator",4]]],[11,"clone","","",21,[[],["binaryexpr",3]]],[11,"clone","","",26,[[],["unaryoperator",4]]],[11,"clone","","",22,[[],["unaryexpr",3]]],[11,"clone","libslide::math::poly","",31,[[],["poly",3]]],[11,"default","libslide","",0,[[]]],[11,"default","libslide::evaluator_rules::pattern_match","",11,[[]]],[11,"default","libslide::evaluator_rules::registry","Constructs the default rule set.",13,[[]]],[11,"default","libslide::math::poly","",31,[[],["poly",3]]],[11,"cmp","libslide::evaluator_rules::registry","",15,[[],["ordering",4]]],[11,"cmp","libslide::grammar","",24,[[],["ordering",4]]],[11,"eq","libslide::common","",1,[[["span",3]]]],[11,"ne","","",1,[[["span",3]]]],[11,"eq","libslide::scanner::types","",7,[[["tokentype",4]]]],[11,"ne","","",7,[[["tokentype",4]]]],[11,"eq","","",6,[[["token",3]]]],[11,"ne","","",6,[[["token",3]]]],[11,"eq","libslide::evaluator_rules::registry","",15,[[["rulename",4]]]],[11,"eq","libslide::grammar::pattern","",27,[[["exprpat",4]]]],[11,"eq","libslide::grammar","",24,[[["expr",4]]]],[11,"ne","","",24,[[["expr",4]]]],[11,"eq","","",25,[[["binaryoperator",4]]]],[11,"eq","","",21,[[["binaryexpr",3]]]],[11,"ne","","",21,[[["binaryexpr",3]]]],[11,"eq","","",26,[[["unaryoperator",4]]]],[11,"eq","","",22,[[["unaryexpr",3]]]],[11,"ne","","",22,[[["unaryexpr",3]]]],[11,"eq","libslide::math::poly","",31,[[["poly",3]]]],[11,"ne","","",31,[[["poly",3]]]],[11,"partial_cmp","libslide::evaluator_rules::registry","",15,[[],[["ordering",4],["option",4]]]],[11,"partial_cmp","libslide::grammar","",24,[[],[["ordering",4],["option",4]]]],[11,"partial_cmp","","",25,[[],[["ordering",4],["option",4]]]],[11,"fmt","libslide::common","",1,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::scanner::types","",7,[[["formatter",3]],["result",6]]],[11,"fmt","","",6,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::evaluator_rules::registry","",15,[[["formatter",3]],["result",6]]],[11,"fmt","","",14,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::evaluator_rules::rule","",16,[[["formatter",3]],["result",6]]],[11,"fmt","","",17,[[["formatter",3]],["result",6]]],[11,"fmt","","",18,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::grammar::pattern","",27,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::grammar","",23,[[["formatter",3]],["result",6]]],[11,"fmt","","",20,[[["formatter",3]],["result",6]]],[11,"fmt","","",24,[[["formatter",3]],["result",6]]],[11,"fmt","","",25,[[["formatter",3]],["result",6]]],[11,"fmt","","",21,[[["formatter",3]],["result",6]]],[11,"fmt","","",26,[[["formatter",3]],["result",6]]],[11,"fmt","","",22,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::math::poly","",31,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::scanner::types","",6,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::evaluator_rules::registry","",14,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::evaluator_rules::rule","",16,[[["formatter",3]],["result",6]]],[11,"fmt","","",17,[[["formatter",3]],["result",6]]],[11,"fmt","","",18,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::grammar::pattern","",27,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::grammar","",23,[[["formatter",3]],["result",6]]],[11,"fmt","","",20,[[["formatter",3]],["result",6]]],[11,"fmt","","",24,[[["formatter",3]],["result",6]]],[11,"fmt","","",25,[[["formatter",3]],["result",6]]],[11,"fmt","","",21,[[["formatter",3]],["result",6]]],[11,"fmt","","",21,[[["formatter",3]],["result",6]]],[11,"fmt","","",26,[[["formatter",3]],["result",6]]],[11,"fmt","","",22,[[["formatter",3]],["result",6]]],[11,"fmt","","",22,[[["formatter",3]],["result",6]]],[11,"hash","libslide::evaluator_rules::registry","",15,[[]]],[11,"hash","libslide::grammar::pattern","",27,[[]]],[11,"hash","libslide::grammar","",24,[[]]],[11,"hash","","",25,[[]]],[11,"hash","","",21,[[]]],[11,"hash","","",26,[[]]],[11,"hash","","",22,[[]]],[11,"try_from","","",25,[[["token",3]],["result",4]]],[11,"try_from","","",26,[[["token",3]],["result",4]]]],"p":[[3,"EvaluatorContext"],[3,"Span"],[3,"Diagnostic"],[4,"DiagnosticKind"],[3,"ScanResult"],[3,"Scanner"],[3,"Token"],[4,"TokenType"],[3,"ExpressionParser"],[3,"ExpressionPatternParser"],[8,"Parser"],[3,"PatternMatch"],[8,"MatchRule"],[3,"RuleSet"],[3,"BuildRuleErrors"],[4,"RuleName"],[3,"PatternMap"],[3,"UnresolvedMapping"],[4,"Rule"],[4,"UnbuiltRule"],[3,"Assignment"],[3,"BinaryExpr"],[3,"UnaryExpr"],[4,"Stmt"],[4,"Expr"],[4,"BinaryOperator"],[4,"UnaryOperator"],[4,"ExprPat"],[8,"Transformer"],[8,"Grammar"],[8,"Expression"],[3,"Poly"],[4,"UnflattenStrategy"],[3,"PeekingTakeWhile"],[3,"PeekIter"],[8,"StringUtils"]]},\
"slide":{"doc":"","i":[],"p":[]}\
}');
addSearchOptions(searchIndex);initSearch(searchIndex);