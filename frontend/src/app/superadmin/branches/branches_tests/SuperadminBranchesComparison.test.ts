import { resetSuperadminBranchesMockState } from '@/app/superadmin/branches/branches_mocks/handlers/SuperadminBranchesMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { SuperadminBranchesV1DataSchema } from '@/app/superadmin/branches/branches_types/SuperadminBranchesV1Types';
import { SUPERADMIN_BRANCHES_COMPARISON_MOCK_FIXTURE } from '@/app/superadmin/branches/branches_mocks/fixtures/SuperadminBranchesV1MockFixtures';
beforeEach(() => {
  resetSuperadminBranchesMockState();
});

describe('Branch Performance Comparison contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminBranchesV1DataSchema.safeParse(SUPERADMIN_BRANCHES_COMPARISON_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
