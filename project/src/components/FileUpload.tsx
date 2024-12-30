import React from 'react';
import { Upload } from 'lucide-react';
import type { FileUploadProps } from '../types';

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full max-w-md">
      <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors">
        <Upload className="w-8 h-8" />
        <span className="mt-2 text-base">Select PDF file</span>
        <input
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};