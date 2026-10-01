// RESPONSIBILITY: Calculates analytics date preset boundaries for URL/API query values. No JSX or network calls.
import { format, startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear } from 'date-fns';

/** Returns YYYY-MM-DD bounds for an analytics preset using date-fns and the current local calendar. */
export function getSuperadminAnalyticsPresetRange(preset: string, now = new Date()): { from: string; to: string } {
  switch (preset) {
    case 'this_month': return { from: format(startOfMonth(now), 'yyyy-MM-dd'), to: format(endOfMonth(now), 'yyyy-MM-dd') };
    case 'last_month': { const month = subMonths(now, 1); return { from: format(startOfMonth(month), 'yyyy-MM-dd'), to: format(endOfMonth(month), 'yyyy-MM-dd') }; }
    case 'last_3_months': return { from: format(startOfMonth(subMonths(now, 3)), 'yyyy-MM-dd'), to: format(endOfMonth(now), 'yyyy-MM-dd') };
    case 'last_6_months': return { from: format(startOfMonth(subMonths(now, 6)), 'yyyy-MM-dd'), to: format(endOfMonth(now), 'yyyy-MM-dd') };
    case 'this_year': return { from: format(startOfYear(now), 'yyyy-MM-dd'), to: format(endOfYear(now), 'yyyy-MM-dd') };
    default: return { from: '', to: '' };
  }
}
