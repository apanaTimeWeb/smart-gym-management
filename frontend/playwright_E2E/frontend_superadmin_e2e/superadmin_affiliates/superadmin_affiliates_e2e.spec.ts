import { test, expect } from '@playwright/test';

test.describe('superadmin_affiliates critical flows', () => {
  test('opens add affiliate flow and validates required fields', async ({ page }) => {
    await page.goto('/superadmin/affiliates');
    const add = page.getByRole('button', { name: /add affiliate/i });
    await expect(add).toBeVisible();
    await add.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByTestId('superadmin_affiliates-affiliates-affiliate-modal-action3').click();
    await expect(page.locator('[role="alert"]').first()).toBeVisible();
  });

  test('switches to payout history', async ({ page }) => {
    await page.goto('/superadmin/affiliates');
    await page.getByTestId('superadmin_affiliates-affiliates-affiliates-client-history').click();
    await expect(page.locator('table')).toBeVisible();
  });
});
