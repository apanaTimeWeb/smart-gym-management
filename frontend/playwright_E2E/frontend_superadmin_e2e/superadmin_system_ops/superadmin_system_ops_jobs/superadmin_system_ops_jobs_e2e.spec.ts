import { expect, test } from '@playwright/test';

test.describe('superadmin_system_ops_jobs critical frontend journey', () => {
  test('loads the canonical feature surface', async ({ page }) => {
    await page.goto('/superadmin/system-ops/jobs');
    await expect(page.getByTestId('superadmin_system_ops_jobs-superadmin-system-ops-jobs-main-page')).toBeVisible();
  });

  test('exposes the job status filter', async ({ page }) => {
    await page.goto('/superadmin/system-ops/jobs');
    const surface = page.getByTestId('superadmin_system_ops_jobs-superadmin-system-ops-jobs-header-superadmin_system_ops_jobs-header-SearchableDropdown-50');
    await expect(surface).toBeVisible();
  });
});
