// RESPONSIBILITY: Calculates remaining SLA time for ticket rows. No JSX or network calls.
/** Returns remaining milliseconds between the SLA deadline and the current clock. */
export function getSuperadminTicketsSlaRemainingMs(slaDeadline: string, now = new Date()): number {
  return new Date(slaDeadline).getTime() - now.getTime();
}
