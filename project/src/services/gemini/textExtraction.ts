import { genAI } from './client';
import { GEMINI_CONFIG } from './config';
import { sleep } from '../utils/async';

export async function extractTextFromImage(imageBase64: string): Promise<string> {
  let attempts = 0;
  
  while (attempts < GEMINI_CONFIG.MAX_RETRIES) {
    try {
      const model = genAI.getGenerativeModel({ model: GEMINI_CONFIG.MODEL });
      
      if (!imageBase64) {
        throw new Error('Invalid image data provided');
      }

      const prompt = 'Extract and return all text from this image. Maintain original formatting and be as accurate as possible.';
      
      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            mimeType: 'image/png',
            data: imageBase64
          }
        }
      ]);

      const response = await result.response;
      const text = response.text();
      
      if (!text) {
        throw new Error('No text was extracted from the image');
      }

      return text;
    } catch (error) {
      attempts++;
      
      if (attempts === GEMINI_CONFIG.MAX_RETRIES) {
        if (error instanceof Error) {
          throw new Error(`Text extraction failed after ${attempts} attempts: ${error.message}`);
        }
        throw new Error(`Text extraction failed after ${attempts} attempts`);
      }
      
      // Wait before retrying
      await sleep(GEMINI_CONFIG.RETRY_DELAY);
    }
  }
  
  throw new Error('Text extraction failed: Maximum retries exceeded');
}