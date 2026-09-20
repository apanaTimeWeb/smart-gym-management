// RESPONSIBILITY: Selects the server-provided report comparison dataset for the active period/segment and creates CSV output.
import { formatDecimal } from '@/lib/formatters';
import type { SuperadminReportsV1Data } from '@/app/superadmin/reports/reports_types/SuperadminReportsV1Types';
import type { SuperadminReportsV1ComparisonMetric } from '@/app/superadmin/reports/reports_types/SuperadminReportsV1ComparisonTypes';

export function getSuperadminReportsV1ComparisonMetrics(data: SuperadminReportsV1Data, periodKey: string, segmentKey: string): SuperadminReportsV1ComparisonMetric[] {
  return data.comparisonSets.find((set) => set.periodKey === periodKey && set.segmentKey === segmentKey)?.metrics ?? [];
}

export function createSuperadminReportsV1ComparisonCsv(metrics: SuperadminReportsV1ComparisonMetric[]): string {
  return ['Metric,Current,Previous,Change', ...metrics.map((metric) => `"${metric.name.replaceAll('"', '""')}",${metric.current},${metric.previous},${formatDecimal(metric.change, 2)}`)].join('\n');
}
