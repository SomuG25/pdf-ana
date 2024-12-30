/**
 * Utility function to pause execution for a specified duration
 * @param ms Duration to sleep in milliseconds
 */
export const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));