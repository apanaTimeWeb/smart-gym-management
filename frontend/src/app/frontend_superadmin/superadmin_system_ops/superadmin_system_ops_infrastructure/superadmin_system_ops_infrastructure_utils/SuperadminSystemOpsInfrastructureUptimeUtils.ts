// RESPONSIBILITY: Formats uptime chart timestamps for local display. No JSX or API calls.
import { format } from 'date-fns';
/** Formats a UTC ISO timestamp for a compact local chart label. */
export function formatSuperadminInfrastructureUptimeAxisTime(timestamp: string, locale: string): string {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return '';
  void locale;
  return format(date, 'HH:mm');
}
