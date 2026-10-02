import { expect, test } from '@playwright/test';

test.describe('superadmin_dashboard critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/superadmin/dashboard');
    await expect(page.getByTestId('superadmin_dashboard-superadmin-dashboard-main-page-ready')).toBeVisible();
  });

  test('exposes the date-range control', async ({ page }) => {
    await page.goto('/superadmin/dashboard');
    const surface = page.getByTestId('superadmin_dashboard-superadmin-dashboard-date-filter-dropdown-filter-dropdown-SearchableDropdown-20');
    await expect(surface).toBeVisible();
  });
});
