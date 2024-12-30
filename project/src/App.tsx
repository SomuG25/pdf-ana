import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { OCRStatus } from './components/OCRStatus';
import { Results } from './components/Results';
import { ScanText } from 'lucide-react';
import { processPDFPage } from './services/pdf/processing';
import { getPDFPageCount } from './services/pdf/utils';
import type { ProcessingResult } from './types';

function App() {
  const [results, setResults] = useState<ProcessingResult[]>([]);
  const [processing, setProcessing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    try {
      setProcessing(true);
      setResults([]);
      setError(null);
      
      const pageCount = await getPDFPageCount(file);
      setTotalPages(pageCount);
      
      for (let i = 0; i < pageCount; i++) {
        setCurrentPage(i + 1);
        const result = await processPDFPage(file, i);
        setResults(prev => [...prev, result]);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(message);
      console.error('Error processing PDF:', error);
    } finally {
      setProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ScanText className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            PDF Text Extraction
          </h1>
          <p className="text-gray-600">
            Extract text from PDFs using Google's Gemini AI
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <FileUpload onFileSelect={handleFileSelect} />
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            {error}
          </div>
        )}

        <div className="mb-4 flex justify-center">
          <OCRStatus
            processing={processing}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>

        <Results results={results} onCopy={copyToClipboard} />
      </div>
    </div>
  );
}

export default App;