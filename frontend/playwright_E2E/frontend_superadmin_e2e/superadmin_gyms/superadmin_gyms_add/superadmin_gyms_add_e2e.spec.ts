import { expect, test } from '@playwright/test';

test.describe('superadmin_gyms_add critical frontend journey', () => {
  test('loads the canonical feature surface', async ({ page }) => {
    await page.goto('/superadmin/gyms/add');
    await expect(page.getByTestId('superadmin_gyms-superadmin-gyms-add-gym-form-add-gym-form-link')).toBeVisible();
  });

  test('exposes the add-gym submit control', async ({ page }) => {
    await page.goto('/superadmin/gyms/add');
    const surface = page.getByTestId('superadmin_gyms-superadmin-gyms-add-gym-form-add-gym-form-submit');
    await expect(surface).toBeVisible();
  });
});
