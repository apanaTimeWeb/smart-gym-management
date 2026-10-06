import { test, expect } from '@playwright/test';

test.describe('manager_expenses critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_expenses');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_expenses(?:\\?.*)?$'));
    const search = page.getByTestId('manager_expenses-manager-expenses-toolbar-input-text');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Expense');
    await expect(search).toHaveValue('ZZZ-No-Such-Expense');
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_expenses(?:\\?.*)?$'));
  });
});

test('creates an expense and confirms the save workflow', async ({ page }) => {
  await page.goto('/frontend_manager/manager_expenses');
  await page.getByTestId('manager_expenses-manager-expenses-toolbar-add').click();
  await page.getByTestId('manager_expenses-manager-expenses-modal-input-text-1').fill('E2E Test Expense');
  await page.getByTestId('manager_expenses-manager-expenses-modal-input-number').fill('1250');
  await page.getByTestId('manager_expenses-manager-expenses-modal-button-submit').click();
  const confirm = page.getByRole('dialog').getByRole('button', { name: /confirm|save/i }).last();
  await expect(confirm).toBeVisible();
  await confirm.click();
  await expect(page.getByTestId('ui-toast-status')).toBeVisible({ timeout: 10000 });
});
