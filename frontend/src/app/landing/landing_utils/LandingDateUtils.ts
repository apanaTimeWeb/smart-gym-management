// RESPONSIBILITY: Provides timezone-safe date input and API serialization helpers for Landing forms.
import { format, parseISO } from 'date-fns';

/** Returns today's browser-local date in the native date-input format. */
export function getLandingTodayDateInputValue(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

/** Converts a local YYYY-MM-DD booking date into an offset-aware UTC ISO timestamp. */
export function serializeLandingDateToUtc(dateInput: string): string {
  return parseISO(dateInput).toISOString();
}
