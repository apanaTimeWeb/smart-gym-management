// RESPONSIBILITY: Provides pure calendar geometry and today-state calculations for the Gyms calendar UI.
export interface SuperadminGymsCalendarGrid { year: number; month: number; daysInMonth: number; leadingEmptyDays: number; }
/** Calculates calendar grid geometry for the requested local month. */
export function getSuperadminGymsCalendarGrid(year: number, month: number): SuperadminGymsCalendarGrid {
  return { year, month, daysInMonth: new Date(year, month + 1, 0).getDate(), leadingEmptyDays: new Date(year, month, 1).getDay() };
}
/** Returns whether a date value falls on the same local calendar day as the supplied clock value. */
export function isSuperadminGymsCalendarToday(dateValue: string, now = new Date()): boolean {
  return new Date(dateValue).toDateString() === now.toDateString();
}
