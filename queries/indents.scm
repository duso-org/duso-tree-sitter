;; Increase indentation after opening blocks
(if_statement "then" @indent)
(elseif_clause "then" @indent)
(else_clause "else" @indent)
(while_statement "do" @indent)
(for_statement "do" @indent)
(function_declaration "function" @indent)
(function_literal "function" @indent)
(try_statement "try" @indent)
(try_statement "catch" @indent)

