import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import type { Option } from '../../types/schema.js';

interface BaseFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string;
}

interface SelectFieldProps extends BaseFieldProps {
  options?: Option[];
}

export const TextInput: React.FC<BaseFieldProps> = ({ id, label, placeholder, register, error }) => (
  <div className="flex flex-col gap-1 mb-4">
    <label htmlFor={id} className="font-medium text-sm text-gray-700">{label}</label>
    <input
      id={id}
      type="text"
      placeholder={placeholder}
      {...register}
      className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
);

export const NumberInput: React.FC<BaseFieldProps> = ({ id, label, placeholder, register, error }) => (
  <div className="flex flex-col gap-1 mb-4">
    <label htmlFor={id} className="font-medium text-sm text-gray-700">{label}</label>
    <input
      id={id}
      type="number"
      placeholder={placeholder}
      {...register}
      className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
);

export const SelectInput: React.FC<SelectFieldProps> = ({ id, label, options, register, error }) => (
  <div className="flex flex-col gap-1 mb-4">
    <label htmlFor={id} className="font-medium text-sm text-gray-700">{label}</label>
    <select
      id={id}
      {...register}
      className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">-- Pilih {label} --</option>
      {options?.map((opt) => (
        <option key={String(opt.value)} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
);

export const CheckboxInput: React.FC<BaseFieldProps> = ({ id, label, register, error }) => (
  <div className="flex items-center gap-2 mb-4">
    <input
      id={id}
      type="checkbox"
      {...register}
      className="h-4 w-4 text-blue-600 rounded border-gray-300"
    />
    <label htmlFor={id} className="font-medium text-sm text-gray-700">{label}</label>
    {error && <span className="text-red-500 text-xs ml-2">{error}</span>}
  </div>
);

export const TextareaInput: React.FC<BaseFieldProps> = ({ id, label, placeholder, register, error }) => (
  <div className="flex flex-col gap-1 mb-4">
    <label htmlFor={id} className="font-medium text-sm text-gray-700">{label}</label>
    <textarea
      id={id}
      placeholder={placeholder}
      {...register}
      className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows={3}
    />
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
);