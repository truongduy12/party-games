import type { Idiom } from './types';

/**
 * Get a random idiom from the array, optionally excluding a specific ID
 * to avoid immediate repetition
 */
export function getRandomIdiom(idioms: Idiom[], excludeId?: number): Idiom {
  // Filter out the excluded ID if provided
  const available = excludeId ? idioms.filter((i) => i.id !== excludeId) : idioms;

  // If filtering results in empty array (e.g., only 1 idiom total),
  // fall back to full array (allow repeat)
  const pool = available.length > 0 ? available : idioms;

  // Random selection
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

/**
 * Validate idiom data structure from JSON import
 * Throws error if data is invalid
 */
export function validateIdioms(data: unknown): Idiom[] {
  if (!Array.isArray(data)) {
    throw new Error('Idiom data must be an array');
  }

  if (data.length === 0) {
    throw new Error('Idiom data cannot be empty');
  }

  // Type guard for each idiom
  const isValid = data.every(
    (item): item is Idiom =>
      typeof item === 'object' &&
      item !== null &&
      typeof (item as Idiom).id === 'number' &&
      typeof (item as Idiom).content === 'string' &&
      (item as Idiom).content.length > 0
  );

  if (!isValid) {
    throw new Error(
      'Invalid idiom structure: each idiom must have id (number) and content (non-empty string)'
    );
  }

  return data as Idiom[];
}
