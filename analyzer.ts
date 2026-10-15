import { SemanticError } from '../errors.js';
import type { FormIR } from '../types/ir.js';
import type { FieldType } from '../types/schema.js';

const ALLOWED_TYPES: FieldType[] = [
  'text',
  'number',
  'email',
  'select',
  'checkbox',
  'textarea',
];

export function analyzeSemantics(formIR: FormIR): void {
  const fieldIdSet = new Set<string>();

  for (const field of formIR.fields) {
    // 1. Pengecekan ID Unik (Duplicate ID Check)
    if (fieldIdSet.has(field.id)) {
      throw new SemanticError(`Terjadi duplikasi ID field: "${field.id}"`, field.id);
    }
    fieldIdSet.add(field.id);

    // 2. Pengecekan Tipe Field yang Didukung (Type Checking)
    if (!ALLOWED_TYPES.includes(field.componentType)) {
      throw new SemanticError(
        `Tipe field "${field.componentType}" tidak didukung oleh system`,
        field.id
      );
    }

    // 3. Pengecekan Aturan Khusus Tipe Field (Select Options Check)
    if (field.componentType === 'select') {
      if (!field.options || field.options.length === 0) {
        throw new SemanticError(
          `Field bertipe "select" wajib memiliki opsi ("options") minimal 1 pilihan`,
          field.id
        );
      }
    }

    // 4. Pengecekan Logika Aturan Validasi
    if (field.rules) {
      if (
        field.rules.minLength !== undefined &&
        field.rules.maxLength !== undefined &&
        field.rules.minLength > field.rules.maxLength
      ) {
        throw new SemanticError(
          `Aturan minLength (${field.rules.minLength}) tidak boleh lebih besar dari maxLength (${field.rules.maxLength})`,
          field.id
        );
      }
    }
  }
}