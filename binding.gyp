{
  "targets": [
    {
      "target_name": "tree_sitter_duso_binding",
      "include_dirs": [
        "<!(node -e \"console.log(require('tree-sitter').includeDirForVersion())\")"
      ],
      "sources": [
        "src/parser.c"
      ],
      "cflags_c": [
        "-std=c99"
      ]
    }
  ]
}
