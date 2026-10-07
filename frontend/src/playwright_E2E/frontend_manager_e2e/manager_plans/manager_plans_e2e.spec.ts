import { test, expect } from '@playwright/test';

test.describe('manager_plans critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_plans');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_plans(?:\\?.*)?$'));
    const search = page.getByTestId('manager_plans-manager-plans-main-input-text');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Plan');
    await expect(search).toHaveValue('ZZZ-No-Such-Plan');
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_plans(?:\\?.*)?$'));
  });
});

test('submits a plan change request and shows success feedback', async ({ page }) => {
  await page.goto('/frontend_manager/manager_plans');
  await page.getByTestId('manager_plans-manager-plans-main-button-action').first().click();
  await page.getByTestId('manager_plans-manager-plans-main-textarea-message-input').fill('E2E plan change request');
  await page.getByTestId('manager_plans-manager-plans-main-button-submit').click();
  await expect(page.locator('[data-testid="ui-toast-status"], [data-sonner-toast="true"]').first()).toBeVisible({ timeout: 10000 });
});
