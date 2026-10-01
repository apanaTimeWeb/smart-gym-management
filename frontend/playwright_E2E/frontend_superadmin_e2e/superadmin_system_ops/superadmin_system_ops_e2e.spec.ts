import { test, expect } from '@playwright/test';

test.describe('superadmin_system_ops critical flows', () => {
  test('routes from system-ops summary into infrastructure', async ({ page }) => {
    await page.goto('/superadmin/system-ops');
    const infrastructure = page.getByTestId(/superadmin_system_ops-system-ops-dashboard-client-infrastructure-open/i);
    await expect(infrastructure).toBeVisible();
    await infrastructure.click();
    await expect(page).toHaveURL(/\/superadmin\/system-ops\/infrastructure$/);
  });
});
