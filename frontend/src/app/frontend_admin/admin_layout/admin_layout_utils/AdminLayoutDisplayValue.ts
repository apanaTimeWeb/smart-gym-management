// RESPONSIBILITY: Provides the canonical en-dash display fallback for nullable Admin UI values.
/**
 * displayValue provides a feature-local utility used by the Admin module without introducing cross-feature business dependencies.
 * @remarks Inputs and outputs stay explicitly typed and deterministic for tests and reuse inside this feature.
 */
export function displayValue(value: string | number | null | undefined, fallback = '—'): string {
  if (value === null || value === undefined || value === '') return fallback;
  return String(value);
}
