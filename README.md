# tree-sitter-duso

A complete Tree-sitter grammar for the [Duso](https://github.com/duso-org/duso) scripting language.

## Features

This grammar provides full parsing support for Duso syntax, including:

- **Variables and assignments**: Variable declarations, assignments, compound assignments
- **Data types**: Numbers, strings (with template expressions), multiline strings, booleans, nil, arrays, objects
- **Control flow**: if/elseif/else, while loops, numeric and iterator for loops, try/catch
- **Functions**: Function declarations, anonymous functions, closures
- **Operators**: Arithmetic, comparison, logical, assignment
- **Built-in functions**: All Duso built-ins (print, len, map, filter, etc.)
- **Comments**: Line comments (//) and block comments (/* */)
- **Template expressions**: Inline {{}} expressions in strings

## Installation

### Requirements

- Node.js 12.0 or higher
- tree-sitter-cli (for development)

### Quick Setup

```bash
npm install --ignore-scripts
npm run generate
```

### Full Build (with Node bindings)

```bash
npm install
npm run build
```

## Usage

### With tree-sitter CLI

Parse a Duso file:

```bash
tree-sitter parse example.du
```

Run tests:

```bash
npm test
```

### With Neovim

Add to your Neovim configuration:

```lua
local parser_config = require "nvim-treesitter.parsers".get_parser_configs()

parser_config.duso = {
  install_info = {
    url = "https://github.com/duso-org/tree-sitter-duso",
    files = {"src/parser.c"},
    branch = "main",
  },
  filetype = "du",
}
```

Then install with `:TSInstall duso` and enable highlighting/indentation/etc.

### With Helix

Add to `languages.toml`:

```toml
[[language]]
name = "duso"
scope = "source.duso"
file-extensions = ["du"]
roots = []

[language.indent]
tab-width = 2
unit = "  "
```

### With Other Editors

Most editors with tree-sitter support (VS Code with tree-sitter extension, Emacs, etc.) can use this grammar. Refer to your editor's tree-sitter documentation.

## Grammar Structure

The grammar is organized into the following main categories:

### Statements
- Function declarations
- Control flow (if, while, for, try)
- Variable and assignment statements
- Return, break, continue

### Expressions
- Binary operations (arithmetic, comparison, logical)
- Unary operations
- Function calls
- Array and object indexing/access
- Literals (strings, numbers, booleans, collections)

### Built-in Functions

All Duso built-in functions are recognized:

abs, acos, asin, atan, atan2, append_file, breakpoint, busy, ceil, clamp, contains, context, copy_file, cos, current_dir, datastore, decode_base64, deep_copy, doc, encode_base64, ends_with, env, exit, exp, fetch, file_exists, file_type, filter, find, floor, format_json, format_time, hash, hash_password, http_server, include, input, join, keys, kill, len, list_dir, list_files, load, log, ln, lower, make_dir, map, markdown_ansi, markdown_html, markdown_text, max, min, move_file, now, parallel, parse, parse_json, parse_time, pi, pop, pow, print, push, random, range, reduce, remove_dir, remove_file, rename_file, replace, repeat, require, round, run, save, shift, sin, sleep, sort, spawn, split, sqrt, starts_with, substr, sys, tan, template, throw, tobool, tonumber, tostring, trim, type, unshift, upper, uuid, values, verify_password, watch, write

## Testing

Test cases are located in `test/corpus/basics.txt` and use tree-sitter's test format.

Run tests with:
```bash
npm test
```

## Queries

The following query files are included:

- `highlights.scm` - Syntax highlighting for supported editors
- `locals.scm` - Variable scope and binding information
- `tags.scm` - Tags for code navigation

## Development

### Regenerating Parser

After modifying `grammar.js`:

```bash
tree-sitter generate
npm run build
```

### Testing Changes

```bash
tree-sitter test
# or
npm test
```

### Debugging the Grammar

```bash
tree-sitter parse --debug example.du
```

## License

MIT
