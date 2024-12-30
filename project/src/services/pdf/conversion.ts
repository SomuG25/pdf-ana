import * as pdfjsLib from 'pdfjs-dist';
import { validatePDFFile, validatePageNumber } from '../utils/validation';
import './worker';

export async function convertPDFPageToImage(
  file: File,
  pageNumber: number
): Promise<string> {
  try {
    validatePDFFile(file);

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    validatePageNumber(pageNumber, pdf.numPages);

    const page = await pdf.getPage(pageNumber + 1);
    const scale = 2;
    const viewport = page.getViewport({ scale });
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
      throw new Error('Failed to create canvas context');
    }
    
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    await page.render({
      canvasContext: context,
      viewport,
    }).promise;
    
    const imageData = canvas.toDataURL('image/png');
    const base64Data = imageData.split(',')[1];
    
    if (!base64Data) {
      throw new Error('Failed to generate image data');
    }

    return base64Data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`PDF conversion failed: ${error.message}`);
    }
    throw new Error('PDF conversion failed: Unknown error occurred');
  }
}