import { ParserError } from '../errors.js';
import type { FormSchema, FieldSchema } from '../types/schema.js';
import type { FormIR, FieldIR } from '../types/ir.js';

export function parseSchema(input: string | unknown): FormIR {
  let schema: FormSchema;

  // 1. Lexing / Parsing JSON String jika input berupa string
  if (typeof input === 'string') {
    try {
      schema = JSON.parse(input) as FormSchema;
    } catch {
      throw new ParserError('Format JSON tidak valid / Syntax Error pada JSON input');
    }
  } else if (typeof input === 'object' && input !== null) {
    schema = input as FormSchema;
  } else {
    throw new ParserError('Input skema harus berupa string JSON atau Object');
  }

  // 2. Syntax Check: Validasi root object
  if (!schema.title || typeof schema.title !== 'string') {
    throw new ParserError('Properti "title" wajib ada dan harus berupa string');
  }

  if (!Array.isArray(schema.fields)) {
    throw new ParserError('Properti "fields" wajib ada dan harus berupa Array');
  }

  // 3. Lowering / Mapping dari Raw Schema ke FieldIR
  const fieldsIR: FieldIR[] = schema.fields.map((field: FieldSchema, index: number) => {
    if (!field.id || typeof field.id !== 'string') {
      throw new ParserError(`Field pada indeks ${index} tidak memiliki "id" yang valid`);
    }

    if (!field.label || typeof field.label !== 'string') {
      throw new ParserError(`Field "${field.id}" tidak memiliki "label" yang valid`);
    }

    if (!field.type || typeof field.type !== 'string') {
      throw new ParserError(`Field "${field.id}" tidak memiliki "type" yang valid`);
    }

    return {
      id: field.id,
      label: field.label,
      componentType: field.type,
      placeholder: field.placeholder ?? '',
      defaultValue: field.defaultValue ?? '',
      options: field.options ?? [],
      rules: field.validation ?? {},
    };
  });

  return {
    title: schema.title,
    description: schema.description ?? '',
    fields: fieldsIR,
  };
}