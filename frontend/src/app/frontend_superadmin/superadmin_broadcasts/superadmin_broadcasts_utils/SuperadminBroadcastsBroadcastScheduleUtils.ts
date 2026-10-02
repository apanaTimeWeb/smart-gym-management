/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBroadcastsBroadcastScheduleUtils owned by the superadmin_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Converts local date/time inputs into the API's ISO schedule representation.

/**
 * @description Provides broadcasts formatting or feature utility behavior for combineSuperadminBroadcastScheduleDateTime.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function combineSuperadminBroadcastScheduleDateTime(date: string, time: string): string {
  return new Date(`${date}T${time}:00Z`).toISOString();
}

/**
 * @description Provides broadcasts formatting or feature utility behavior for splitSuperadminBroadcastScheduleDateTime.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function splitSuperadminBroadcastScheduleDateTime(value?: string | null): { date: string; time: string } {
  if (!value) return { date: '', time: '' };
  const parsed = new Date(value);
  return {
    date: `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`,
    time: `${String(parsed.getHours()).padStart(2, '0')}:${String(parsed.getMinutes()).padStart(2, '0')}`,
  };
}
