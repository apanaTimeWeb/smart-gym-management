import { describe, expect, it } from 'vitest';
import { MOCK_REVENUE_METRICS } from '@/app/superadmin/analytics/analytics_mocks/fixtures/SuperadminAnalyticsMockFixtures';

describe('Superadmin Analytics module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(MOCK_REVENUE_METRICS).toBeDefined();
    const serialized = JSON.stringify(MOCK_REVENUE_METRICS);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
