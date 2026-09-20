import { describe, expect, it } from 'vitest';
import { SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE } from '@/app/superadmin/system-ops/system-ops_mocks/fixtures/SuperadminSystemOpsMockFixtures';
import { SuperadminSystemOpsSummarySchema } from '@/app/superadmin/system-ops/system-ops_types/SuperadminSystemOpsTypes';

describe('Superadmin System Ops summary contract', () => {
  it('accepts the complete module-owned summary fixture', () => {
    const result = SuperadminSystemOpsSummarySchema.safeParse(SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE);
    expect(result.success).toBe(true);
  });
});
