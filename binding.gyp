{
  "targets": [
    {
      "target_name": "tree_sitter_duso_binding",
      "include_dirs": [
        "<!(node -e \"const path = require('path'), mod = require('module'); console.log(path.join(path.dirname(mod.resolveFilename('tree-sitter')), '..', 'include'))\")"
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
