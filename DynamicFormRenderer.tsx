import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseSchema } from '../parser/parser.js';
import { analyzeSemantics } from '../semantic/analyzer.js';
import { buildZodSchema } from '../lowering/zodCompiler.js';
import { ComponentRegistry } from './registry.js';
import type { FormSchema } from '../types/schema.js';

interface DynamicFormRendererProps {
  schema: string | FormSchema;
  onSubmit: (data: Record<string, any>) => void;
  submitButtonText?: string;
}

export const DynamicFormRenderer: React.FC<DynamicFormRendererProps> = ({
  schema,
  onSubmit,
  submitButtonText = 'Submit',
}) => {
  // 1. Pipeline Compiler Engine
  const { formIR, zodSchema } = useMemo(() => {
    // Phase 1: Parsing
    const parsedIR = parseSchema(schema);

    // Phase 2: Semantic Analysis
    analyzeSemantics(parsedIR);

    // Phase 3: Lowering to Zod Validation Schema
    const compiledZod = buildZodSchema(parsedIR);

    return { formIR: parsedIR, zodSchema: compiledZod };
  }, [schema]);

  // 2. Setup React Hook Form dengan Zod Resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{formIR.title}</h2>
      {formIR.description && (
        <p className="text-gray-600 mb-6 text-sm">{formIR.description}</p>
      )}

      {/* Render Dynamic Fields via Component Registry */}
      {formIR.fields.map((field) => {
        const Component = ComponentRegistry[field.componentType] || ComponentRegistry.text;
        const errorMessage = errors[field.id]?.message as string | undefined;

        return (
          <Component
            key={field.id}
            id={field.id}
            label={field.label}
            placeholder={field.placeholder}
            options={field.options}
            register={register(field.id)}
            error={errorMessage}
          />
        );
      })}

      <button
        type="submit"
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
      >
        {submitButtonText}
      </button>
    </form>
  );
};