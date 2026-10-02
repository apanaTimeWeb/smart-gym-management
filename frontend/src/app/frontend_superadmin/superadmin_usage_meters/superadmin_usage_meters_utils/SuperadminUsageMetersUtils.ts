/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminUsageMetersUtils owned by the superadmin_usage_meters feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/lib/formatters
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Provides presentation-safe usage meter calculations.
import { formatNumber } from '@/lib/formatters';

export const getProgressColor = (used: number, limit: number) => { const percent = limit > 0 ? (used / limit) * 100 : 0; if (percent >= 90)
    return 'bg-danger'; if (percent >= 75)
    return 'bg-warning'; return 'bg-primary'; };
/** @description Calculates bounded usage percentage for a metered resource. @dependencies Uses only numeric inputs; no server or React state. @edge-case Returns 0 when limit is zero or non-positive and clamps output to 0–100. */
export const getPercentage = (used: number, limit: number): number => Math.min(100, Math.max(0, limit > 0 ? (used / limit) * 100 : 0));
/** @description Formats storage usage using the module number formatter. @dependencies Module formatter only. @edge-case Preserves zero and finite numeric values without introducing unit labels. */
export const formatUsageStorage = (gigabytes: number): string => formatNumber(gigabytes);
