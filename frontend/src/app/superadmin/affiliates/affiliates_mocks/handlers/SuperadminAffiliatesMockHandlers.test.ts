import { beforeAll, afterAll, beforeEach, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { resetSuperadminAffiliatesMockState, superadminAffiliatesHandlers } from '@/app/superadmin/affiliates/affiliates_mocks/handlers/SuperadminAffiliatesMockHandlers';

const server = setupServer(...superadminAffiliatesHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => resetSuperadminAffiliatesMockState());

describe('Superadmin Affiliates MSW integration', () => {
  it('creates an affiliate and makes it visible in the next list query', async () => {
    const payload = { name: 'Integration Affiliate', email: 'integration@affiliate.test', referralCode: 'INT-001' };
    const createResponse = await fetch('http://localhost/superadmin/affiliates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'affiliate-create-1' },
      body: JSON.stringify(payload),
    });
    expect(createResponse.ok).toBe(true);
    const created = await createResponse.json();
    expect(created.data).toMatchObject(payload);

    const listResponse = await fetch('http://localhost/superadmin/affiliates?search=Integration%20Affiliate&page=1&limit=10');
    const listed = await listResponse.json();
    expect(listed.data).toHaveLength(1);
    expect(listed.data[0]).toMatchObject(payload);
  });
});
