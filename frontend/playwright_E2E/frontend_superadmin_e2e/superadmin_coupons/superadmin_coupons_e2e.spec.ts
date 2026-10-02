import { expect, test } from '@playwright/test';

test.describe('superadmin_coupons critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/superadmin/saas-billing/coupons');
    await expect(page.getByTestId('superadmin_coupons-superadmin-coupons-main-page-ready')).toBeVisible();
  });

  test('exposes the coupon creation surface', async ({ page }) => {
    await page.goto('/superadmin/saas-billing/coupons');
    const surface = page.getByTestId('superadmin_coupons-main-create-coupon-modal');
    await expect(surface).toBeVisible();
  });
});
