import { expect, test } from '@playwright/test';

test.describe('superadmin_invoices critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/superadmin/saas-billing/invoices');
    await expect(page.getByTestId('superadmin_invoices-superadmin-invoices-main-page-ready')).toBeVisible();
  });

  test('exposes the module interaction contract', async ({ page }) => {
    await page.goto('/superadmin/saas-billing/invoices');
    const control = page.getByTestId('superadmin_invoices-superadmin-invoices-main-invoices-main-all-invoices');
    await expect(control).toBeVisible();
    await expect(control).toBeEnabled();
  });
});
