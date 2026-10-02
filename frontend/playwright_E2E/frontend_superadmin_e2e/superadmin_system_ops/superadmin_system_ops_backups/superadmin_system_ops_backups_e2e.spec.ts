import { expect, test } from '@playwright/test';

test.describe('superadmin_system_ops_backups critical frontend journey', () => {
  test('loads the canonical feature surface', async ({ page }) => {
    await page.goto('/superadmin/system-ops/backups');
    await expect(page.getByTestId('superadmin_system_ops_backups-superadmin-system-ops-backups-main-page')).toBeVisible();
  });

  test('exposes the backup search control', async ({ page }) => {
    await page.goto('/superadmin/system-ops/backups');
    const surface = page.getByTestId('superadmin_system_ops_backups-superadmin-system-ops-backups-main-superadmin_system_ops_backups-main-search');
    await expect(surface).toBeVisible();
  });
});
