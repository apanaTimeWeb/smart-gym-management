import { test, expect } from '@playwright/test';

test.describe('Admin Usage upgrade request', () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([{
      name: 'gymsmart_user',
      value: encodeURIComponent(JSON.stringify({ name: 'Demo Admin', email: 'admin@gymsmart.com', role: 'ADMIN', tenantId: 'tenant_001' })),
      url: 'http://localhost:3000',
    }]);
  });

  test('submits an upgrade request through the Admin mock workflow', async ({ page }) => {
    await page.goto('/admin/usage');
    await expect(page.getByText('Subscription Plans')).toBeVisible();
    const upgradeButton = page.getByRole('button', { name: 'Upgrade' }).first();
    await upgradeButton.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: 'Send Request' }).click();
    await expect(page.getByText(/Upgrade request .* sent to Superadmin\./)).toBeVisible();
  });
});
