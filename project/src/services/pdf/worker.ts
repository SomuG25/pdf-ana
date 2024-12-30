import { GlobalWorkerOptions } from 'pdfjs-dist';

// Import the worker directly from node_modules
import PDFWorker from 'pdfjs-dist/build/pdf.worker.min?url';

// Set up the worker
GlobalWorkerOptions.workerSrc = PDFWorker;