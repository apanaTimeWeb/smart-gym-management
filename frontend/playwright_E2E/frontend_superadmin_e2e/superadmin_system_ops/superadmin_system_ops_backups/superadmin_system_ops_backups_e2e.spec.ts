import { test, expect } from '@playwright/test';

test.describe('superadmin_system_ops_backups critical flows', () => {
  test('opens backup trigger dialog and supports cancellation', async ({ page }) => {
    await page.goto('/superadmin/system-ops/backups');
    const trigger = page.getByRole('button', { name: /trigger backup|backup/i }).first();
    await expect(trigger).toBeVisible();
    await trigger.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: /cancel/i }).last().click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
});
