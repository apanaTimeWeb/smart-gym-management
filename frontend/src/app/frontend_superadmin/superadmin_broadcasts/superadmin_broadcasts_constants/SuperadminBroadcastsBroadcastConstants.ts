/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBroadcastsBroadcastConstants owned by the superadmin_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Static UI configuration owned by the Broadcasts module.

export const SUPERADMIN_BROADCAST_STATUS_OPTIONS = [
  { label: 'Draft', value: 'DRAFT' },
  { label: 'Scheduled', value: 'SCHEDULED' },
  { label: 'Send Now', value: 'SENT' },
];

/** Canonical business/status literals for this feature. */
export const SUPERADMIN_BROADCAST_STATUS_CODES = Object.freeze({
  ALL: 'ALL',
  FAILED: 'FAILED',
  DRAFT: 'DRAFT',
  SCHEDULED: 'SCHEDULED',
  SENT: 'SENT',

} as const);

export const SUPERADMIN_BROADCAST_QUEUE_STATE_CODES = Object.freeze({
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  DELIVERED: 'DELIVERED',
  FAILED: 'FAILED',
} as const);

export const SUPERADMIN_BROADCAST_STATUS_FILTER_CODES = Object.freeze({
  ALL: 'ALL',
  DRAFT: 'DRAFT',
  SCHEDULED: 'SCHEDULED',
  SENT: 'SENT',
  FAILED: 'FAILED',
} as const);
