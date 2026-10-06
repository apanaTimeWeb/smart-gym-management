import { setupServer } from 'msw/node';
import { expect, beforeEach, beforeAll, afterAll, describe, it } from 'vitest';
import { resetSuperadminAffiliatesMockState, superadminAffiliatesHandlers } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_mocks/superadmin_affiliates_mocks_handlers/SuperadminAffiliatesMockHandlers';

import { SUPERADMIN_AFFILIATES_API } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_url_config';



const server = setupServer(...superadminAffiliatesHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => resetSuperadminAffiliatesMockState());

describe('Superadmin Affiliates MSW integration', () => {
  it('creates an affiliate and makes it visible in the next list query', async () => {
    const payload = { name: 'Integration Affiliate', email: 'integration@affiliate.test', referralCode: 'INT001' };
    const createResponse = await fetch(`http://localhost${SUPERADMIN_AFFILIATES_API.BASE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'affiliate-create-1' },
      body: JSON.stringify(payload),
    });
    expect(createResponse.ok).toBe(true);
    const created = await createResponse.json();
    expect(created.data).toMatchObject(payload);

    const listResponse = await fetch(`http://localhost${SUPERADMIN_AFFILIATES_API.BASE}?search=Integration%20Affiliate&page=1&limit=10`);
    const listed = await listResponse.json();
    expect(listed.data).toHaveLength(1);
    expect(listed.data[0]).toMatchObject(payload);
  });
});
