import { describe, it, expect } from 'vitest';
import { parseSchema } from '../src/parser/parser.js';
import { analyzeSemantics } from '../src/semantic/analyzer.js';
import { buildZodSchema } from '../src/lowering/zodCompiler.js';
import { ParserError, SemanticError } from '../src/errors.js';

describe('Dynamic Form Schema Compiler Engine', () => {
  it('harus berhasil memproses JSON Schema yang valid', () => {
    const validSchema = {
      title: 'Form Registrasi Valid',
      fields: [
        {
          id: 'email',
          label: 'Alamat Email',
          type: 'email',
          validation: { required: true },
        },
        {
          id: 'role',
          label: 'Peran Utama',
          type: 'select',
          options: [{ label: 'Developer', value: 'dev' }],
        },
      ],
    };

    // 1. Test Parser
    const ir = parseSchema(validSchema);
    expect(ir.title).toBe('Form Registrasi Valid');
    expect(ir.fields.length).toBe(2);

    // 2. Test Semantic Analyzer (tidak boleh throw error)
    expect(() => analyzeSemantics(ir)).not.toThrow();

    // 3. Test Zod Compiler Lowering
    const zodSchema = buildZodSchema(ir);
    expect(zodSchema).toBeDefined();
  });

  it('harus menangkap error syntax saat JSON tidak sesuai struktur dasar', () => {
    const invalidSyntax = {
      title: 'Form Tanpa Fields',
    };

    expect(() => parseSchema(invalidSyntax)).toThrow(ParserError);
  });

  it('harus menangkap semantic error saat terdapat duplikasi ID field', () => {
    const duplicateIdSchema = {
      title: 'Form Duplikat ID',
      fields: [
        { id: 'username', label: 'User 1', type: 'text' },
        { id: 'username', label: 'User 2', type: 'text' },
      ],
    };

    const ir = parseSchema(duplicateIdSchema);
    expect(() => analyzeSemantics(ir)).toThrow(SemanticError);
  });

  it('harus menangkap error saat tipe select tidak memiliki options', () => {
    const emptySelectSchema = {
      title: 'Form Select Kosong',
      fields: [{ id: 'kategori', label: 'Kategori', type: 'select', options: [] }],
    };

    const ir = parseSchema(emptySelectSchema);
    expect(() => analyzeSemantics(ir)).toThrow(SemanticError);
  });
});