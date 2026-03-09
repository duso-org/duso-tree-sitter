; Opening keywords that increase indentation
(function_declaration "function" @indent)
(function_literal "function" @indent)
(if_statement "then" @indent)
(elseif_clause "then" @indent)
(else_clause "else" @indent)
(while_statement "do" @indent)
(for_statement "do" @indent)
(try_statement "try" @indent)

; Closing "end" keywords that decrease indentation
(function_declaration "end" @dedent)
(function_literal "end" @dedent)
(if_statement "end" @dedent)
(while_statement "end" @dedent)
(for_statement "end" @dedent)
(try_statement "end" @dedent)
