/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminMessagingDateRangeConstants owned by the superadmin_messaging feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns the static date-range choices exposed by Superadmin reporting/filter surfaces.
export const SUPERADMIN_MESSAGING_DATE_RANGE_OPTIONS = [
  { value: 'today', labelKey: 'ui.range_today' },
  { value: 'this_week', labelKey: 'ui.range_this_week' },
  { value: 'this_month', labelKey: 'ui.range_this_month' },
  { value: 'this_year', labelKey: 'ui.range_this_year' },
  { value: 'custom', labelKey: 'ui.range_custom' },
] as const;
