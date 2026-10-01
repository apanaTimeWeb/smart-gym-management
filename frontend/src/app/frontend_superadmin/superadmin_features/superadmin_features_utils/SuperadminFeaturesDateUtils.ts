// RESPONSIBILITY: Formats feature date-only values using the browser's local calendar. No JSX or network calls.
/** Formats a Date as yyyy-MM-dd without UTC day shifting. */
export function formatSuperadminFeaturesCalendarDate(value: Date): string {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
