import { convertPDFPageToImage } from './conversion';
import { extractTextFromImage } from '../gemini/textExtraction';
import type { ProcessingResult } from '../../types';

export async function processPDFPage(
  file: File,
  pageNumber: number
): Promise<ProcessingResult> {
  try {
    if (!file) {
      throw new Error('No PDF file provided');
    }

    if (pageNumber < 0) {
      throw new Error('Invalid page number');
    }

    const imageBase64 = await convertPDFPageToImage(file, pageNumber);
    if (!imageBase64) {
      throw new Error('Failed to convert PDF page to image');
    }

    const extractedText = await extractTextFromImage(imageBase64);
    
    return {
      text: extractedText || 'No text could be extracted from this page',
      page: pageNumber + 1
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to process page ${pageNumber + 1}: ${message}`);
  }
}