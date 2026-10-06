import { describe, expect, it } from 'vitest';

import { MOCK_SUPERADMIN_REPORTS_REVENUE } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_mocks/superadmin_reports_mocks_fixtures/SuperadminReportsMockFixtures';



describe('Superadmin Reports module fixture contract', () => {
  it('provides revenue records with report dimensions consumed by the table', () => {
    expect(Array.isArray(MOCK_SUPERADMIN_REPORTS_REVENUE)).toBe(true);
    expect(MOCK_SUPERADMIN_REPORTS_REVENUE.length).toBeGreaterThan(0);
    expect(MOCK_SUPERADMIN_REPORTS_REVENUE.every((row) => Boolean(row.id && row.month && row.plan))).toBe(true);
    expect(MOCK_SUPERADMIN_REPORTS_REVENUE.every((row) => typeof row.revenue === 'number')).toBe(true);
  });

});
