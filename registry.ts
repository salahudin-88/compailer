import React from 'react';
import {
  TextInput,
  NumberInput,
  SelectInput,
  CheckboxInput,
  TextareaInput,
} from './fields/InputFields.js';
import type { FieldType } from '../types/schema.js';

export const ComponentRegistry: Record<FieldType, React.FC<any>> = {
  text: TextInput,
  email: TextInput,
  number: NumberInput,
  select: SelectInput,
  checkbox: CheckboxInput,
  textarea: TextareaInput,
};