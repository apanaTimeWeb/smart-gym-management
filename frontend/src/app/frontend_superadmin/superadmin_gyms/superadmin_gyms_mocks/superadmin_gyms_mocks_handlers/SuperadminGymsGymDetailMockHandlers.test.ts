import { resetSuperadminGymsMockState } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_handlers/SuperadminGymsMockHandlers';
import { setupServer } from 'msw/node';
import { expect, beforeEach, beforeAll, afterAll, describe, it } from 'vitest';
import { superadminGymDetailHandlers } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_handlers/SuperadminGymsGymDetailMockHandlers';
import { SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_fixtures/SuperadminGymsGymDetailMockFixtures';

import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config';



const server = setupServer(...superadminGymDetailHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => resetSuperadminGymsMockState());

describe('Superadmin Gym 360 MSW integration', () => {
  it('serves a detail fixture for every list gym identity', async () => {
    const ids = Object.keys(SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES);
    expect(ids).toHaveLength(24);
    for (const gymId of ids) {
      const response = await fetch(`http://localhost${MODULE_URLS.GYM_DETAIL.BACKEND_API.BY_GYM(gymId)}`);
      expect(response.ok).toBe(true);
      const body = await response.json();
      expect(body.data.gymId).toBe(gymId);
    }
  });
});
