/**
 * Performs the modulus operator but only returns positive value results.
 * 
 * @param n The dividend.
 * @param m The divisor.
 * @returns The remainder.
 */
export const positiveMod = (n: number, m: number): number => ((n % m) + m) % m;