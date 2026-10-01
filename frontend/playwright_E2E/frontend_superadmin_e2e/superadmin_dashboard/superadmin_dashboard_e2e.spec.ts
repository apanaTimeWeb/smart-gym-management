import { test, expect } from '@playwright/test';

test.describe('superadmin_dashboard critical flows', () => {
  test('loads dashboard and exposes date-range controls', async ({ page }) => {
    await page.goto('/superadmin/dashboard');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-testid^="superadmin_dashboard-"]').first()).toBeVisible();
  });

  test('custom date range produces visible date inputs', async ({ page }) => {
    await page.goto('/superadmin/dashboard');
    const dateControl = page.getByRole('button', { name: /custom|date range/i }).first();
    await expect(dateControl).toBeVisible();
    await dateControl.click();
    await expect(page.locator('input[type="date"]').first()).toBeVisible();
  });
});
