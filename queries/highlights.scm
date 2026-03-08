; Keywords
(break_statement) @keyword
(continue_statement) @keyword
(if_statement) @keyword
(while_statement) @keyword
(for_statement) @keyword
(try_statement) @keyword
(function_declaration) @keyword
(variable_declaration) @keyword
(return_statement) @keyword

; Function names
(function_declaration (identifier) @function)

; Literals
(string) @string
(multiline_string) @string
(regex) @string.regex
(number) @number
(boolean) @constant.builtin
(nil) @constant.builtin

; Variables and parameters
(identifier) @variable
(parameter (identifier) @variable.parameter)

; Operators - comparison
(comparison_expression) @operator

; Operators - arithmetic
(additive_expression) @operator
(multiplicative_expression) @operator

; Operators - logical
(logical_or_expression) @operator
(logical_and_expression) @operator
(unary_expression) @operator

; Assignment
(assignment_statement) @operator
(compound_assignment_statement) @operator
(postfix_statement) @operator

; Punctuation - brackets
(array_literal) @punctuation.bracket
(object_literal) @punctuation.bracket
(function_parameters) @punctuation.bracket
(function_call) @punctuation.bracket
(index_access) @punctuation.bracket

; Punctuation - delimiters
(property_access) @punctuation.delimiter
(object_pair) @punctuation.delimiter

; Comments
(comment) @comment

; Template expressions
(template_expression) @string
