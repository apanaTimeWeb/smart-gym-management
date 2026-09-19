import { beforeAll, afterAll, beforeEach, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { resetSuperadminBroadcastsMockState, superadminBroadcastsHandlers } from '@/app/superadmin/broadcasts/broadcasts_mocks/handlers/SuperadminBroadcastsMockHandlers';
import { MOCK_SUPERADMIN_BROADCASTS } from '@/app/superadmin/broadcasts/broadcasts_mocks/fixtures/SuperadminBroadcastsMockFixtures';

const server = setupServer(...superadminBroadcastsHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => resetSuperadminBroadcastsMockState());

describe('Superadmin Broadcasts MSW integration', () => {
  it('treats a new successful edit as a new user intent while preserving retry idempotency', async () => {
    const id = MOCK_SUPERADMIN_BROADCASTS[0]!.id;
    const firstKey = 'broadcast-edit-intent-1';
    const secondKey = 'broadcast-edit-intent-2';
    const first = await fetch(`http://localhost/superadmin/broadcasts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': firstKey },
      body: JSON.stringify({ title: 'Title X' }),
    });
    const firstBody = await first.json();
    expect(first.ok).toBe(true);
    expect(firstBody.data.title).toBe('Title X');

    const retry = await fetch(`http://localhost/superadmin/broadcasts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': firstKey },
      body: JSON.stringify({ title: 'Ignored Retry Payload' }),
    });
    const retryBody = await retry.json();
    expect(retry.ok).toBe(true);
    expect(retryBody.data.title).toBe('Title X');

    const second = await fetch(`http://localhost/superadmin/broadcasts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': secondKey },
      body: JSON.stringify({ title: 'Title Y' }),
    });
    const secondBody = await second.json();
    expect(second.ok).toBe(true);
    expect(secondBody.data.title).toBe('Title Y');
  });
});
