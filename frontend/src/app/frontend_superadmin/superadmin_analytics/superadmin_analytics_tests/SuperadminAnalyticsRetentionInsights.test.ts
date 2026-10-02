import { describe, expect, it } from 'vitest';

import { SUPERADMIN_ANALYTICS_RETENTION_INSIGHTS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_mocks/superadmin_analytics_mocks_fixtures/SuperadminAnalyticsV1MockFixtures';
import { SuperadminAnalyticsV1DataSchema } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_schemas/SuperadminAnalyticsV1Schema';



describe('Customer Retention & Growth Insights contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminAnalyticsV1DataSchema.safeParse(SUPERADMIN_ANALYTICS_RETENTION_INSIGHTS_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
