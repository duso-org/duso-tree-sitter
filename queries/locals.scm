; Define scopes
(function_declaration) @scope
(if_statement) @scope
(while_statement) @scope
(for_statement) @scope
(try_statement) @scope
(block) @scope

; Define variables
(function_declaration name: (identifier) @definition.function)
(variable_declaration (identifier) @definition.var)
(assignment_statement target: (identifier) @definition.var)
(parameter_list (identifier) @definition.parameter)

; References
(identifier) @reference
