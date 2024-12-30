import * as pdfjsLib from 'pdfjs-dist';
import './worker'; // Import worker configuration

export async function getPDFPageCount(file: File): Promise<number> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    return pdf.numPages;
  } catch (error) {
    console.error('Error getting PDF page count:', error);
    throw new Error('Failed to get PDF page count');
  }
}