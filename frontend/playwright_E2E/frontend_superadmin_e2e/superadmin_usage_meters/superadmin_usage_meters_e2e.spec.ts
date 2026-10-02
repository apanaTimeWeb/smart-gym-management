import { expect, test } from '@playwright/test';

test.describe('superadmin_usage_meters critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/superadmin/usage-meters');
    await expect(page.getByTestId('superadmin_usage_meters-superadmin-usage-meters-main-page-ready')).toBeVisible();
  });

  test('exposes the date-range control', async ({ page }) => {
    await page.goto('/superadmin/usage-meters');
    const surface = page.getByTestId('superadmin_usage_meters-superadmin-usage-meters-main-date-range');
    await expect(surface).toBeVisible();
  });
});
