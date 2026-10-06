/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminUsageMetersConstants owned by the superadmin_usage_meters feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_types/SuperadminUsageMetersTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Centralized mock data constants for the Usage Meters Module.
import type { UsageMeter } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_types/SuperadminUsageMetersTypes';

export const SUPERADMIN_USAGE_METERS_DATE_RANGE_OPTIONS = [
  { value: 'this_week', label: 'This Week' },
  { value: 'this_month', label: 'This Month' },
  { value: 'custom', label: 'Custom Range' },
] as const;
