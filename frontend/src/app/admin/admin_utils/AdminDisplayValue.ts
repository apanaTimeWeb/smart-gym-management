// RESPONSIBILITY: Provides the canonical en-dash display fallback for nullable Admin UI values.
export function displayValue(value: string | number | null | undefined, fallback = '—'): string {
  if (value === null || value === undefined || value === '') return fallback;
  return String(value);
}
