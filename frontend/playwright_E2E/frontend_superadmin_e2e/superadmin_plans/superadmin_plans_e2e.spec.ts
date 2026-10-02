import { expect, test } from '@playwright/test';

test.describe('superadmin_plans critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/superadmin/saas-billing/plans');
    await expect(page.getByTestId('superadmin_plans-superadmin-plans-main-page')).toBeVisible();
  });

  test('exposes the module interaction contract', async ({ page }) => {
    await page.goto('/superadmin/saas-billing/plans');
    const control = page.getByTestId('superadmin_plans-superadmin-plans-main-main-create-new-plan');
    await expect(control).toBeVisible();
    await expect(control).toBeEnabled();
  });
});
