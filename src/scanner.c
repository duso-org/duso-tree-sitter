#include "tree_sitter/parser.h"
#include <ctype.h>
#include <string.h>

enum TokenType {
  COMMENT,
};

typedef struct {
  int depth;
} Scanner;

void *tree_sitter_duso_external_scanner_create() {
  Scanner *scanner = malloc(sizeof(Scanner));
  scanner->depth = 0;
  return scanner;
}

void tree_sitter_duso_external_scanner_destroy(void *payload) {
  free(payload);
}

unsigned tree_sitter_duso_external_scanner_serialize(
    void *payload,
    char *buffer) {
  Scanner *scanner = (Scanner *)payload;
  buffer[0] = scanner->depth;
  return 1;
}

void tree_sitter_duso_external_scanner_deserialize(
    void *payload,
    const char *buffer,
    unsigned length) {
  Scanner *scanner = (Scanner *)payload;
  scanner->depth = length > 0 ? buffer[0] : 0;
}

static bool scan_line_comment(TSLexer *lexer) {
  if (lexer->lookahead != '/') return false;

  lexer->advance(lexer, false);
  if (lexer->lookahead != '/') {
    lexer->mark_end(lexer);
    return false;
  }

  lexer->advance(lexer, false);
  while (lexer->lookahead != '\n' && lexer->lookahead != '\0') {
    lexer->advance(lexer, false);
  }

  return true;
}

static bool scan_block_comment(TSLexer *lexer) {
  if (lexer->lookahead != '/') return false;

  lexer->advance(lexer, false);
  if (lexer->lookahead != '*') {
    lexer->mark_end(lexer);
    return false;
  }

  lexer->advance(lexer, false);

  while (lexer->lookahead != '\0') {
    if (lexer->lookahead == '*') {
      lexer->advance(lexer, false);
      if (lexer->lookahead == '/') {
        lexer->advance(lexer, false);
        return true;
      }
    } else {
      lexer->advance(lexer, false);
    }
  }

  return true;
}

bool tree_sitter_duso_external_scanner_scan(
    void *payload,
    TSLexer *lexer,
    const bool *valid_symbols) {

  if (!valid_symbols[COMMENT]) {
    return false;
  }

  // Skip whitespace
  while (isspace(lexer->lookahead)) {
    lexer->advance(lexer, true);
  }

  if (scan_line_comment(lexer)) {
    lexer->result_symbol = COMMENT;
    return true;
  }

  lexer->mark_end(lexer);

  if (scan_block_comment(lexer)) {
    lexer->result_symbol = COMMENT;
    return true;
  }

  return false;
}
