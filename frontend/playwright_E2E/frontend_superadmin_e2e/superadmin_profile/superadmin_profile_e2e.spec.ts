import { expect, test } from '@playwright/test';

test.describe('superadmin_profile critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/superadmin/profile');
    await expect(page.getByTestId('superadmin_profile-superadmin-profile-main-page-ready')).toBeVisible();
  });

  test('exposes the data export action', async ({ page }) => {
    await page.goto('/superadmin/profile');
    const surface = page.getByTestId('superadmin_profile-superadmin-profile-data-export-card-superadmin_profile-data-export-request');
    await expect(surface).toBeVisible();
  });
});
