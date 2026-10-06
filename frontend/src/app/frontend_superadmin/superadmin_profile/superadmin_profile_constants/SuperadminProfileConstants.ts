/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminProfileConstants owned by the superadmin_profile feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Defines canonical Superadmin Profile tab identifiers and other module-wide static UI values.
export const SUPERADMIN_PROFILE_TABS = ['personal', 'security'] as const;

export const SUPERADMIN_PROFILE_DATA_EXPORT_COMPLETION_STATES = ['idle', 'started', 'completed'] as const;
export const TIMEZONE_OPTIONS = ['Asia/Kolkata', 'UTC', 'America/New_York', 'Europe/London', 'Asia/Dubai', 'Australia/Sydney'] as const;
export const LANGUAGE_OPTIONS = [{ value: 'en', label: 'English' }, { value: 'hi', label: 'Hindi' }] as const;
