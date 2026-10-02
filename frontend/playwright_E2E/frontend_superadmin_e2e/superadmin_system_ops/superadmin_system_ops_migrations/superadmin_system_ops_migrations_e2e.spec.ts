import { expect, test } from '@playwright/test';

test.describe('superadmin_system_ops_migrations critical frontend journey', () => {
  test('loads the canonical feature surface', async ({ page }) => {
    await page.goto('/superadmin/system-ops/migrations');
    await expect(page.getByTestId('superadmin_system_ops_migrations-superadmin-system-ops-migrations-main-page')).toBeVisible();
  });

  test('exposes the migration feature surface', async ({ page }) => {
    await page.goto('/superadmin/system-ops/migrations');
    const surface = page.getByTestId('superadmin_system_ops_migrations-superadmin-system-ops-migrations-main-page');
    await expect(surface).toBeVisible();
  });
});
