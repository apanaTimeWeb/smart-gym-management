import { test, expect } from '@playwright/test';

test.describe('manager_schedule critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_schedule');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_schedule(?:\\?.*)?$'));
    const search = page.getByTestId('manager_schedule-manager-schedule-content-input-value');
    await expect(search).toBeVisible({ timeout: 10000 });
    await search.fill('ZZZ-No-Such-Trainer');
    await expect(search).toHaveValue('ZZZ-No-Such-Trainer');
    await search.fill('');
    await expect(search).toHaveValue('');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_schedule(?:\\?.*)?$'));
  });
});

test('creates a trainer shift and shows success feedback', async ({ page }) => {
  await page.goto('/frontend_manager/manager_schedule');
  // Wait for page to load and find ANY trainer card add button
  const addBtn = page.getByTestId('manager_schedule-manager-schedule-trainer-card-button-add').first();
  await expect(addBtn).toBeVisible({ timeout: 15000 });
  await addBtn.click();

  const triggerTestId = 'manager_schedule-managerscheduleshiftmodal-managersearchabledropdown-1-trigger';
  await expect(page.getByTestId(triggerTestId)).toBeVisible({ timeout: 10000 });
  await page.getByTestId(triggerTestId).click();

  const optionsTestId = 'manager_schedule-managerscheduleshiftmodal-managersearchabledropdown-1-options';
  await expect(page.getByTestId(optionsTestId)).toBeVisible({ timeout: 10000 });
  await page.getByTestId(optionsTestId).locator('[data-testid*="-option-"]').first().click();

  await page.getByTestId('manager_schedule-manager-schedule-shift-modal-button-submit').click();
  await expect(page.getByTestId('ui-toast-status')).toBeVisible({ timeout: 10000 });
});
