import { test, expect } from '@playwright/test';

test.describe('manager_store critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_store');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_store(?:\\?.*)?$'));
    const search = page.getByTestId('manager_store-manager-store-toolbar-input-value');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Product');
    await expect(search).toHaveValue('ZZZ-No-Such-Product');
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_store(?:\\?.*)?$'));
  });
});

test('creates a store product and shows success feedback', async ({ page }) => {
  await page.goto('/frontend_manager/manager_store');
  await page.getByTestId('manager_store-manager-store-toolbar-add-product').click();
  await page.getByTestId('manager_store-store-managerstoreproductmodal-input-primary-0').fill('E2E Protein Product');
  await page.getByTestId('manager_store-store-managerstoreproductmodal-input-primary-2').fill('999');
  await page.getByTestId('manager_store-store-managerstoreproductmodal-input-primary-3').fill('10');
  await page.getByTestId('manager_store-manager-store-product-modal-button-submit').click();
  await expect(page.getByTestId('ui-toast-status')).toBeVisible();
});
