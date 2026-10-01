import { describe, expect, it } from 'vitest';

import { SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_mocks/superadmin_system_ops_mocks_fixtures/SuperadminSystemOpsMockFixtures';
import { SuperadminSystemOpsSummarySchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_schemas/SuperadminSystemOpsTypesSchemas';

describe('Superadmin System Ops summary contract', () => {
  it('accepts the complete module-owned summary fixture', () => {
    const result = SuperadminSystemOpsSummarySchema.safeParse(SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE);
    expect(result.success).toBe(true);
  });
});
