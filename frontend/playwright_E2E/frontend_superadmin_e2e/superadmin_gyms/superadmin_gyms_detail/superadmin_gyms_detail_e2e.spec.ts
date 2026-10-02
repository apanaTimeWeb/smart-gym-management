import { expect, test } from '@playwright/test';

test.describe('superadmin_gyms_detail critical frontend journey', () => {
  test('loads the canonical feature surface', async ({ page }) => {
    await page.goto('/superadmin/gyms/tenant-001');
    await expect(page.getByTestId('superadmin_gyms-superadmin-gyms-gym-detail-main-page')).toBeVisible();
  });

  test('exposes the detail navigation control', async ({ page }) => {
    await page.goto('/superadmin/gyms/tenant-001');
    const surface = page.getByTestId('superadmin_gyms-superadmin-gyms-gym-detail-main-main-back-to-gyms');
    await expect(surface).toBeVisible();
  });
});
