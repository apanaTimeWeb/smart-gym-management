// RESPONSIBILITY: Formats uptime chart timestamps for local display. No JSX or API calls.
/** Formats a UTC ISO timestamp for a compact local chart label. */
export function formatSuperadminInfrastructureUptimeAxisTime(timestamp: string): string {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit' }).format(date);
}
