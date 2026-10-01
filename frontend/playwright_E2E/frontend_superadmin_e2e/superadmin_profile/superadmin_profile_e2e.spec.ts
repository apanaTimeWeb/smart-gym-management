import { test, expect } from '@playwright/test';

test.describe('superadmin_profile critical flows', () => {
  test('opens security settings and exposes password controls', async ({ page }) => {
    await page.goto('/superadmin/profile');
    await page.getByRole('button', { name: /security|password/i }).first().click();
    await expect(page.locator('input[type="password"]').first()).toBeVisible();
    await expect(page.locator('button[aria-label*="password" i]').first()).toBeVisible();
  });
});
