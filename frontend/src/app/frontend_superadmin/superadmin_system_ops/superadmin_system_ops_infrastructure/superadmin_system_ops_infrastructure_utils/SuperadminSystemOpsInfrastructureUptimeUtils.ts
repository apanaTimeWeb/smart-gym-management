// RESPONSIBILITY: Formats uptime chart timestamps for local display. No JSX or API calls.
import { format } from 'date-fns';
/** Formats a UTC ISO timestamp for a compact local chart label. */
/**
 * @description Provides system ops infrastructure formatting or feature utility behavior for formatSuperadminInfrastructureUptimeAxisTime.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function formatSuperadminInfrastructureUptimeAxisTime(timestamp: string, locale: string): string {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return '';
  void locale;
  return format(date, 'HH:mm');
}
