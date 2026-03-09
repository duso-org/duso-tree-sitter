#include "tree_sitter/parser.h"
#include <ctype.h>
#include <stdbool.h>

enum TokenType {
  COMMENT,
};

void *tree_sitter_duso_external_scanner_create() {
  return NULL;
}

void tree_sitter_duso_external_scanner_destroy(void *p) {}

unsigned tree_sitter_duso_external_scanner_serialize(void *p, char *buffer) {
  return 0;
}

void tree_sitter_duso_external_scanner_deserialize(void *p, const char *b, unsigned n) {}

static void skip_string(TSLexer *lexer, char quote) {
  while (lexer->lookahead != '\0' && lexer->lookahead != quote) {
    if (lexer->lookahead == '\\') {
      lexer->advance(lexer, false);
      if (lexer->lookahead != '\0') {
        lexer->advance(lexer, false);
      }
    } else if (lexer->lookahead == '{') {
      lexer->advance(lexer, false);
      if (lexer->lookahead == '{') {
        // Skip template expression
        lexer->advance(lexer, false);
        int depth = 1;
        while (lexer->lookahead != '\0' && depth > 0) {
          if (lexer->lookahead == '{') depth++;
          else if (lexer->lookahead == '}') depth--;
          lexer->advance(lexer, false);
        }
      }
    } else {
      lexer->advance(lexer, false);
    }
  }
  if (lexer->lookahead == quote) {
    lexer->advance(lexer, false);
  }
}

static void skip_multiline_string(TSLexer *lexer, const char *delim) {
  int len = 0;
  while (delim[len]) len++;

  while (lexer->lookahead != '\0') {
    bool match = true;
    for (int i = 0; i < len && lexer->lookahead != '\0'; i++) {
      if (lexer->lookahead != delim[i]) {
        match = false;
        if (i == 0) break;
        lexer->advance(lexer, false);
      }
      if (i < len - 1) lexer->advance(lexer, false);
    }
    if (match && lexer->lookahead == delim[len-1]) {
      lexer->advance(lexer, false);
      return;
    }
    if (!match) lexer->advance(lexer, false);
  }
}

bool tree_sitter_duso_external_scanner_scan(
    void *payload,
    TSLexer *lexer,
    const bool *valid_symbols) {

  if (!valid_symbols[COMMENT]) return false;

  while (isspace(lexer->lookahead)) {
    lexer->advance(lexer, true);
  }

  // Skip strings and other non-comment tokens
  if (lexer->lookahead == '"') {
    lexer->advance(lexer, false);
    if (lexer->lookahead == '"' && lexer->lookahead != '\0') {
      lexer->advance(lexer, false);
      if (lexer->lookahead == '"') {
        lexer->advance(lexer, false);
        skip_multiline_string(lexer, "\"\"\"");
      } else {
        skip_string(lexer, '"');
      }
    } else {
      skip_string(lexer, '"');
    }
    return false;
  }

  if (lexer->lookahead == '\'') {
    lexer->advance(lexer, false);
    if (lexer->lookahead == '\'' && lexer->lookahead != '\0') {
      lexer->advance(lexer, false);
      if (lexer->lookahead == '\'') {
        lexer->advance(lexer, false);
        skip_multiline_string(lexer, "'''");
      } else {
        skip_string(lexer, '\'');
      }
    } else {
      skip_string(lexer, '\'');
    }
    return false;
  }

  if (lexer->lookahead == '~') {
    lexer->advance(lexer, false);
    while (lexer->lookahead != '\0' && lexer->lookahead != '~') {
      lexer->advance(lexer, false);
    }
    if (lexer->lookahead == '~') {
      lexer->advance(lexer, false);
    }
    return false;
  }

  // Handle comments
  if (lexer->lookahead == '/') {
    lexer->advance(lexer, false);

    if (lexer->lookahead == '/') {
      lexer->advance(lexer, false);
      while (lexer->lookahead != '\n' && lexer->lookahead != '\0') {
        lexer->advance(lexer, false);
      }
      lexer->result_symbol = COMMENT;
      return true;
    }

    if (lexer->lookahead == '*') {
      lexer->advance(lexer, false);
      while (lexer->lookahead != '\0') {
        if (lexer->lookahead == '*') {
          lexer->advance(lexer, false);
          if (lexer->lookahead == '/') {
            lexer->advance(lexer, false);
            break;
          }
        } else {
          lexer->advance(lexer, false);
        }
      }
      lexer->result_symbol = COMMENT;
      return true;
    }
  }

  return false;
}
