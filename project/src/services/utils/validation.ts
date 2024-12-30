/**
 * Validates that a file is a PDF
 * @param file File to validate
 * @throws Error if file is invalid
 */
export function validatePDFFile(file: File): void {
  if (!file) {
    throw new Error('No file provided');
  }

  if (!(file instanceof File)) {
    throw new Error('Invalid file type provided');
  }

  if (file.type !== 'application/pdf') {
    throw new Error('File must be a PDF');
  }
}

/**
 * Validates a page number against the total number of pages
 * @param pageNumber Page number to validate
 * @param totalPages Total number of pages
 * @throws Error if page number is invalid
 */
export function validatePageNumber(pageNumber: number, totalPages: number): void {
  if (pageNumber < 0) {
    throw new Error('Invalid page number');
  }

  if (pageNumber >= totalPages) {
    throw new Error(`Page ${pageNumber + 1} does not exist in the PDF`);
  }
}