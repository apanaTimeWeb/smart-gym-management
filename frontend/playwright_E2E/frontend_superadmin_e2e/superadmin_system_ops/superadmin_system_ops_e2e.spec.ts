import { expect, test } from '@playwright/test';

test.describe('superadmin_system_ops critical frontend journey', () => {
  test('renders the route-owned feature surface', async ({ page }) => {
    await page.goto('/superadmin/system-ops');
    await expect(page.getByTestId('superadmin_system_ops-superadmin-system-ops-main-page')).toBeVisible();
  });

  test('exposes the system-operations feature navigation', async ({ page }) => {
    await page.goto('/superadmin/system-ops');
    const surface = page.getByTestId('superadmin_system_ops-system-ops-dashboard-client-gyms-open');
    await expect(surface).toBeVisible();
  });
});
