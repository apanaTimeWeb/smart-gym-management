import { expect, test } from '@playwright/test';

test.describe('superadmin_gyms critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/superadmin/gyms');
    await expect(page.getByTestId('superadmin_gyms-superadmin-gyms-main-page')).toBeVisible();
  });

  test('exposes the module interaction contract', async ({ page }) => {
    await page.goto('/superadmin/gyms');
    const control = page.getByTestId('superadmin_gyms-superadmin-gyms-main-main-onboard-new-gym');
    await expect(control).toBeVisible();
    await expect(control).toBeEnabled();
  });
});
