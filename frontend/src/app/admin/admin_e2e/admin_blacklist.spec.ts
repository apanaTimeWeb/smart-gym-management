import { test, expect } from '@playwright/test';

test.describe('Admin Blacklist destructive confirmation', () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([{
      name: 'gymsmart_user',
      value: encodeURIComponent(JSON.stringify({ name: 'Demo Admin', email: 'admin@gymsmart.com', role: 'ADMIN', tenantId: 'tenant_001' })),
      url: 'http://localhost:3000',
    }]);
  });

  test('requires typed confirmation before toggling blacklist state', async ({ page }) => {
    await page.goto('/admin/blacklist');
    const toggle = page.getByRole('button', { name: 'Toggle blacklist' }).first();
    await toggle.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    const confirmButton = dialog.getByRole('button', { name: /Remove|Confirm|Revoke|Toggle/i }).last();
    await expect(confirmButton).toBeDisabled();
    await dialog.getByLabel(/Type CONFIRM to confirm/i).fill('CONFIRM');
    await expect(confirmButton).toBeEnabled();
    await dialog.getByRole('button', { name: /Remove|Confirm|Revoke|Toggle/i }).last().click();
    await expect(dialog).toBeHidden();
  });
});
