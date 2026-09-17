import { describe, expect, it } from 'vitest';
import { SuperadminReportsV1DataSchema } from '@/app/superadmin/reports/reports_types/SuperadminReportsV1Types';
import { SUPERADMIN_REPORTS_COMPARISON_MOCK_FIXTURE } from '@/app/superadmin/reports/reports_mocks/fixtures/SuperadminReportsV1MockFixtures';
describe('Report Comparison contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminReportsV1DataSchema.safeParse(SUPERADMIN_REPORTS_COMPARISON_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
