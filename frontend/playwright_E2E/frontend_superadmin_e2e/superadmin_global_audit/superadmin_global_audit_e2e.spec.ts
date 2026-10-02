import { expect, test } from '@playwright/test';

test.describe('superadmin_global_audit critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/superadmin/global-audit');
    await expect(page.getByTestId('superadmin_global_audit-superadmin-global-audit-main-page-ready')).toBeVisible();
  });

  test('exposes the module interaction contract', async ({ page }) => {
    await page.goto('/superadmin/global-audit');
    const control = page.getByTestId('superadmin_global_audit-superadmin-global-audit-main-main-search-audit-logs');
    await expect(control).toBeVisible();
    await expect(control).toBeEnabled();
  });
});
