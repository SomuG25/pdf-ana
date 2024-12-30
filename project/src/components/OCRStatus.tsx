import React from 'react';
import { Loader2 } from 'lucide-react';
import type { OCRStatusProps } from '../types';

export const OCRStatus: React.FC<OCRStatusProps> = ({
  processing,
  currentPage,
  totalPages,
}) => {
  if (!processing) return null;

  return (
    <div className="flex items-center space-x-2 text-blue-600">
      <Loader2 className="w-5 h-5 animate-spin" />
      <span>
        Processing page {currentPage} of {totalPages}...
      </span>
    </div>
  );
};