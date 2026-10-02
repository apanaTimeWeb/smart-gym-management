import { expect, test } from '@playwright/test';

test.describe('superadmin_analytics critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/superadmin/analytics');
    await expect(page.getByTestId('superadmin_analytics-superadmin-analytics-main-page')).toBeVisible();
  });

  test('exposes the date-range control', async ({ page }) => {
    await page.goto('/superadmin/analytics');
    const surface = page.getByTestId('superadmin_analytics-superadmin-analytics-date-filter-dropdown-filter-dropdown-SearchableDropdown-59');
    await expect(surface).toBeVisible();
  });
});
