export class SchemaError extends Error {
  code: string;
  fieldId?: string | undefined;

  constructor(message: string, code: string, fieldId?: string) {
    super(`[${code}] ${message}`);
    this.name = 'SchemaError';
    this.code = code;
    this.fieldId = fieldId;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class LexerError extends SchemaError {
  constructor(message: string) {
    super(message, 'ERR_LEXICAL');
    this.name = 'LexerError';
  }
}

export class ParserError extends SchemaError {
  constructor(message: string) {
    super(message, 'ERR_SYNTAX');
    this.name = 'ParserError';
  }
}

export class SemanticError extends SchemaError {
  constructor(message: string, fieldId?: string) {
    super(message, 'ERR_SEMANTIC', fieldId);
    this.name = 'SemanticError';
  }
}

export class ValidationError extends SchemaError {
  constructor(message: string, fieldId?: string) {
    super(message, 'ERR_VALIDATION', fieldId);
    this.name = 'ValidationError';
  }
}