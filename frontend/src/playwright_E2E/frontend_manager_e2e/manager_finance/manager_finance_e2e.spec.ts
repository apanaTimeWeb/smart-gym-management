import { test, expect } from '@playwright/test';

test.describe('manager_finance critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_finance');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_finance(?:\?.*)?$'));
    const search = page.getByTestId('manager_finance-manager-finance-main-input-text');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Payment');
    await expect(page.getByText('No payments found')).toBeVisible();
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_finance(?:\?.*)?$'));
  });
});
