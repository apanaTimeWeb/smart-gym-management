import { beforeAll, afterAll, beforeEach, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { resetSuperadminGymsMockState, superadminGymsHandlers } from '@/app/superadmin/gyms/gyms_mocks/handlers/SuperadminGymsMockHandlers';
import { MOCK_GYMS, MOCK_GYM_STATS } from '@/app/superadmin/gyms/gyms_mocks/fixtures/SuperadminGymsMockFixtures';

const server = setupServer(...superadminGymsHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => resetSuperadminGymsMockState());

describe('Superadmin Gyms MSW integration', () => {
  it('supports filter and pagination against the authoritative 24-record fixture', async () => {
    const response = await fetch('/api/gyms?status=ACTIVE&page=1&limit=3&sortBy=memberCount&order=asc');
    const body = await response.json();
    expect(response.ok).toBe(true);
    expect(body.meta.total).toBe(MOCK_GYM_STATS.active);
    expect(body.data).toHaveLength(3);
    expect(body.data.map((gym: { status: string }) => gym.status)).toEqual(['ACTIVE', 'ACTIVE', 'ACTIVE']);
  });

  it('sorts by the populated lastActiveAt field and returns 404 for an unknown gym', async () => {
    const asc = await fetch('/api/gyms?page=1&limit=2&sortBy=lastActiveAt&order=asc');
    const ascBody = await asc.json();
    expect(asc.ok).toBe(true);
    expect(ascBody.data.map((gym: { id: string }) => gym.id)).toEqual(['t3', 't15']);

    const missing = await fetch('/api/gyms/does-not-exist');
    expect(missing.status).toBe(404);
  });

  it('mutates a selected gym status and exposes the changed row in the next query', async () => {
    const target = MOCK_GYMS.find((gym) => gym.status === 'ACTIVE')!;
    const update = await fetch(`/api/gyms/${target.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': `gym-status-${target.id}-1` },
      body: JSON.stringify({ status: 'SUSPENDED' }),
    });
    expect(update.ok).toBe(true);
    const updateBody = await update.json();
    expect(updateBody.data.status).toBe('SUSPENDED');

    const list = await fetch(`/api/gyms?search=${encodeURIComponent(target.id)}&page=1&limit=20`);
    const listBody = await list.json();
    const updatedGym = listBody.data.find((g: any) => g.id === target.id);
    expect(updatedGym.status).toBe('SUSPENDED');
  });
});
