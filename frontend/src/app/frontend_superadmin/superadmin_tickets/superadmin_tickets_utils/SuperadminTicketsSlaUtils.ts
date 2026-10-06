// RESPONSIBILITY: Calculates remaining SLA time for ticket rows. No JSX or network calls.
import { parseISO } from 'date-fns';

/**
 * @description Returns remaining milliseconds between a parsed SLA deadline and the current clock.
 * @dependencies Uses date-fns parseISO for contract-safe ISO timestamps.
 * @edge-case Invalid timestamps return zero so the UI never renders a misleading negative/NaN duration.
 */
export function getSuperadminTicketsSlaRemainingMs(slaDeadline: string, now = new Date()): number {
  const deadline = parseISO(slaDeadline);
  if (Number.isNaN(deadline.getTime())) return 0;
  return deadline.getTime() - now.getTime();
}
