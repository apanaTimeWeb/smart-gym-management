import { expect, test } from '@playwright/test';

test.describe('superadmin_tickets critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/superadmin/tickets');
    await expect(page.getByTestId('superadmin_tickets-superadmin-tickets-main-page-ready')).toBeVisible();
  });

  test('exposes the module interaction contract', async ({ page }) => {
    await page.goto('/superadmin/tickets');
    const control = page.getByTestId('superadmin_tickets-superadmin-tickets-main-superadmin-tickets-main-pagination');
    await expect(control).toBeVisible();
    await expect(control).toBeEnabled();
  });
});
