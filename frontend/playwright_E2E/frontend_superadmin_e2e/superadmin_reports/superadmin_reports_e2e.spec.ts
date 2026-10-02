import { expect, test } from '@playwright/test';

test.describe('superadmin_reports critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/superadmin/reports');
    await expect(page.getByTestId('superadmin_reports-superadmin-reports-main-page-ready')).toBeVisible();
  });

  test('exposes the module interaction contract', async ({ page }) => {
    await page.goto('/superadmin/reports');
    const control = page.getByTestId('superadmin_reports-superadmin-reports-main-superadmin-reports-main-retry');
    await expect(control).toBeVisible();
    await expect(control).toBeEnabled();
  });
});
