var searchIndex = JSON.parse('{\
"libslide":{"doc":"","i":[[3,"EvaluatorContext","libslide","",null,null],[12,"rule_blacklist","","Rules that should not be included in the evaluation of an…",0,null],[12,"always_flatten","","Whether an expression should always be flattened before it…",0,null],[5,"scan","","",null,[[["into",8],["string",3]],[["vec",3],["token",3]]]],[5,"parse_expression","","",null,[[["vec",3],["token",3]]]],[5,"parse_expression_pattern","","",null,[[["vec",3],["token",3]]]],[5,"evaluate","","Evaluates an expression to as simplified a form as…",null,[[["evaluatorcontext",3],["stmt",4]],[["expr",4],["result",4],["box",3]]]],[0,"scanner","","",null,null],[3,"Scanner","libslide::scanner","",null,null],[12,"input","","",1,null],[12,"output","","",1,null],[5,"scan","","",null,[[["into",8],["string",3]],[["vec",3],["token",3]]]],[0,"types","","",null,null],[3,"Token","libslide::scanner::types","",null,null],[12,"ty","","",2,null],[4,"TokenType","","",null,null],[13,"Float","","",3,null],[13,"Plus","","",3,null],[13,"Minus","","",3,null],[13,"Mult","","",3,null],[13,"Div","","",3,null],[13,"Mod","","",3,null],[13,"Exp","","",3,null],[13,"Equal","","",3,null],[13,"OpenParen","","",3,null],[13,"CloseParen","","",3,null],[13,"OpenBracket","","",3,null],[13,"CloseBracket","","",3,null],[13,"Variable","","",3,null],[13,"VariablePattern","","",3,null],[13,"ConstPattern","","",3,null],[13,"AnyPattern","","",3,null],[13,"Invalid","","",3,null],[13,"EOF","","",3,null],[11,"new","","",2,[[["tokentype",4]]]],[11,"new","libslide::scanner","",1,[[["into",8],["string",3]],["scanner",3]]],[11,"scan","","",1,[[]]],[11,"scan_symbol","","",1,[[]]],[11,"scan_num","","",1,[[]]],[11,"scan_var_str","","",1,[[],["string",3]]],[11,"scan_var","","",1,[[]]],[11,"scan_var_pattern","","",1,[[]]],[11,"scan_const_pattern","","",1,[[]]],[11,"scan_any_pattern","","",1,[[]]],[0,"parser","libslide","",null,null],[0,"test_utils","libslide::parser","",null,null],[0,"expression_parser","","",null,null],[3,"ExpressionParser","libslide::parser::expression_parser","",null,null],[12,"_input","","",4,null],[12,"_errors","","",4,null],[12,"seen","","",4,null],[5,"parse","","",null,[[["vec",3],["token",3]]]],[11,"assignment","","",4,[[["string",3]],["stmt",4]]],[11,"parse_pattern","","",4,[[["string",3]],["expr",4]]],[0,"expression_pattern_parser","libslide::parser","",null,null],[3,"ExpressionPatternParser","libslide::parser::expression_pattern_parser","",null,null],[12,"_input","","",5,null],[12,"_errors","","",5,null],[12,"seen","","",5,null],[5,"parse","","",null,[[["vec",3],["token",3]]]],[8,"Parser","libslide::parser","",null,null],[16,"Expr","","",6,null],[16,"Error","","",6,null],[10,"new","","",6,[[["vec",3],["token",3]]]],[10,"errors","","",6,[[],["vec",3]]],[10,"input","","",6,[[],["peekiter",3]]],[10,"parse","","",6,[[]]],[10,"parse_float","","",6,[[]]],[10,"parse_variable","","",6,[[["string",3]]]],[10,"parse_var_pattern","","",6,[[["string",3]]]],[10,"parse_const_pattern","","",6,[[["string",3]]]],[10,"parse_any_pattern","","",6,[[["string",3]]]],[10,"parse_open_paren","","",6,[[]]],[10,"parse_open_bracket","","",6,[[]]],[10,"finish_expr","","",6,[[],["rc",3]]],[11,"done","","",6,[[]]],[11,"expr","","",6,[[],["rc",3]]],[11,"add_sub_term","","",6,[[],["rc",3]]],[11,"mul_divide_mod_term","","",6,[[],["rc",3]]],[11,"exp_term","","",6,[[],["rc",3]]],[11,"num_term","","",6,[[],["rc",3]]],[0,"partial_evaluator","libslide","",null,null],[5,"evaluate","libslide::partial_evaluator","Evaluates an expression to as simplified a form as…",null,[[["evaluatorcontext",3],["stmt",4]],[["expr",4],["result",4],["box",3]]]],[0,"flatten","","This module tries to flatten expressions as far as…",null,null],[5,"flatten_expr","libslide::partial_evaluator::flatten","Attempts to flatten an expression, folding constant…",null,[[["rc",3]],[["expr",4],["rc",3]]]],[5,"flatten_add_or_sub","","Flattens an addition or subtraction, folding constants and…",null,[[["rc",3]],[["expr",4],["rc",3]]]],[0,"types","libslide::partial_evaluator","",null,null],[3,"EvaluatorContext","libslide::partial_evaluator::types","",null,null],[12,"rule_blacklist","","Rules that should not be included in the evaluation of an…",0,null],[12,"always_flatten","","Whether an expression should always be flattened before it…",0,null],[11,"with_blacklist","libslide","",0,[[]]],[11,"always_flatten","","",0,[[]]],[0,"evaluator_rules","","",null,null],[0,"pattern_match","libslide::evaluator_rules","",null,null],[3,"PatternMatch","libslide::evaluator_rules::pattern_match","Represents pattern-matched replacements betwen a rule and…",null,null],[12,"map","","",7,null],[8,"MatchRule","","",null,null],[10,"match_rule","","Pattern matches a rule template against an expression. If…",8,[[["rc",3],["exprpat",4],["rc",3]],[["option",4],["patternmatch",3]]]],[11,"try_merge","","Merges two `PatternMatch`. If the `PatternMatch` are of…",7,[[["patternmatch",3]],[["option",4],["patternmatch",3]]]],[11,"insert","","",7,[[["rc",3],["rc",3]],[["rc",3],["option",4]]]],[0,"registry","libslide::evaluator_rules","",null,null],[3,"RuleSet","libslide::evaluator_rules::registry","Set of unbuilt rules.",null,null],[12,"rules","","",9,null],[12,"custom_rules","","",9,null],[3,"BuildRuleErrors","","",null,null],[12,"errors","","",10,null],[4,"RuleName","","",null,null],[13,"UnwrapExplicitParens","","",11,null],[13,"UnwrapExplicitBrackets","","",11,null],[13,"Add","","",11,null],[13,"Subtract","","",11,null],[13,"Multiply","","",11,null],[13,"Divide","","",11,null],[13,"Modulo","","",11,null],[13,"Exponentiate","","",11,null],[13,"Posate","","",11,null],[13,"Negate","","",11,null],[13,"MultiplicateIdentity","","",11,null],[13,"AdditiveIdentity","","",11,null],[13,"AdditiveInverse","","",11,null],[13,"SubtractiveIdentity","","",11,null],[13,"ReorderConstants","","",11,null],[13,"DistributeNegation","","",11,null],[13,"FoldNegatedAddition","","",11,null],[5,"get_all_rules","","",null,[[],[["hashmap",3],["rulename",4],["unbuiltrule",4]]]],[0,"fn_rules","","",null,null],[5,"add","libslide::evaluator_rules::registry::fn_rules","",null,[[["expr",4],["rc",3]],[["rc",3],["option",4]]]],[5,"subtract","","",null,[[["expr",4],["rc",3]],[["rc",3],["option",4]]]],[5,"multiply","","",null,[[["expr",4],["rc",3]],[["rc",3],["option",4]]]],[5,"divide","","",null,[[["expr",4],["rc",3]],[["rc",3],["option",4]]]],[5,"modulo","","",null,[[["expr",4],["rc",3]],[["rc",3],["option",4]]]],[5,"exponentiate","","",null,[[["expr",4],["rc",3]],[["rc",3],["option",4]]]],[5,"posate","","",null,[[["expr",4],["rc",3]],[["rc",3],["option",4]]]],[5,"negate","","",null,[[["expr",4],["rc",3]],[["rc",3],["option",4]]]],[11,"build","libslide::evaluator_rules::registry","Creates a list of `Rules`s from the unbuilt rule set.",9,[[],[["result",4],["vec",3],["buildruleerrors",3]]]],[11,"remove","","Remove a named rule from the rule set.",9,[[["rulename",4]]]],[11,"insert_custom","","Insert a custom unbuilt rule into the rule set.",9,[[["into",8],["unbuiltrule",4]]]],[11,"get_bootstrapping_rules","","Retrieves a set of rules to be used in bootstrapping other…",9,[[],[["rule",4],["vec",3]]]],[11,"get_boostrap_blacklist","","Retrieves a set of rules to be excluded from being…",9,[[],[["option",4],["hashset",3]]]],[0,"rule","libslide::evaluator_rules","",null,null],[3,"PatternMap","libslide::evaluator_rules::rule","A mapping between two expression patterns.",null,null],[12,"from","","",12,null],[12,"to","","",12,null],[3,"UnresolvedMapping","","",null,null],[12,"map","","",13,null],[12,"unresolved_pats","","",13,null],[4,"Rule","","",null,null],[13,"PatternMap","","",14,null],[13,"Evaluate","","",14,null],[5,"fn_name","","",null,[[]]],[11,"from_str","","Converts a string representation of a rule to a…",12,[[]]],[11,"bootstrap","","Bootstraps a `PatternMap` rule with a one-pass application…",12,[[]]],[11,"validate","","Checks a `PatternMap` is resolvable, returning an error if…",12,[[],[["option",4],["unresolvedmapping",3]]]],[11,"from_fn","","",14,[[]]],[0,"unbuilt_rule","libslide::evaluator_rules","",null,null],[4,"UnbuiltRule","libslide::evaluator_rules::unbuilt_rule","An unbuilt rule, generally used to express a rule in a…",null,null],[13,"S","","An expression-mapping rule.",15,null],[13,"F","","A function rule.",15,null],[0,"grammar","libslide","",null,null],[3,"Assignment","libslide::grammar","",null,null],[12,"var","","",16,null],[12,"rhs","","",16,null],[3,"BinaryExpr","","",null,null],[12,"op","","",17,null],[12,"lhs","","",17,null],[12,"rhs","","",17,null],[3,"UnaryExpr","","",null,null],[12,"op","","",18,null],[12,"rhs","","",18,null],[4,"Stmt","","",null,null],[13,"Expr","","",19,null],[13,"Assignment","","",19,null],[4,"Expr","","",null,null],[13,"Const","","",20,null],[13,"Var","","",20,null],[13,"BinaryExpr","","",20,null],[13,"UnaryExpr","","",20,null],[13,"Parend","","An expression wrapped in parentheses",20,null],[13,"Bracketed","","An expression wrapped in brackets",20,null],[4,"BinaryOperator","","",null,null],[13,"Plus","","",21,null],[13,"Minus","","",21,null],[13,"Mult","","",21,null],[13,"Div","","",21,null],[13,"Mod","","",21,null],[13,"Exp","","",21,null],[4,"UnaryOperator","","",null,null],[13,"SignPositive","","",22,null],[13,"SignNegative","","",22,null],[0,"pattern","","",null,null],[4,"ExprPat","libslide::grammar::pattern","",null,null],[13,"Const","","",23,null],[13,"VarPat","","Pattern matching a variable",23,null],[13,"ConstPat","","Pattern matching a constant",23,null],[13,"AnyPat","","Pattern matching any expression",23,null],[13,"BinaryExpr","","",23,null],[13,"UnaryExpr","","",23,null],[13,"Parend","","",23,null],[13,"Bracketed","","",23,null],[0,"transformer","libslide::grammar","",null,null],[8,"Transformer","libslide::grammar::transformer","A trait for transforming one grammar into another. This…",null,null],[10,"transform","","",24,[[]]],[8,"Grammar","libslide::grammar","",null,null],[10,"s_form","","Returns the S-expression form of this expression. For…",25,[[],["string",3]]],[8,"Expression","","",null,null],[10,"is_const","","",26,[[]]],[11,"complexity","","",20,[[]]],[11,"mult","","",17,[[]]],[11,"negate","","",18,[[]]],[0,"math","libslide","",null,null],[0,"gcd","libslide::math","",null,null],[5,"gcd","libslide::math::gcd","Calculates the GCD for (u, v) ∈ (Z, Z).",null,[[["primint",8],["unsigned",8]],[["primint",8],["unsigned",8]]]],[5,"binary_gcd","","The [Binary GCD] algorithm, or Stein\'s algorithm.…",null,[[["primint",8],["unsigned",8]],[["primint",8],["unsigned",8]]]],[5,"euclidean_gcd","","The [Euclidean GCD] algorithm. Implemented ∀ (u, v) ∈ (Z,…",null,[[["primint",8],["unsigned",8]],[["primint",8],["unsigned",8]]]],[0,"utils","libslide","",null,null],[0,"grammar","libslide::utils","",null,null],[4,"UnflattenStrategy","libslide::utils::grammar","",null,null],[13,"Left","","",27,null],[13,"Right","","",27,null],[5,"get_symmetric_expressions","","",null,[[["expr",4],["rc",3]],[["vec",3],["rc",3]]]],[5,"get_flattened_binary_args","","",null,[[["expr",4],["binaryoperator",4],["rc",3]],[["vec",3],["rc",3]]]],[5,"negate","","",null,[[["expr",4],["rc",3]],[["expr",4],["rc",3]]]],[5,"unflatten_binary_expr","","",null,[[["binaryoperator",4],["unflattenstrategy",4]],["rc",3]]],[5,"unique_pats","","Returns all unique patterns in a pattern expression.",null,[[["rc",3]],[["rc",3],["hashset",3]]]],[5,"normalize","","",null,[[["expr",4],["rc",3]],[["expr",4],["rc",3]]]],[0,"hash","libslide::utils","",null,null],[5,"hash","libslide::utils::hash","",null,[[]]],[0,"iter","libslide::utils","",null,null],[3,"PeekingTakeWhile","libslide::utils::iter","A [`TakeWhile`]-like struct that tests a predicate by…",null,null],[12,"peeker","","A mutable reference to the underlying iterator is taken…",28,null],[12,"predicate","","",28,null],[3,"PeekIter","","An iterator that supports arbitrary-length peeking.",null,null],[12,"iter","","",29,null],[12,"lookahead","","A store of items we had to consume from the iterator for…",29,null],[11,"new","","",28,[[["peekiter",3]]]],[11,"new","","",29,[[["intoiter",3]]]],[11,"peek","","Returns a reference to the next value in the iterator,…",29,[[],["option",4]]],[11,"peek_map_n","","Returns a deque of up to `n` peeked items mapped over a…",29,[[],["vecdeque",3]]],[11,"collect_while","","Collects items in the iteration while `predicate` returns…",29,[[]]],[11,"push_front","","Adds an item to the front of the current iteration.",29,[[]]],[0,"string","libslide::utils","",null,null],[5,"indent","libslide::utils::string","Indents all lines of a string with `n` spaces.",null,[[["into",8],["string",3]],["string",3]]],[8,"StringUtils","","",null,null],[10,"substring","","",30,[[]]],[8,"Grammar","libslide","",null,null],[10,"s_form","","Returns the S-expression form of this expression. For…",25,[[],["string",3]]],[11,"from","","",0,[[]]],[11,"into","","",0,[[]]],[11,"borrow","","",0,[[]]],[11,"try_from","","",0,[[],["result",4]]],[11,"try_into","","",0,[[],["result",4]]],[11,"borrow_mut","","",0,[[]]],[11,"type_id","","",0,[[],["typeid",3]]],[11,"checked_as","","",0,[[],["option",4]]],[11,"az","","",0,[[]]],[11,"wrapping_as","","",0,[[]]],[11,"saturating_as","","",0,[[]]],[11,"overflowing_as","","",0,[[]]],[11,"from","libslide::scanner","",1,[[]]],[11,"into","","",1,[[]]],[11,"borrow","","",1,[[]]],[11,"try_from","","",1,[[],["result",4]]],[11,"try_into","","",1,[[],["result",4]]],[11,"borrow_mut","","",1,[[]]],[11,"type_id","","",1,[[],["typeid",3]]],[11,"checked_as","","",1,[[],["option",4]]],[11,"az","","",1,[[]]],[11,"wrapping_as","","",1,[[]]],[11,"saturating_as","","",1,[[]]],[11,"overflowing_as","","",1,[[]]],[11,"from","libslide::scanner::types","",2,[[]]],[11,"into","","",2,[[]]],[11,"to_owned","","",2,[[]]],[11,"clone_into","","",2,[[]]],[11,"to_string","","",2,[[],["string",3]]],[11,"borrow","","",2,[[]]],[11,"try_from","","",2,[[],["result",4]]],[11,"try_into","","",2,[[],["result",4]]],[11,"borrow_mut","","",2,[[]]],[11,"type_id","","",2,[[],["typeid",3]]],[11,"checked_as","","",2,[[],["option",4]]],[11,"az","","",2,[[]]],[11,"wrapping_as","","",2,[[]]],[11,"saturating_as","","",2,[[]]],[11,"overflowing_as","","",2,[[]]],[11,"from","","",3,[[]]],[11,"into","","",3,[[]]],[11,"to_owned","","",3,[[]]],[11,"clone_into","","",3,[[]]],[11,"borrow","","",3,[[]]],[11,"try_from","","",3,[[],["result",4]]],[11,"try_into","","",3,[[],["result",4]]],[11,"borrow_mut","","",3,[[]]],[11,"type_id","","",3,[[],["typeid",3]]],[11,"checked_as","","",3,[[],["option",4]]],[11,"az","","",3,[[]]],[11,"wrapping_as","","",3,[[]]],[11,"saturating_as","","",3,[[]]],[11,"overflowing_as","","",3,[[]]],[11,"from","libslide::parser::expression_parser","",4,[[]]],[11,"into","","",4,[[]]],[11,"borrow","","",4,[[]]],[11,"try_from","","",4,[[],["result",4]]],[11,"try_into","","",4,[[],["result",4]]],[11,"borrow_mut","","",4,[[]]],[11,"type_id","","",4,[[],["typeid",3]]],[11,"checked_as","","",4,[[],["option",4]]],[11,"az","","",4,[[]]],[11,"wrapping_as","","",4,[[]]],[11,"saturating_as","","",4,[[]]],[11,"overflowing_as","","",4,[[]]],[11,"from","libslide::parser::expression_pattern_parser","",5,[[]]],[11,"into","","",5,[[]]],[11,"borrow","","",5,[[]]],[11,"try_from","","",5,[[],["result",4]]],[11,"try_into","","",5,[[],["result",4]]],[11,"borrow_mut","","",5,[[]]],[11,"type_id","","",5,[[],["typeid",3]]],[11,"checked_as","","",5,[[],["option",4]]],[11,"az","","",5,[[]]],[11,"wrapping_as","","",5,[[]]],[11,"saturating_as","","",5,[[]]],[11,"overflowing_as","","",5,[[]]],[11,"from","libslide::evaluator_rules::pattern_match","",7,[[]]],[11,"into","","",7,[[]]],[11,"borrow","","",7,[[]]],[11,"try_from","","",7,[[],["result",4]]],[11,"try_into","","",7,[[],["result",4]]],[11,"borrow_mut","","",7,[[]]],[11,"type_id","","",7,[[],["typeid",3]]],[11,"checked_as","","",7,[[],["option",4]]],[11,"az","","",7,[[]]],[11,"wrapping_as","","",7,[[]]],[11,"saturating_as","","",7,[[]]],[11,"overflowing_as","","",7,[[]]],[11,"from","libslide::evaluator_rules::registry","",9,[[]]],[11,"into","","",9,[[]]],[11,"borrow","","",9,[[]]],[11,"try_from","","",9,[[],["result",4]]],[11,"try_into","","",9,[[],["result",4]]],[11,"borrow_mut","","",9,[[]]],[11,"type_id","","",9,[[],["typeid",3]]],[11,"checked_as","","",9,[[],["option",4]]],[11,"az","","",9,[[]]],[11,"wrapping_as","","",9,[[]]],[11,"saturating_as","","",9,[[]]],[11,"overflowing_as","","",9,[[]]],[11,"from","","",10,[[]]],[11,"into","","",10,[[]]],[11,"to_string","","",10,[[],["string",3]]],[11,"borrow","","",10,[[]]],[11,"try_from","","",10,[[],["result",4]]],[11,"try_into","","",10,[[],["result",4]]],[11,"borrow_mut","","",10,[[]]],[11,"type_id","","",10,[[],["typeid",3]]],[11,"checked_as","","",10,[[],["option",4]]],[11,"az","","",10,[[]]],[11,"wrapping_as","","",10,[[]]],[11,"saturating_as","","",10,[[]]],[11,"overflowing_as","","",10,[[]]],[11,"from","","",11,[[]]],[11,"into","","",11,[[]]],[11,"to_owned","","",11,[[]]],[11,"clone_into","","",11,[[]]],[11,"borrow","","",11,[[]]],[11,"try_from","","",11,[[],["result",4]]],[11,"try_into","","",11,[[],["result",4]]],[11,"borrow_mut","","",11,[[]]],[11,"type_id","","",11,[[],["typeid",3]]],[11,"checked_as","","",11,[[],["option",4]]],[11,"az","","",11,[[]]],[11,"wrapping_as","","",11,[[]]],[11,"saturating_as","","",11,[[]]],[11,"overflowing_as","","",11,[[]]],[11,"from","libslide::evaluator_rules::rule","",12,[[]]],[11,"into","","",12,[[]]],[11,"to_owned","","",12,[[]]],[11,"clone_into","","",12,[[]]],[11,"to_string","","",12,[[],["string",3]]],[11,"borrow","","",12,[[]]],[11,"try_from","","",12,[[],["result",4]]],[11,"try_into","","",12,[[],["result",4]]],[11,"borrow_mut","","",12,[[]]],[11,"type_id","","",12,[[],["typeid",3]]],[11,"checked_as","","",12,[[],["option",4]]],[11,"az","","",12,[[]]],[11,"wrapping_as","","",12,[[]]],[11,"saturating_as","","",12,[[]]],[11,"overflowing_as","","",12,[[]]],[11,"from","","",13,[[]]],[11,"into","","",13,[[]]],[11,"to_string","","",13,[[],["string",3]]],[11,"borrow","","",13,[[]]],[11,"try_from","","",13,[[],["result",4]]],[11,"try_into","","",13,[[],["result",4]]],[11,"borrow_mut","","",13,[[]]],[11,"type_id","","",13,[[],["typeid",3]]],[11,"checked_as","","",13,[[],["option",4]]],[11,"az","","",13,[[]]],[11,"wrapping_as","","",13,[[]]],[11,"saturating_as","","",13,[[]]],[11,"overflowing_as","","",13,[[]]],[11,"from","","",14,[[]]],[11,"into","","",14,[[]]],[11,"to_string","","",14,[[],["string",3]]],[11,"borrow","","",14,[[]]],[11,"try_from","","",14,[[],["result",4]]],[11,"try_into","","",14,[[],["result",4]]],[11,"borrow_mut","","",14,[[]]],[11,"type_id","","",14,[[],["typeid",3]]],[11,"checked_as","","",14,[[],["option",4]]],[11,"az","","",14,[[]]],[11,"wrapping_as","","",14,[[]]],[11,"saturating_as","","",14,[[]]],[11,"overflowing_as","","",14,[[]]],[11,"from","libslide::evaluator_rules::unbuilt_rule","",15,[[]]],[11,"into","","",15,[[]]],[11,"to_owned","","",15,[[]]],[11,"clone_into","","",15,[[]]],[11,"borrow","","",15,[[]]],[11,"try_from","","",15,[[],["result",4]]],[11,"try_into","","",15,[[],["result",4]]],[11,"borrow_mut","","",15,[[]]],[11,"type_id","","",15,[[],["typeid",3]]],[11,"checked_as","","",15,[[],["option",4]]],[11,"az","","",15,[[]]],[11,"wrapping_as","","",15,[[]]],[11,"saturating_as","","",15,[[]]],[11,"overflowing_as","","",15,[[]]],[11,"from","libslide::grammar","",16,[[]]],[11,"into","","",16,[[]]],[11,"to_owned","","",16,[[]]],[11,"clone_into","","",16,[[]]],[11,"to_string","","",16,[[],["string",3]]],[11,"borrow","","",16,[[]]],[11,"try_from","","",16,[[],["result",4]]],[11,"try_into","","",16,[[],["result",4]]],[11,"borrow_mut","","",16,[[]]],[11,"type_id","","",16,[[],["typeid",3]]],[11,"checked_as","","",16,[[],["option",4]]],[11,"az","","",16,[[]]],[11,"wrapping_as","","",16,[[]]],[11,"saturating_as","","",16,[[]]],[11,"overflowing_as","","",16,[[]]],[11,"from","","",17,[[]]],[11,"into","","",17,[[]]],[11,"to_owned","","",17,[[]]],[11,"clone_into","","",17,[[]]],[11,"to_string","","",17,[[],["string",3]]],[11,"borrow","","",17,[[]]],[11,"try_from","","",17,[[],["result",4]]],[11,"try_into","","",17,[[],["result",4]]],[11,"borrow_mut","","",17,[[]]],[11,"type_id","","",17,[[],["typeid",3]]],[11,"checked_as","","",17,[[],["option",4]]],[11,"az","","",17,[[]]],[11,"wrapping_as","","",17,[[]]],[11,"saturating_as","","",17,[[]]],[11,"overflowing_as","","",17,[[]]],[11,"from","","",18,[[]]],[11,"into","","",18,[[]]],[11,"to_owned","","",18,[[]]],[11,"clone_into","","",18,[[]]],[11,"to_string","","",18,[[],["string",3]]],[11,"borrow","","",18,[[]]],[11,"try_from","","",18,[[],["result",4]]],[11,"try_into","","",18,[[],["result",4]]],[11,"borrow_mut","","",18,[[]]],[11,"type_id","","",18,[[],["typeid",3]]],[11,"checked_as","","",18,[[],["option",4]]],[11,"az","","",18,[[]]],[11,"wrapping_as","","",18,[[]]],[11,"saturating_as","","",18,[[]]],[11,"overflowing_as","","",18,[[]]],[11,"from","","",19,[[]]],[11,"into","","",19,[[]]],[11,"to_owned","","",19,[[]]],[11,"clone_into","","",19,[[]]],[11,"to_string","","",19,[[],["string",3]]],[11,"borrow","","",19,[[]]],[11,"try_from","","",19,[[],["result",4]]],[11,"try_into","","",19,[[],["result",4]]],[11,"borrow_mut","","",19,[[]]],[11,"type_id","","",19,[[],["typeid",3]]],[11,"checked_as","","",19,[[],["option",4]]],[11,"az","","",19,[[]]],[11,"wrapping_as","","",19,[[]]],[11,"saturating_as","","",19,[[]]],[11,"overflowing_as","","",19,[[]]],[11,"from","","",20,[[]]],[11,"into","","",20,[[]]],[11,"to_owned","","",20,[[]]],[11,"clone_into","","",20,[[]]],[11,"to_string","","",20,[[],["string",3]]],[11,"borrow","","",20,[[]]],[11,"try_from","","",20,[[],["result",4]]],[11,"try_into","","",20,[[],["result",4]]],[11,"borrow_mut","","",20,[[]]],[11,"type_id","","",20,[[],["typeid",3]]],[11,"checked_as","","",20,[[],["option",4]]],[11,"az","","",20,[[]]],[11,"wrapping_as","","",20,[[]]],[11,"saturating_as","","",20,[[]]],[11,"overflowing_as","","",20,[[]]],[11,"from","","",21,[[]]],[11,"into","","",21,[[]]],[11,"to_owned","","",21,[[]]],[11,"clone_into","","",21,[[]]],[11,"to_string","","",21,[[],["string",3]]],[11,"borrow","","",21,[[]]],[11,"try_from","","",21,[[],["result",4]]],[11,"try_into","","",21,[[],["result",4]]],[11,"borrow_mut","","",21,[[]]],[11,"type_id","","",21,[[],["typeid",3]]],[11,"checked_as","","",21,[[],["option",4]]],[11,"az","","",21,[[]]],[11,"wrapping_as","","",21,[[]]],[11,"saturating_as","","",21,[[]]],[11,"overflowing_as","","",21,[[]]],[11,"from","","",22,[[]]],[11,"into","","",22,[[]]],[11,"to_owned","","",22,[[]]],[11,"clone_into","","",22,[[]]],[11,"to_string","","",22,[[],["string",3]]],[11,"borrow","","",22,[[]]],[11,"try_from","","",22,[[],["result",4]]],[11,"try_into","","",22,[[],["result",4]]],[11,"borrow_mut","","",22,[[]]],[11,"type_id","","",22,[[],["typeid",3]]],[11,"checked_as","","",22,[[],["option",4]]],[11,"az","","",22,[[]]],[11,"wrapping_as","","",22,[[]]],[11,"saturating_as","","",22,[[]]],[11,"overflowing_as","","",22,[[]]],[11,"from","libslide::grammar::pattern","",23,[[]]],[11,"into","","",23,[[]]],[11,"to_owned","","",23,[[]]],[11,"clone_into","","",23,[[]]],[11,"to_string","","",23,[[],["string",3]]],[11,"borrow","","",23,[[]]],[11,"try_from","","",23,[[],["result",4]]],[11,"try_into","","",23,[[],["result",4]]],[11,"borrow_mut","","",23,[[]]],[11,"type_id","","",23,[[],["typeid",3]]],[11,"checked_as","","",23,[[],["option",4]]],[11,"az","","",23,[[]]],[11,"wrapping_as","","",23,[[]]],[11,"saturating_as","","",23,[[]]],[11,"overflowing_as","","",23,[[]]],[11,"from","libslide::utils::grammar","",27,[[]]],[11,"into","","",27,[[]]],[11,"borrow","","",27,[[]]],[11,"try_from","","",27,[[],["result",4]]],[11,"try_into","","",27,[[],["result",4]]],[11,"borrow_mut","","",27,[[]]],[11,"type_id","","",27,[[],["typeid",3]]],[11,"checked_as","","",27,[[],["option",4]]],[11,"az","","",27,[[]]],[11,"wrapping_as","","",27,[[]]],[11,"saturating_as","","",27,[[]]],[11,"overflowing_as","","",27,[[]]],[11,"from","libslide::utils::iter","",28,[[]]],[11,"into","","",28,[[]]],[11,"into_iter","","",28,[[]]],[11,"borrow","","",28,[[]]],[11,"try_from","","",28,[[],["result",4]]],[11,"try_into","","",28,[[],["result",4]]],[11,"borrow_mut","","",28,[[]]],[11,"type_id","","",28,[[],["typeid",3]]],[11,"checked_as","","",28,[[],["option",4]]],[11,"az","","",28,[[]]],[11,"wrapping_as","","",28,[[]]],[11,"saturating_as","","",28,[[]]],[11,"overflowing_as","","",28,[[]]],[11,"from","","",29,[[]]],[11,"into","","",29,[[]]],[11,"into_iter","","",29,[[]]],[11,"borrow","","",29,[[]]],[11,"try_from","","",29,[[],["result",4]]],[11,"try_into","","",29,[[],["result",4]]],[11,"borrow_mut","","",29,[[]]],[11,"type_id","","",29,[[],["typeid",3]]],[11,"checked_as","","",29,[[],["option",4]]],[11,"az","","",29,[[]]],[11,"wrapping_as","","",29,[[]]],[11,"saturating_as","","",29,[[]]],[11,"overflowing_as","","",29,[[]]],[11,"new","libslide::parser::expression_parser","",4,[[["vec",3],["token",3]]]],[11,"errors","","",4,[[],["vec",3]]],[11,"input","","",4,[[],["peekiter",3]]],[11,"parse","","",4,[[],["stmt",4]]],[11,"parse_float","","",4,[[]]],[11,"parse_variable","","",4,[[["string",3]]]],[11,"parse_var_pattern","","",4,[[["string",3]]]],[11,"parse_const_pattern","","",4,[[["string",3]]]],[11,"parse_any_pattern","","",4,[[["string",3]]]],[11,"parse_open_paren","","",4,[[]]],[11,"parse_open_bracket","","",4,[[]]],[11,"finish_expr","","",4,[[],["rc",3]]],[11,"new","libslide::parser::expression_pattern_parser","",5,[[["vec",3],["token",3]]]],[11,"errors","","",5,[[],["vec",3]]],[11,"input","","",5,[[],["peekiter",3]]],[11,"parse","","",5,[[],[["exprpat",4],["rc",3]]]],[11,"parse_float","","",5,[[]]],[11,"parse_variable","","",5,[[["string",3]]]],[11,"parse_var_pattern","","",5,[[["string",3]]]],[11,"parse_const_pattern","","",5,[[["string",3]]]],[11,"parse_any_pattern","","",5,[[["string",3]]]],[11,"parse_open_paren","","",5,[[]]],[11,"parse_open_bracket","","",5,[[]]],[11,"finish_expr","","",5,[[],["rc",3]]],[11,"match_rule","libslide::evaluator_rules::pattern_match","",7,[[["rc",3],["expr",4],["exprpat",4],["rc",3]],[["patternmatch",3],["option",4]]]],[11,"match_rule","","",7,[[["exprpat",4],["rc",3]],[["option",4],["patternmatch",3]]]],[11,"transform","","Transforms a pattern expression into an expression by…",7,[[["exprpat",4],["rc",3]],[["expr",4],["rc",3]]]],[11,"transform","","",7,[[["exprpat",4],["rc",3]],[["exprpat",4],["rc",3]]]],[11,"transform","libslide::evaluator_rules::rule","Attempts to apply a rule on a target expression by",14,[[["expr",4],["rc",3]],[["expr",4],["rc",3]]]],[11,"transform","","Bootstraps a rule with another (or possibly the same) rule.",14,[[["exprpat",4],["rc",3]],[["exprpat",4],["rc",3]]]],[11,"s_form","libslide::grammar::pattern","",23,[[],["string",3]]],[11,"s_form","libslide::grammar","",19,[[],["string",3]]],[11,"s_form","","",20,[[],["string",3]]],[11,"is_const","libslide::grammar::pattern","",23,[[]]],[11,"is_const","libslide::grammar","",20,[[]]],[11,"from","libslide::evaluator_rules::unbuilt_rule","",15,[[]]],[11,"from","libslide::grammar::pattern","",23,[[["binaryexpr",3]]]],[11,"from","","",23,[[["unaryexpr",3]]]],[11,"from","libslide::grammar","",19,[[["expr",4]]]],[11,"from","","",19,[[["assignment",3]]]],[11,"from","","",20,[[]]],[11,"from","","",20,[[["binaryexpr",3]]]],[11,"from","","",20,[[["unaryexpr",3]]]],[11,"next","libslide::utils::iter","",28,[[],["option",4]]],[11,"next","","",29,[[],["option",4]]],[11,"clone","libslide::scanner::types","",3,[[],["tokentype",4]]],[11,"clone","","",2,[[],["token",3]]],[11,"clone","libslide::evaluator_rules::registry","",11,[[],["rulename",4]]],[11,"clone","libslide::evaluator_rules::rule","",12,[[],["patternmap",3]]],[11,"clone","libslide::evaluator_rules::unbuilt_rule","",15,[[],["unbuiltrule",4]]],[11,"clone","libslide::grammar::pattern","",23,[[],["exprpat",4]]],[11,"clone","libslide::grammar","",19,[[],["stmt",4]]],[11,"clone","","",16,[[],["assignment",3]]],[11,"clone","","",20,[[],["expr",4]]],[11,"clone","","",21,[[],["binaryoperator",4]]],[11,"clone","","",17,[[],["binaryexpr",3]]],[11,"clone","","",22,[[],["unaryoperator",4]]],[11,"clone","","",18,[[],["unaryexpr",3]]],[11,"default","libslide","",0,[[]]],[11,"default","libslide::evaluator_rules::pattern_match","",7,[[]]],[11,"default","libslide::evaluator_rules::registry","Constructs the default rule set.",9,[[]]],[11,"cmp","","",11,[[],["ordering",4]]],[11,"cmp","libslide::grammar","",20,[[],["ordering",4]]],[11,"eq","libslide::scanner::types","",3,[[["tokentype",4]]]],[11,"ne","","",3,[[["tokentype",4]]]],[11,"eq","","",2,[[["token",3]]]],[11,"ne","","",2,[[["token",3]]]],[11,"eq","libslide::evaluator_rules::registry","",11,[[["rulename",4]]]],[11,"eq","libslide::grammar::pattern","",23,[[["exprpat",4]]]],[11,"eq","libslide::grammar","",20,[[["expr",4]]]],[11,"ne","","",20,[[["expr",4]]]],[11,"eq","","",21,[[["binaryoperator",4]]]],[11,"eq","","",17,[[["binaryexpr",3]]]],[11,"ne","","",17,[[["binaryexpr",3]]]],[11,"eq","","",22,[[["unaryoperator",4]]]],[11,"eq","","",18,[[["unaryexpr",3]]]],[11,"ne","","",18,[[["unaryexpr",3]]]],[11,"partial_cmp","libslide::evaluator_rules::registry","",11,[[],[["ordering",4],["option",4]]]],[11,"partial_cmp","libslide::grammar","",20,[[],[["ordering",4],["option",4]]]],[11,"partial_cmp","","",21,[[],[["ordering",4],["option",4]]]],[11,"fmt","libslide::scanner::types","",3,[[["formatter",3]],["result",6]]],[11,"fmt","","",2,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::evaluator_rules::registry","",11,[[["formatter",3]],["result",6]]],[11,"fmt","","",10,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::evaluator_rules::rule","",12,[[["formatter",3]],["result",6]]],[11,"fmt","","",13,[[["formatter",3]],["result",6]]],[11,"fmt","","",14,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::grammar::pattern","",23,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::grammar","",19,[[["formatter",3]],["result",6]]],[11,"fmt","","",16,[[["formatter",3]],["result",6]]],[11,"fmt","","",20,[[["formatter",3]],["result",6]]],[11,"fmt","","",21,[[["formatter",3]],["result",6]]],[11,"fmt","","",17,[[["formatter",3]],["result",6]]],[11,"fmt","","",22,[[["formatter",3]],["result",6]]],[11,"fmt","","",18,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::scanner::types","",2,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::evaluator_rules::registry","",10,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::evaluator_rules::rule","",12,[[["formatter",3]],["result",6]]],[11,"fmt","","",13,[[["formatter",3]],["result",6]]],[11,"fmt","","",14,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::grammar::pattern","",23,[[["formatter",3]],["result",6]]],[11,"fmt","libslide::grammar","",19,[[["formatter",3]],["result",6]]],[11,"fmt","","",16,[[["formatter",3]],["result",6]]],[11,"fmt","","",20,[[["formatter",3]],["result",6]]],[11,"fmt","","",21,[[["formatter",3]],["result",6]]],[11,"fmt","","",17,[[["formatter",3]],["result",6]]],[11,"fmt","","",17,[[["formatter",3]],["result",6]]],[11,"fmt","","",22,[[["formatter",3]],["result",6]]],[11,"fmt","","",18,[[["formatter",3]],["result",6]]],[11,"fmt","","",18,[[["formatter",3]],["result",6]]],[11,"hash","libslide::evaluator_rules::registry","",11,[[]]],[11,"hash","libslide::grammar::pattern","",23,[[]]],[11,"hash","libslide::grammar","",20,[[]]],[11,"hash","","",21,[[]]],[11,"hash","","",17,[[]]],[11,"hash","","",22,[[]]],[11,"hash","","",18,[[]]],[11,"try_from","","",21,[[["token",3]],["result",4]]],[11,"try_from","","",22,[[["token",3]],["result",4]]]],"p":[[3,"EvaluatorContext"],[3,"Scanner"],[3,"Token"],[4,"TokenType"],[3,"ExpressionParser"],[3,"ExpressionPatternParser"],[8,"Parser"],[3,"PatternMatch"],[8,"MatchRule"],[3,"RuleSet"],[3,"BuildRuleErrors"],[4,"RuleName"],[3,"PatternMap"],[3,"UnresolvedMapping"],[4,"Rule"],[4,"UnbuiltRule"],[3,"Assignment"],[3,"BinaryExpr"],[3,"UnaryExpr"],[4,"Stmt"],[4,"Expr"],[4,"BinaryOperator"],[4,"UnaryOperator"],[4,"ExprPat"],[8,"Transformer"],[8,"Grammar"],[8,"Expression"],[4,"UnflattenStrategy"],[3,"PeekingTakeWhile"],[3,"PeekIter"],[8,"StringUtils"]]},\
"slide":{"doc":"","i":[[3,"Opts","slide","",null,null],[12,"program","","",0,null],[12,"output_form","","",0,null],[12,"parse_only","","",0,null],[4,"OutputForm","","",null,null],[13,"Pretty","","",1,null],[13,"SExpression","","",1,null],[13,"Debug","","",1,null],[5,"get_opts","","",null,[[],["opts",3]]],[5,"main","","",null,[[],[["string",3],["result",4]]]],[5,"print","","",null,[[["outputform",4]],["string",3]]],[11,"from","","",0,[[]]],[11,"into","","",0,[[]]],[11,"borrow","","",0,[[]]],[11,"try_from","","",0,[[],["result",4]]],[11,"try_into","","",0,[[],["result",4]]],[11,"borrow_mut","","",0,[[]]],[11,"type_id","","",0,[[],["typeid",3]]],[11,"from","","",1,[[]]],[11,"into","","",1,[[]]],[11,"borrow","","",1,[[]]],[11,"try_from","","",1,[[],["result",4]]],[11,"try_into","","",1,[[],["result",4]]],[11,"borrow_mut","","",1,[[]]],[11,"type_id","","",1,[[],["typeid",3]]]],"p":[[3,"Opts"],[4,"OutputForm"]]}\
}');
addSearchOptions(searchIndex);initSearch(searchIndex);