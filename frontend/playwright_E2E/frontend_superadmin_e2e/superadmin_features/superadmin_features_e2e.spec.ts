import { expect, test } from '@playwright/test';

test.describe('superadmin_features critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/superadmin/features');
    await expect(page.getByTestId('superadmin_features-superadmin-features-main-superadmin_features-main-loading')).toBeVisible();
  });

  test('exposes the module interaction surface', async ({ page }) => {
    await page.goto('/superadmin/features');
    const surface = page.getByTestId('superadmin_features-superadmin-features-header-interactive-1');
    await expect(surface).toBeVisible();
  });
});
