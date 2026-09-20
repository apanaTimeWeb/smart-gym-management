import { describe, expect, it } from 'vitest';
import { MOCK_SUPERADMIN_DASHBOARD_DATA } from '@/app/superadmin/dashboard/dashboard_mocks/fixtures/SuperadminDashboardMockFixtures';

describe('Superadmin Dashboard module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(MOCK_SUPERADMIN_DASHBOARD_DATA).toBeDefined();
    const serialized = JSON.stringify(MOCK_SUPERADMIN_DASHBOARD_DATA);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
