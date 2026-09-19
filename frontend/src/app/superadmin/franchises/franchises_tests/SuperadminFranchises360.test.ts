import { resetSuperadminFranchisesMockState } from '@/app/superadmin/franchises/franchises_mocks/handlers/SuperadminFranchisesMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { SuperadminFranchisesV1DataSchema } from '@/app/superadmin/franchises/franchises_types/SuperadminFranchisesV1Types';
import { SUPERADMIN_FRANCHISES_360_MOCK_FIXTURE } from '@/app/superadmin/franchises/franchises_mocks/fixtures/SuperadminFranchisesV1MockFixtures';
beforeEach(() => {
  resetSuperadminFranchisesMockState();
});

describe('Franchise 360 & Branch Comparison contract', () => {
    it('accepts the complete module fixture', () => {
        const result = SuperadminFranchisesV1DataSchema.safeParse(SUPERADMIN_FRANCHISES_360_MOCK_FIXTURE);
        expect(result.success).toBe(true);
    });
});
