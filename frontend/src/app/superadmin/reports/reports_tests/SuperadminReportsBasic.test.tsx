import { describe, expect, it } from 'vitest';
import { MOCK_SUPERADMIN_REPORTS_REVENUE } from '@/app/superadmin/reports/reports_mocks/fixtures/SuperadminReportsMockFixtures';

describe('Superadmin Reports module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(MOCK_SUPERADMIN_REPORTS_REVENUE).toBeDefined();
    const serialized = JSON.stringify(MOCK_SUPERADMIN_REPORTS_REVENUE);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
