import type { FieldType, Option, ValidationRules } from './schema.js';

export interface FieldIR {
  id: string;
  label: string;
  componentType: FieldType;
  placeholder?: string;
  defaultValue?: any;
  options?: Option[];
  rules?: ValidationRules;
}

export interface FormIR {
  title: string;
  description?: string;
  fields: FieldIR[];
}