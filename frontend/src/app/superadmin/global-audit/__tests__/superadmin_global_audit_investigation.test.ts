import { describe, expect, it } from 'vitest';
import { SuperadminGlobalAuditV1DataSchema } from '@/app/superadmin/global-audit/global-audit_types/SuperadminGlobalAuditV1Types';
import { SUPERADMIN_GLOBAL_AUDIT_INVESTIGATION_MOCK_FIXTURE } from '@/app/superadmin/global-audit/global-audit_mocks/fixtures/SuperadminGlobalAuditV1MockFixtures';
describe('Audit Investigation contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminGlobalAuditV1DataSchema.safeParse(SUPERADMIN_GLOBAL_AUDIT_INVESTIGATION_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
