import { describe, expect, it } from 'vitest';
import { SuperadminDashboardV1DataSchema } from '@/app/superadmin/dashboard/dashboard_types/SuperadminDashboardV1Types';
import { SUPERADMIN_DASHBOARD_BUSINESS_OVERVIEW_MOCK_FIXTURE } from '@/app/superadmin/dashboard/dashboard_mocks/fixtures/SuperadminDashboardV1MockFixtures';
describe('Business Overview contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminDashboardV1DataSchema.safeParse(SUPERADMIN_DASHBOARD_BUSINESS_OVERVIEW_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
