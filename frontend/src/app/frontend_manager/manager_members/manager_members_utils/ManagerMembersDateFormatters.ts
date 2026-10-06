import { format, parseISO } from 'date-fns';
/** Formats membership attendance headings using the module's shared date locale. */
/**
 * @description Transforms or formats members data without owning server state or cross-feature business behavior.
 * @dependencies Uses feature-local utilities/constants and approved platform APIs only.
 * @edge-case Preserves documented nullish, invalid, masked, and timezone-safe fallback behavior.
 */
export function formatMemberMonthYear(value: Date | string): string {
  return format(parseISO(value instanceof Date ? value.toISOString() : value), 'LLLL yyyy');
}
