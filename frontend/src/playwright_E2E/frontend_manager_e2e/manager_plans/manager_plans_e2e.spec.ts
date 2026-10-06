import { test, expect } from '@playwright/test';

test.describe('manager_plans critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/manager/plans');
    await expect(page).toHaveURL(new RegExp('/manager/plans(?:\?.*)?$'));
    const search = page.getByTestId('manager_plans-manager-plans-main-input-text');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Plan');
    await expect(page.getByText('No plans available')).toBeVisible();
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/manager/plans(?:\?.*)?$'));
  });
});

test('submits a plan change request and shows success feedback', async ({ page }) => {
  await page.goto('/manager/plans');
  await page.getByTestId('manager_plans-manager-plans-main-button-action').first().click();
  await page.getByTestId('manager_plans-manager-plans-main-textarea-message-input').fill('E2E plan change request');
  await page.getByTestId('manager_plans-manager-plans-main-button-submit').click();
  await expect(page.getByTestId('ui-toast-status')).toBeVisible();
});
