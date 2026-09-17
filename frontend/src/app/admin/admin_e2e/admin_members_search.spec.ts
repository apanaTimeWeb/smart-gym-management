import { test, expect } from '@playwright/test';

test.describe('Admin global member search', () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([{
      name: 'gymsmart_user',
      value: encodeURIComponent(JSON.stringify({ name: 'Demo Admin', email: 'admin@gymsmart.com', role: 'ADMIN', tenantId: 'tenant_001' })),
      url: 'http://localhost:3000',
    }]);
  });

  test('keeps the selected member id in the destination URL', async ({ page }) => {
    await page.goto('/admin/members');
    const search = page.getByLabel('Search members globally');
    await search.fill('Rahul');
    const result = page.getByRole('link', { name: /Rahul/ }).first();
    await result.click();
    await expect(page).toHaveURL(/\/admin\/members\/.*|[?&]memberId=/);
  });
});
