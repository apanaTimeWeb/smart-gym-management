import { test, expect } from '@playwright/test';

test.describe('manager_sales critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_sales');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_sales(?:\\?.*)?$'));
    const search = page.getByTestId('manager_sales-manager-sales-toolbar-input-value');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Member');
    await expect(search).toHaveValue('ZZZ-No-Such-Member');
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_sales(?:\\?.*)?$'));
  });
});
