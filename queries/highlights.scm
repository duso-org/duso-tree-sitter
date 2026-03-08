; Keywords
(keyword) @keyword
(break_statement) @keyword
(continue_statement) @keyword
(return_statement "return") @keyword

; Control flow
(if_statement "if") @keyword
(if_statement "then") @keyword
(if_statement "else") @keyword
(if_statement "elseif") @keyword
(if_statement "end") @keyword
(while_statement "while") @keyword
(while_statement "do") @keyword
(while_statement "end") @keyword
(for_statement "for") @keyword
(for_statement "in") @keyword
(for_statement "do") @keyword
(for_statement "end") @keyword
(try_statement "try") @keyword
(try_statement "catch") @keyword
(try_statement "end") @keyword

; Function declaration
(function_declaration "function") @keyword
(function_declaration "end") @keyword
(function_declaration name: (identifier) @function)

; Variable declaration
(variable_declaration "var") @keyword

; Literals
(string) @string
(multiline_string) @string
(number) @number
(boolean) @constant.builtin
(nil) @constant.builtin

; Identifiers
(identifier) @variable
(function_declaration name: (identifier) @function)
(parameter_list (identifier) @variable.parameter)

; Built-in functions
(builtin) @function.builtin

; Operators
(logical_or_expression "or") @operator
(logical_and_expression "and") @operator
(unary_expression "not") @operator
(comparison_expression
  [
    "=="
    "!="
    "<"
    ">"
    "<="
    ">="
  ] @operator)
(additive_expression [
  "+"
  "-"
] @operator)
(multiplicative_expression [
  "*"
  "/"
  "%"
] @operator)

; Assignment operators
(assignment_statement "=" @operator)
(compound_assignment_statement [
  "+="
  "-="
  "*="
  "/="
  "%="
] @operator)
(postfix_statement [
  "++"
  "--"
] @operator)

; Punctuation
(array_literal "[" @punctuation.bracket)
(array_literal "]" @punctuation.bracket)
(object_literal "{" @punctuation.bracket)
(object_literal "}" @punctuation.bracket)
(function_parameters "(" @punctuation.bracket)
(function_parameters ")" @punctuation.bracket)
(function_call "(" @punctuation.bracket)
(function_call ")" @punctuation.bracket)
(index_access "[" @punctuation.bracket)
(index_access "]" @punctuation.bracket)

(property_access "." @punctuation.delimiter)
(object_pair ":" @punctuation.delimiter)
(parameter_list "," @punctuation.delimiter)
(array_literal "," @punctuation.delimiter)
(object_literal "," @punctuation.delimiter)

; Comments
((comment) @comment.line)

; Template expressions
(template_expression "{{" @punctuation.special)
(template_expression "}}" @punctuation.special)
