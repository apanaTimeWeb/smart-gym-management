import { setupServer } from 'msw/node';
import { expect, beforeEach, beforeAll, afterAll, describe, it } from 'vitest';
import { superadminGymsHandlers, resetSuperadminGymsMockState } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_handlers/SuperadminGymsMockHandlers';
import { SUPERADMIN_GYM_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_constants/SuperadminGymsConstants';
import { MOCK_GYMS, MOCK_GYM_STATS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_mocks/superadmin_gyms_mocks_fixtures/SuperadminGymsMockFixtures';

import { SUPERADMIN_GYMS_API } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config';



const server = setupServer(...superadminGymsHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => resetSuperadminGymsMockState());

describe('Superadmin Gyms MSW integration', () => {
  it('supports filter and pagination against the authoritative 24-record fixture', async () => {
    const response = await fetch(`http://localhost${SUPERADMIN_GYMS_API.BASE}?status=ACTIVE&page=1&limit=3&sortBy=memberCount&order=asc`);
    const body = await response.json();
    expect(response.ok).toBe(true);
    expect(body.meta.total).toBe(MOCK_GYM_STATS.active);
    expect(body.data).toHaveLength(3);
    expect(body.data.map((gym: { status: string }) => gym.status)).toEqual([SUPERADMIN_GYM_STATUS_CODES.ACTIVE, SUPERADMIN_GYM_STATUS_CODES.ACTIVE, SUPERADMIN_GYM_STATUS_CODES.ACTIVE]);
  });

  it('sorts by the populated lastActiveAt field and returns 404 for an unknown gym', async () => {
    const asc = await fetch(`http://localhost${SUPERADMIN_GYMS_API.BASE}?page=1&limit=2&sortBy=lastActiveAt&order=asc`);
    const ascBody = await asc.json();
    expect(asc.ok).toBe(true);
    expect(ascBody.data.map((gym: { id: string }) => gym.id)).toEqual(['t3', 't15']);

    const missing = await fetch(`http://localhost${SUPERADMIN_GYMS_API.BASE}/does-not-exist`);
    expect(missing.status).toBe(404);
  });

  it('mutates a selected gym status and exposes the changed row in the next query', async () => {
    const target = MOCK_GYMS.find((gym) => gym.status === SUPERADMIN_GYM_STATUS_CODES.ACTIVE)!;
    const update = await fetch(`/api/superadmin_gyms/${target.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': `gym-status-${target.id}-1` },
      body: JSON.stringify({ status: SUPERADMIN_GYM_STATUS_CODES.SUSPENDED }),
    });
    expect(update.ok).toBe(true);
    const updateBody = await update.json();
    expect(updateBody.data.status).toBe(SUPERADMIN_GYM_STATUS_CODES.SUSPENDED);

    const list = await fetch(`/api/gyms?search=${encodeURIComponent(target.id)}&page=1&limit=20`);
    const listBody = await list.json();
    const updatedGym = listBody.data.find((g: { id: string; status: string }) => g.id === target.id);
    expect(updatedGym.status).toBe(SUPERADMIN_GYM_STATUS_CODES.SUSPENDED);
  });
});
