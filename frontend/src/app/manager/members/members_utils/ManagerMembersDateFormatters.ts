/** Formats membership attendance headings using the module's shared date locale. */
export function formatMemberMonthYear(value: Date | string): string {
  return new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(new Date(value));
}
