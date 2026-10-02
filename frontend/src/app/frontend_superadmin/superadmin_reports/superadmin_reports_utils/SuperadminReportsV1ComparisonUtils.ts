/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminReportsV1ComparisonUtils owned by the superadmin_reports feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/lib/formatters, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsV1Types, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsV1ComparisonTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Selects the server-provided report comparison dataset for the active period/segment and creates CSV output.
import { formatDecimal } from '@/lib/formatters';

import type { SuperadminReportsV1ComparisonMetric } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsV1ComparisonTypes';
import type { SuperadminReportsV1Data } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsV1Types';



/**
 * @description Provides reports formatting or feature utility behavior for getSuperadminReportsV1ComparisonMetrics.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function getSuperadminReportsV1ComparisonMetrics(data: SuperadminReportsV1Data, periodKey: string, segmentKey: string): SuperadminReportsV1ComparisonMetric[] {
  return data.comparisonSets.find((set) => set.periodKey === periodKey && set.segmentKey === segmentKey)?.metrics ?? [];
}

/**
 * @description Provides reports formatting or feature utility behavior for createSuperadminReportsV1ComparisonCsv.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function createSuperadminReportsV1ComparisonCsv(metrics: SuperadminReportsV1ComparisonMetric[]): string {
  return ['Metric,Current,Previous,Change', ...metrics.map((metric) => `"${metric.name.replaceAll('"', '""')}",${metric.current},${metric.previous},${formatDecimal(metric.change, 2)}`)].join('\n');
}
