import { resetSuperadminSystemMockState } from '@/app/superadmin/system/system_mocks/handlers/SuperadminSystemMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { MOCK_SYSTEM_TENANTS } from '@/app/superadmin/system/system_mocks/fixtures/SuperadminSystemMockFixtures';

beforeEach(() => {
  resetSuperadminSystemMockState();
});

describe('Superadmin System module fixture contract', () => {
  it('exposes non-empty module-owned demo data for frontend flows', () => {
    expect(MOCK_SYSTEM_TENANTS).toBeDefined();
    const serialized = JSON.stringify(MOCK_SYSTEM_TENANTS);
    expect(serialized.length).toBeGreaterThan(20);
    expect(serialized).not.toMatch(/\b(TBD|TODO|lorem ipsum|placeholder)\b/i);
  });

});
