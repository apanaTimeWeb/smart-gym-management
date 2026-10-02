import { expect, test } from '@playwright/test';

test.describe('superadmin_affiliates critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/superadmin/affiliates');
    await expect(page.getByTestId('superadmin_affiliates-superadmin-affiliates-main-page')).toBeVisible();
  });

  test('exposes the module interaction contract', async ({ page }) => {
    await page.goto('/superadmin/affiliates');
    const control = page.getByTestId('superadmin_affiliates-superadmin-affiliates-main-affiliates-affiliates-client-control');
    await expect(control).toBeVisible();
    await expect(control).toBeEnabled();
  });
});
