import { beforeAll, afterAll, beforeEach, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { resetSuperadminGymsMockState } from '@/app/superadmin/gyms/gyms_mocks/handlers/SuperadminGymsMockHandlers';
import { superadminGymDetailHandlers } from '@/app/superadmin/gyms/gyms_mocks/handlers/SuperadminGymDetailMockHandlers';
import { SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES } from '@/app/superadmin/gyms/gyms_mocks/fixtures/SuperadminGymDetailMockFixtures';

const server = setupServer(...superadminGymDetailHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => resetSuperadminGymsMockState());

describe('Superadmin Gym 360 MSW integration', () => {
  it('serves a detail fixture for every list gym identity', async () => {
    const ids = Object.keys(SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES);
    expect(ids).toHaveLength(24);
    for (const gymId of ids) {
      const response = await fetch(`http://localhost/api/superadmin/gym-detail/business-overview?gymId=${gymId}`);
      expect(response.ok).toBe(true);
      const body = await response.json();
      expect(body.data.gymId).toBe(gymId);
    }
  });
});
