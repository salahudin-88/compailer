import { z } from 'zod';
import type { FormIR } from '../types/ir.js';

export function buildZodSchema(formIR: FormIR): z.ZodObject<any> {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of formIR.fields) {
    let validator: z.ZodTypeAny;

    // Inisialisasi dasar berdasarkan tipe
    if (field.componentType === 'number') {
      validator = z.number();
    } else if (field.componentType === 'checkbox') {
      validator = z.boolean();
    } else {
      validator = z.string();
    }

    // Penerapan Aturan Validasi Tambahan (Rules Lowering)
    if (field.componentType === 'email' && field.rules?.required) {
      validator = (validator as z.ZodString).email({
        message: 'Format email tidak valid',
      });
    }

    if (field.rules?.minLength && 'min' in validator) {
      validator = (validator as z.ZodString).min(field.rules.minLength, {
        message: `${field.label} minimal ${field.rules.minLength} karakter`,
      });
    }

    if (field.rules?.maxLength && 'max' in validator) {
      validator = (validator as z.ZodString).max(field.rules.maxLength, {
        message: `${field.label} maksimal ${field.rules.maxLength} karakter`,
      });
    }

    // Handling Required vs Optional
    if (field.rules?.required) {
      if (field.componentType === 'text' || field.componentType === 'select') {
        validator = (validator as z.ZodString).min(1, {
          message: `${field.label} wajib diisi`,
        });
      }
    } else {
      validator = validator.optional();
    }

    shape[field.id] = validator;
  }

  return z.object(shape);
}