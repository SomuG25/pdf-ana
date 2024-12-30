import React from 'react';
import { Copy } from 'lucide-react';
import type { ResultsProps } from '../types';

export const Results: React.FC<ResultsProps> = ({ results, onCopy }) => {
  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Page {result.page}</h3>
            <button
              onClick={() => onCopy(result.text)}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>
          <div className="whitespace-pre-wrap text-gray-700">{result.text}</div>
        </div>
      ))}
    </div>
  );
};