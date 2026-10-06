import {describe, expect, it, beforeEach} from 'vitest';

import { MOCK_GYMS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_fixtures/SuperadminGymsMockFixtures';
import { resetSuperadminGymsMockState } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_handlers/SuperadminGymsMockHandlers';



beforeEach(() => {
  resetSuperadminGymsMockState();
});

describe('Superadmin Gyms module fixture contract', () => {
  it('provides the minimum fixture contract required by the module data flow', () => {
    expect(MOCK_GYMS).toHaveLength(24);
    expect(MOCK_GYMS.every((gym) => Boolean(gym.id && gym.name && gym.adminEmail && gym.plan && gym.status))).toBe(true);
    expect(new Set(MOCK_GYMS.map((gym) => gym.id)).size).toBe(MOCK_GYMS.length);
  });

});
