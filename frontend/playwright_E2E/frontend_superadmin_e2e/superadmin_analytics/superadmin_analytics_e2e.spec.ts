import { test, expect } from '@playwright/test';

test.describe('superadmin_analytics critical flows', () => {
  test('loads analytics and renders an async state container', async ({ page }) => {
    await page.goto('/superadmin/analytics');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-testid^="superadmin_analytics-"]').first()).toBeVisible();
  });
});
