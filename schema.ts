export type FieldType = 
  | 'text' 
  | 'number' 
  | 'email' 
  | 'select' 
  | 'checkbox' 
  | 'textarea';

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string; // Regex string
}

export interface Option {
  label: string;
  value: string | number;
}

export interface FieldSchema {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: any;
  options?: Option[]; // Wajib jika type === 'select'
  validation?: ValidationRules;
}

export interface FormSchema {
  title: string;
  description?: string;
  fields: FieldSchema[];
}