# Tree-Sitter Duso Setup Guide

## For Zed Editor

### Option 1: Using Git URL (Recommended)

In Zed settings (`Cmd+,`), add to `languages`:

```json
{
  "languages": {
    "duso": {
      "language_servers": [],
      "path_suffixes": ["du"],
      "grammar": "duso"
    }
  }
}
```

Then in your `extensions.json` (or via Settings UI):

```json
{
  "extensions": [
    "duso-org/tree-sitter-duso"
  ]
}
```

Zed will automatically download and compile the grammar from GitHub.

### Option 2: Local Development

1. Clone this repository
2. Run setup:
```bash
npm install --ignore-scripts
npx tree-sitter generate
```

3. Point Zed to the local directory in your `init.vim` or configuration:
```bash
export EXTENSIONS_DIR="$HOME/path/to/tree-sitter-duso"
```

## For Neovim

Add to your `init.lua`:

```lua
local parser_config = require "nvim-treesitter.parsers".get_parser_configs()
parser_config.duso = {
  install_info = {
    url = "https://github.com/duso-org/tree-sitter-duso",
    files = { "src/parser.c" },
    branch = "main",
  },
  filetype = "du",
}
```

Then run:
```vim
:TSInstall duso
```

## For Helix

1. Add to `.config/helix/languages.toml`:

```toml
[[language]]
name = "duso"
scope = "source.duso"
file-extensions = ["du"]
comment-token = "//"
indent = { tab-width = 2, unit = "  " }

[language.textobject]
function = { start = "^\\s*function\\b", end = "\\bend\\b" }
comment = "^\\s*//.*"
```

2. Build the grammar:
```bash
git clone https://github.com/duso-org/tree-sitter-duso ~/.config/helix/runtime/grammars/duso
cd ~/.config/helix/runtime/grammars/duso
hx -g fetch duso
hx -g build duso
```

## For VS Code

Use the existing Duso VS Code extension, or create a new extension wrapper:

```bash
npm install
npm run build-wasm
```

Then point the extension to use this grammar.

## Troubleshooting

### "Failed to compile grammar 'duso'"

1. Make sure you have Node.js 12+ installed:
   ```bash
   node --version
   ```

2. Try regenerating the parser:
   ```bash
   npm install --ignore-scripts
   npx tree-sitter generate
   ```

3. Check for C compiler availability (macOS needs Xcode command line tools):
   ```bash
   xcode-select --install
   ```

### "Cannot find module 'tree-sitter'"

Install dependencies:
```bash
npm install --ignore-scripts
```

### Parsing errors on valid Duso code

1. File the issue at https://github.com/duso-org/tree-sitter-duso/issues
2. Include the Duso code that failed to parse
3. Run and share output of: `npx tree-sitter parse yourfile.du`

## Development

### Testing

```bash
npm install --ignore-scripts
npx tree-sitter generate
npx tree-sitter test
```

### Debugging

```bash
npx tree-sitter parse --debug example.du
```

### Updating the Grammar

1. Edit `grammar.js`
2. Regenerate: `npx tree-sitter generate`
3. Test: `npx tree-sitter test`
4. Commit and push

## Resources

- [Tree-sitter Documentation](https://tree-sitter.github.io)
- [Duso Documentation](https://duso.dev)
- [Tree-sitter Playground](https://tree-sitter.github.io/tree-sitter/playground)
