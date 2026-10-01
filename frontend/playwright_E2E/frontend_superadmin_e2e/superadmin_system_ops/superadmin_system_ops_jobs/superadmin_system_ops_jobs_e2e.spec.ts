import { test, expect } from '@playwright/test';

test.describe('superadmin_system_ops_jobs critical flows', () => {
  test('filters job list and keeps table accessible', async ({ page }) => {
    await page.goto('/superadmin/system-ops/jobs');
    await expect(page.locator('table')).toBeVisible();
    const statusFilter = page.getByTestId('superadmin_system_ops_jobs-header-SearchableDropdown-50');
    await expect(statusFilter).toBeVisible();
    await statusFilter.click();
    await expect(page.locator('tbody')).toBeVisible();
  });
});
