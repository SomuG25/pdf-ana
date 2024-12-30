import { PDFDocument } from 'pdf-lib';

export async function convertPDFPageToImage(
  file: File,
  pageNumber: number
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const page = pdfDoc.getPage(pageNumber);
  
  // Create a canvas to render the PDF page
  const canvas = document.createElement('canvas');
  const scale = 2; // Higher scale for better quality
  canvas.width = page.getWidth() * scale;
  canvas.height = page.getHeight() * scale;
  
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not get canvas context');
  
  // Convert to image
  const imageData = canvas.toDataURL('image/png');
  return imageData.split(',')[1]; // Return base64 without data URL prefix
}