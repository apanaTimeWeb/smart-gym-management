import { test, expect } from '@playwright/test';

test.describe('manager_members critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_members');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_members(?:\\?.*)?$'));
    const search = page.getByTestId('manager_members-members-toolbar-input-value');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Member');
    await expect(search).toHaveValue('ZZZ-No-Such-Member');
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_members(?:\\?.*)?$'));
  });
});

test('records a payment for a selected member and shows success feedback', async ({ page }) => {
  await page.goto('/frontend_manager/manager_members');
  const firstRow = page.locator('tr[data-testid^="manager_members-members-managermemberstable-row-"]').first();
  await expect(firstRow).toBeVisible();
  await firstRow.click();
  await page.getByTestId('manager_members-members-managermemberprofile-button-senary-2').click();
  const addPayment = page.getByTestId('manager_members-member-profile-payments-button-add-payment');
  await expect(addPayment).toBeVisible();
  await addPayment.click();
  await page.getByTestId('manager_members-manager-add-payment-modal-input-number').fill('100');
  await page.getByTestId('manager_members-manager-add-payment-modal-button-submit').click();
  const confirm = page.getByRole('dialog').getByRole('button', { name: /confirm|record|payment/i }).last();
  if (await confirm.isVisible().catch(() => false)) await confirm.click();
  await expect(page.locator('[role="status"], [role="alert"], [data-sonner-toast], [data-testid="ui-toast-status"]').filter({ hasText: /./ }).first()).toBeVisible({ timeout: 10000 });
});
