import { describe, expect, it } from 'vitest';
import { SuperadminAnalyticsV1DataSchema } from '@/app/superadmin/analytics/analytics_types/SuperadminAnalyticsV1Types';
import { SUPERADMIN_ANALYTICS_RETENTION_INSIGHTS_MOCK_FIXTURE } from '@/app/superadmin/analytics/analytics_mocks/fixtures/SuperadminAnalyticsV1MockFixtures';
describe('Customer Retention & Growth Insights contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminAnalyticsV1DataSchema.safeParse(SUPERADMIN_ANALYTICS_RETENTION_INSIGHTS_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
