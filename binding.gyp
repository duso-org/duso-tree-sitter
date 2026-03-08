{
  "targets": [
    {
      "target_name": "tree_sitter_duso_binding",
      "include_dirs": [
        "<!(node -e \"const path = require('path'); console.log(path.join(path.dirname(require.resolve('nan')), 'include'))\")",
        "src"
      ],
      "sources": [
        "src/parser.c",
        "src/scanner.c"
      ],
      "cflags_c": [
        "-std=c99"
      ]
    }
  ]
}
