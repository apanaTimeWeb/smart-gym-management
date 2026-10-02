import { expect, test } from '@playwright/test';

test.describe('superadmin_settings critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/superadmin/settings');
    await expect(page.getByTestId('superadmin_settings-superadmin-settings-main-page')).toBeVisible();
  });

  test('exposes the settings editor control', async ({ page }) => {
    await page.goto('/superadmin/settings');
    const surface = page.getByTestId('superadmin_settings-superadmin-settings-main-superadmin-settings-main-input');
    await expect(surface).toBeVisible();
  });
});
