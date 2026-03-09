; Function declarations
(function_declaration
  body: (statement) @indent)
(function_declaration "end" @dedent)

; Function literals
(function_literal
  body: (statement) @indent)
(function_literal "end" @dedent)

; If statements
(if_statement
  consequence: (statement) @indent)
(if_statement "end" @dedent)

; Elseif clauses
(elseif_clause
  consequence: (statement) @indent)

; Else clauses
(else_clause
  consequence: (statement) @indent)

; While statements
(while_statement
  body: (statement) @indent)
(while_statement "end" @dedent)

; For statements
(for_statement
  body: (statement) @indent)
(for_statement "end" @dedent)

; Try statements
(try_statement
  try_body: (statement) @indent)
(try_statement
  catch_body: (statement) @indent)
(try_statement "end" @dedent)
