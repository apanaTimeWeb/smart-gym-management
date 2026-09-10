// RESPONSIBILITY: Provides consistent formatting for empty or null values in the UI, especially tables.
export function displayValue(value: string | number | null | undefined, fallback: string = '-'): string {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }
  return String(value);
}
