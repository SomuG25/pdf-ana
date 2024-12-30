export interface ProcessingResult {
  text: string;
  page: number;
}

export interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export interface OCRStatusProps {
  processing: boolean;
  currentPage: number;
  totalPages: number;
}

export interface ResultsProps {
  results: ProcessingResult[];
  onCopy: (text: string) => void;
}