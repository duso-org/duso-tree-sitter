;; Comments
(comment) @comment

;; Keywords and control structures
(if_statement "if" @keyword)
(if_statement "then" @keyword)
(if_statement "end" @keyword)
(elseif_clause "elseif" @keyword)
(elseif_clause "then" @keyword)
(else_clause "else" @keyword)

(while_statement "while" @keyword)
(while_statement "do" @keyword)
(while_statement "end" @keyword)

(for_statement "for" @keyword)
(for_statement "in" @keyword)
(for_statement "do" @keyword)
(for_statement "end" @keyword)

(function_declaration "function" @keyword)
(function_declaration "end" @keyword)

(function_literal "function" @keyword)
(function_literal "end" @keyword)

(try_statement "try" @keyword)
(try_statement "catch" @keyword)
(try_statement "end" @keyword)

(return_statement "return" @keyword)
(break_statement "break" @keyword)
(continue_statement "continue" @keyword)

(variable_declaration "var" @keyword)

;; Raw strings
(raw_string "raw" @keyword)

;; Operators - logical
(logical_or_expression "or" @operator)
(logical_and_expression "and" @operator)
(unary_expression "not" @operator)

;; Ternary operator
(ternary_expression "?" @operator)
(ternary_expression ":" @operator)

;; Function definitions - highlight the name
(function_declaration
  (identifier) @function.definition)

;; String and template literals
(string) @string
(multiline_string) @string
(template_expression "{{" @punctuation.special)
(template_expression "}}" @punctuation.special)
(template_expression (expression) @none)

;; Numbers
(number) @number

;; Boolean and nil
(boolean) @constant.builtin
(nil) @constant.builtin

;; Property access
(property_access "." @punctuation.delimiter)
(property_access (identifier) @property)

;; Built-in functions
(builtin) @function.builtin

;; All other identifiers default to variable
(identifier) @variable

;; Parameters in function declarations
(parameter (identifier) @variable.parameter)

;; Brackets and parens
(function_call "(" @punctuation.bracket)
(function_call ")" @punctuation.bracket)
