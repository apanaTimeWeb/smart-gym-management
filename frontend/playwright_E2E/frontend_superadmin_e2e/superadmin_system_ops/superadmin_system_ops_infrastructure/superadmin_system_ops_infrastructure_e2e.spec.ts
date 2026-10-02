import { expect, test } from '@playwright/test';

test.describe('superadmin_system_ops_infrastructure critical frontend journey', () => {
  test('loads the canonical feature surface', async ({ page }) => {
    await page.goto('/superadmin/system-ops/infrastructure');
    await expect(page.getByTestId('superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-main-page')).toBeVisible();
  });

  test('exposes the infrastructure status filter', async ({ page }) => {
    await page.goto('/superadmin/system-ops/infrastructure');
    const surface = page.getByTestId('superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-header-superadmin_system_ops_infrastructure-header-SearchableDropdown-31');
    await expect(surface).toBeVisible();
  });
});
