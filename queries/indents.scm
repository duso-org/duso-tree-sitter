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
(function_declaration "end" @outdent)
(function_literal "end" @outdent)
(if_statement "end" @outdent)
(while_statement "end" @outdent)
(for_statement "end" @outdent)
(try_statement "end" @outdent)
