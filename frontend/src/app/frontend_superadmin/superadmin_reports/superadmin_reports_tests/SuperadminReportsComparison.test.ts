import { describe, expect, it } from 'vitest';

import { SUPERADMIN_REPORTS_COMPARISON_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_mocks/superadmin_reports_mocks_fixtures/SuperadminReportsV1MockFixtures';
import { SuperadminReportsV1DataSchema } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_schemas/SuperadminReportsV1ContractSchemas';


describe('Report Comparison contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminReportsV1DataSchema.safeParse(SUPERADMIN_REPORTS_COMPARISON_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
