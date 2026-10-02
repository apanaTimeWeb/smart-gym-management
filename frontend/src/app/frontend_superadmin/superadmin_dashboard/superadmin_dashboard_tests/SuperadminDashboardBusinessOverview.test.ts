import { describe, expect, it } from 'vitest';

import { SUPERADMIN_DASHBOARD_BUSINESS_OVERVIEW_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_mocks/superadmin_dashboard_mocks_fixtures/SuperadminDashboardV1MockFixtures';
import { SuperadminDashboardV1DataSchema } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_schemas/SuperadminDashboardV1Schema';



describe('Business Overview contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminDashboardV1DataSchema.safeParse(SUPERADMIN_DASHBOARD_BUSINESS_OVERVIEW_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
