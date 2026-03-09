module.exports = grammar({
  name: 'duso',

  extras: $ => [
    /\s/,
    $.comment,
  ],

  rules: {
    source_file: $ => seq(
      repeat(seq(
        $.statement,
        $._statement_line_ending,
      )),
      optional($.statement),
    ),

    statement: $ => choice(
      $.function_declaration,
      $.if_statement,
      $.while_statement,
      $.for_statement,
      $.try_statement,
      $.return_statement,
      $.break_statement,
      $.continue_statement,
      $.variable_declaration,
      $.assignment_statement,
      $.compound_assignment_statement,
      $.postfix_statement,
      $.expression,
    ),

    _statement_line_ending: $ => /[\n;]/,

    comment: $ => choice(
      seq('//', /[^\n]*/),
      seq('/*', /[^*]*(\*[^/][^*]*)*/, '*/'),
    ),

    // Function declaration
    function_declaration: $ => seq(
      'function',
      $.identifier,
      $.function_parameters,
      repeat($.statement),
      'end',
    ),

    function_parameters: $ => seq(
      '(',
      optional($.parameter_list),
      ')',
    ),

    parameter_list: $ => seq(
      $.parameter,
      repeat(seq(',', $.parameter)),
    ),

    parameter: $ => seq(
      $.identifier,
      optional(seq('=', $.expression)),
    ),

    // Control flow statements
    if_statement: $ => seq(
      'if',
      $.expression,
      'then',
      repeat($.statement),
      repeat($.elseif_clause),
      optional($.else_clause),
      'end',
    ),

    elseif_clause: $ => seq(
      'elseif',
      $.expression,
      'then',
      repeat($.statement),
    ),

    else_clause: $ => seq(
      'else',
      repeat($.statement),
    ),

    while_statement: $ => seq(
      'while',
      $.expression,
      'do',
      repeat($.statement),
      'end',
    ),

    for_statement: $ => choice(
      seq(
        'for',
        $.identifier,
        '=',
        $.expression,
        ',',
        $.expression,
        optional(seq(',', $.expression)),
        'do',
        repeat($.statement),
        'end',
      ),
      seq(
        'for',
        $.identifier,
        'in',
        $.expression,
        'do',
        repeat($.statement),
        'end',
      ),
    ),

    try_statement: $ => seq(
      'try',
      repeat($.statement),
      'catch',
      '(',
      $.identifier,
      ')',
      repeat($.statement),
      'end',
    ),

    return_statement: $ => choice(
      prec(2, seq('return', $.expression)),
      prec(1, 'return'),
    ),

    break_statement: $ => 'break',
    continue_statement: $ => 'continue',

    // Variable and assignment statements
    variable_declaration: $ => seq(
      'var',
      $.identifier,
      '=',
      $.expression,
    ),

    assignment_statement: $ => seq(
      $.assignment_target,
      '=',
      $.expression,
    ),

    assignment_target: $ => choice(
      $.identifier,
      $.index_access,
      $.property_access,
    ),

    compound_assignment_statement: $ => seq(
      $.assignment_target,
      choice('+=', '-=', '*=', '/=', '%='),
      $.expression,
    ),

    postfix_statement: $ => seq(
      $.assignment_target,
      choice('++', '--'),
    ),

    expression_statement: $ => $.expression,

    // Expressions - using proper precedence
    expression: $ => $.ternary_expression,

    ternary_expression: $ => prec.right(0,
      seq(
        $.logical_or_expression,
        optional(seq('?', $.expression, ':', $.expression)),
      ),
    ),

    logical_or_expression: $ => prec.left(1,
      seq(
        $.logical_and_expression,
        repeat(seq('or', $.logical_and_expression)),
      ),
    ),

    logical_and_expression: $ => prec.left(2,
      seq(
        $.comparison_expression,
        repeat(seq('and', $.comparison_expression)),
      ),
    ),

    comparison_expression: $ => prec.left(3,
      seq(
        $.additive_expression,
        repeat(seq(
          choice('==', '!=', '<', '>', '<=', '>='),
          $.additive_expression,
        )),
      ),
    ),

    additive_expression: $ => prec.left(4,
      seq(
        $.multiplicative_expression,
        repeat(seq(
          choice('+', '-'),
          $.multiplicative_expression,
        )),
      ),
    ),

    multiplicative_expression: $ => prec.left(5,
      seq(
        $.unary_expression,
        repeat(seq(
          choice('*', '/', '%'),
          $.unary_expression,
        )),
      ),
    ),

    unary_expression: $ => prec.right(6,
      choice(
        seq(choice('not', '-'), $.unary_expression),
        $.power_expression,
      ),
    ),

    power_expression: $ => prec.right(7,
      seq(
        $.postfix_expression,
        optional(seq('^', $.power_expression)),
      ),
    ),

    postfix_expression: $ => prec.left(8,
      seq(
        $.primary_expression,
        repeat(prec.left(choice(
          $.index_access,
          $.property_access,
          $.function_call,
        ))),
      ),
    ),

    primary_expression: $ => choice(
      $.number,
      $.string,
      $.multiline_string,
      $.raw_string,
      $.regex,
      $.boolean,
      $.nil,
      $.identifier,
      $.function_literal,
      $.array_literal,
      $.object_literal,
      seq('(', $.expression, ')'),
    ),

    // Literals
    number: $ => /\d+(\.\d+)?([eE][+-]?\d+)?/,

    string: $ => choice(
      seq('"', repeat(choice(
        /[^"\\{]/,
        $.escape_sequence,
        $.template_expression,
      )), '"'),
      seq("'", repeat(choice(
        /[^'\\{]/,
        $.escape_sequence,
        $.template_expression,
      )), "'"),
    ),

    multiline_string: $ => choice(
      seq('"""', repeat(choice(
        /[^{]/,
        $.template_expression,
      )), '"""'),
      seq("'''", repeat(choice(
        /[^{]/,
        $.template_expression,
      )), "'''"),
    ),

    raw_string: $ => seq(
      'raw',
      choice($.string, $.multiline_string),
    ),

    template_expression: $ => seq(
      '{{',
      $.expression,
      '}}',
    ),

    escape_sequence: $ => seq(
      '\\',
      choice('n', 't', 'r', '\\', '"', "'", '{', '}'),
    ),

    regex: $ => seq(
      '~',
      repeat(choice(
        /[^~\\]/,
        seq('\\', /./),
      )),
      '~',
    ),

    boolean: $ => choice('true', 'false'),
    nil: $ => 'nil',

    // Collections
    array_literal: $ => seq(
      '[',
      optional(seq(
        $.expression,
        repeat(seq(',', $.expression)),
        optional(','),
      )),
      ']',
    ),

    object_literal: $ => seq(
      '{',
      optional(seq(
        $.object_pair,
        repeat(seq(',', $.object_pair)),
        optional(','),
      )),
      '}',
    ),

    object_pair: $ => seq(
      choice($.identifier, $.string),
      '=',
      $.expression,
    ),

    // Function literal
    function_literal: $ => seq(
      'function',
      $.function_parameters,
      repeat($.statement),
      'end',
    ),

    // Property and index access
    property_access: $ => seq(
      '.',
      $.identifier,
    ),

    index_access: $ => seq(
      '[',
      $.expression,
      ']',
    ),

    // Function call
    function_call: $ => seq(
      '(',
      optional(seq(
        $.argument,
        repeat(seq(',', $.argument)),
      )),
      ')',
    ),

    argument: $ => choice(
      seq($.identifier, '=', $.expression),
      $.expression,
    ),

    // Keywords that are built-in functions
    builtin: $ => choice(
      'abs', 'acos', 'asin', 'atan', 'atan2',
      'append_file', 'breakpoint', 'busy',
      'ceil', 'clamp', 'contains', 'context', 'copy_file', 'cos', 'current_dir',
      'datastore', 'decode_base64', 'deep_copy', 'doc',
      'encode_base64', 'ends_with', 'env', 'exit', 'exp',
      'fetch', 'file_exists', 'file_type', 'filter', 'find', 'floor', 'format_json', 'format_time',
      'hash', 'hash_password', 'http_server',
      'include', 'input',
      'join', 'keys', 'kill',
      'len', 'list_dir', 'list_files', 'load', 'log', 'ln', 'lower',
      'make_dir', 'map', 'markdown_ansi', 'markdown_html', 'markdown_text', 'max', 'min', 'move_file',
      'now',
      'parallel', 'parse', 'parse_json', 'parse_time', 'pi', 'pop', 'pow', 'print', 'push',
      'random', 'range', 'reduce', 'remove_dir', 'remove_file', 'rename_file', 'replace', 'repeat', 'require', 'round', 'run',
      'save', 'shift', 'sin', 'sleep', 'sort', 'spawn', 'split', 'sqrt', 'starts_with', 'substr', 'sys',
      'tan', 'template', 'throw', 'tobool', 'tonumber', 'tostring', 'trim', 'type',
      'unshift', 'upper', 'uuid',
      'values', 'verify_password',
      'watch', 'write',
    ),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    // Keywords - must be after identifier for proper precedence
    keyword: $ => choice(
      'if', 'then', 'elseif', 'else', 'end',
      'while', 'do', 'for', 'in',
      'function', 'return',
      'break', 'continue',
      'try', 'catch',
      'var', 'raw',
      'and', 'or', 'not',
    ),
  },
});
