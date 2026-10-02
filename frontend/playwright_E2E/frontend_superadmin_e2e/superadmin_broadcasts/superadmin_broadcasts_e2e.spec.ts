import { expect, test } from '@playwright/test';

test.describe('superadmin_broadcasts critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/superadmin/broadcasts');
    await expect(page.getByTestId('superadmin_broadcasts-superadmin-broadcasts-main-page')).toBeVisible();
  });

  test('exposes the module interaction contract', async ({ page }) => {
    await page.goto('/superadmin/broadcasts');
    const control = page.getByTestId('superadmin_broadcasts-superadmin-broadcasts-main-superadmin-broadcasts-main-pagination');
    await expect(control).toBeVisible();
    await expect(control).toBeEnabled();
  });
});
