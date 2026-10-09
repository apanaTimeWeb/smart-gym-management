// RESPONSIBILITY: Provides Trainer Library feature-local nullable display formatting.

/**
 * @description Converts absent primitive values to an explicit en-dash while preserving meaningful values.
 * @dependencies None beyond standard JavaScript primitives.
 * @edge-case Empty string is treated as absent; zero and false remain visible.
 */
export function TrainerLibraryDisplayValue(value: string | number | boolean | null | undefined): string | number | boolean {
  return value === null || value === undefined || value === '' ? '—' : value;
}
