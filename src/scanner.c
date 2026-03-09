#include "tree_sitter/parser.h"
#include <ctype.h>

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

bool tree_sitter_duso_external_scanner_scan(
    void *payload,
    TSLexer *lexer,
    const bool *valid_symbols) {

  if (!valid_symbols[COMMENT]) {
    return false;
  }

  while (isspace(lexer->lookahead)) {
    lexer->advance(lexer, true);
  }

  if (lexer->lookahead == '/' ) {
    int start_pos = lexer->get_column(lexer);
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
