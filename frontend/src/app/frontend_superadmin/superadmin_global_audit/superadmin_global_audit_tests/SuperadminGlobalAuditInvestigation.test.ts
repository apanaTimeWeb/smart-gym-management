import { describe, expect, it } from 'vitest';

import { SUPERADMIN_GLOBAL_AUDIT_INVESTIGATION_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_mocks/superadmin_global_audit_mocks_fixtures/SuperadminGlobalAuditV1MockFixtures';
import { SuperadminGlobalAuditV1DataSchema } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_schemas/SuperadminGlobalAuditV1ContractSchemas';


describe('Audit Investigation contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminGlobalAuditV1DataSchema.safeParse(SUPERADMIN_GLOBAL_AUDIT_INVESTIGATION_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
