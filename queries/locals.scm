; Define scopes
(function_declaration) @scope
(if_statement) @scope
(while_statement) @scope
(for_statement) @scope
(try_statement) @scope

; Define function names
(function_declaration (identifier) @definition.function)

; Define variables
(variable_declaration (identifier) @definition.var)
(assignment_statement (assignment_target (identifier) @definition.var))
(parameter (identifier) @definition.parameter)

; References
(identifier) @reference
