import { describe, expect, it } from 'vitest';

import { getSuperadminReportsV1ComparisonMetrics, createSuperadminReportsV1ComparisonCsv } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_utils/SuperadminReportsV1ComparisonUtils';
import type { SuperadminReportsV1Data } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsV1Types';



describe('SuperadminReportsV1ComparisonUtils', () => {
  it('selects comparison metrics by period and segment', () => {
    const data: SuperadminReportsV1Data = { periods: [], segments: [], currency: 'INR', metrics: [], planComparison: [], regionComparison: [], comparisonSets: [{ periodKey: 'monthly', segmentKey: 'all', currency: 'INR', metrics: [{ name: 'Revenue', current: 10, previous: 8, change: 25 }] }] };
    expect(getSuperadminReportsV1ComparisonMetrics(data, 'monthly', 'all')).toEqual(data.comparisonSets[0].metrics);
    expect(getSuperadminReportsV1ComparisonMetrics(data, 'yearly', 'all')).toEqual([]);
  });

  it('creates a stable CSV header and escapes metric names', () => {
    const csv = createSuperadminReportsV1ComparisonCsv([{ name: 'Revenue, "Net"', current: 10, previous: 8, change: 25 }] as never);
    expect(csv).toContain('Metric,Current,Previous,Change');
    expect(csv).toContain('"Revenue, ""Net""",10,8');
  });
});
