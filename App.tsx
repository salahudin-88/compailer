import React, { useState } from 'react';
import { DynamicFormRenderer } from './components/DynamicFormRenderer.js';
import sampleSchema from '../examples/valid/01_basic.json' with { type: 'json' };

export const App: React.FC = () => {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(sampleSchema, null, 2)
  );
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);
  const [renderError, setRenderError] = useState<string | null>(null);

  const handleSubmit = (data: Record<string, any>) => {
    setSubmittedData(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col md:flex-row gap-6">
      {/* Panel Kiri: Live Editor JSON Schema */}
      <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow">
        <h1 className="text-xl font-bold mb-2">JSON Schema Input Editor</h1>
        <p className="text-xs text-gray-500 mb-4">
          Edit JSON Schema di bawah secara bebas untuk menguji fleksibilitas compiler.
        </p>
        <textarea
          value={jsonInput}
          onChange={(e) => {
            setJsonInput(e.target.value);
            setRenderError(null);
          }}
          className="w-full h-96 p-3 font-mono text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
        />
      </div>

      {/* Panel Kanan: Hasil Render UI Dynamic Form */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h1 className="text-xl font-bold mb-4">Live Rendered Dynamic Form</h1>
          {renderError ? (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {renderError}
            </div>
          ) : (
            <DynamicFormRenderer
              schema={jsonInput}
              onSubmit={handleSubmit}
              submitButtonText="Kirim Data"
            />
          )}
        </div>

        {/* Panel Output Result Data JSON */}
        {submittedData && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-2 text-green-700">Payload Output Submit Valid:</h2>
            <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;