import { resetSuperadminCancellationsMockState } from '@/app/superadmin/cancellations/cancellations_mocks/handlers/SuperadminCancellationsMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { MOCK_SUPERADMIN_CANCELLATIONS } from '@/app/superadmin/cancellations/cancellations_mocks/fixtures/SuperadminCancellationsMockFixtures';

beforeEach(() => {
  resetSuperadminCancellationsMockState();
});

describe('Superadmin Cancellations module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(MOCK_SUPERADMIN_CANCELLATIONS).toBeDefined();
    const serialized = JSON.stringify(MOCK_SUPERADMIN_CANCELLATIONS);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
