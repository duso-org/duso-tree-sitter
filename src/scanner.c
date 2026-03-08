#include <tree_sitter/parser.h>

enum TokenType {
  // Add token types here if needed
};

void *tree_sitter_duso_external_scanner_create() {
  return NULL;
}

void tree_sitter_duso_external_scanner_destroy(void *p) {}

unsigned tree_sitter_duso_external_scanner_scan(
    void *payload,
    TSLexer *lexer,
    const bool *valid_symbols) {
  return 0;
}

bool tree_sitter_duso_external_scanner_serialize(
    void *p,
    char *buffer) {
  return true;
}

void tree_sitter_duso_external_scanner_deserialize(
    void *p,
    const char *b,
    unsigned n) {}
