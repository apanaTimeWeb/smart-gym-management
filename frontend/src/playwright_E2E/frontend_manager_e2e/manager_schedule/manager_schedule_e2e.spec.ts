import { test, expect } from '@playwright/test';

test.describe('manager_schedule critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_schedule');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_schedule(?:\\?.*)?$'));
    const search = page.getByTestId('manager_schedule-manager-schedule-content-input-value');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Trainer');
    await expect(search).toHaveValue('ZZZ-No-Such-Trainer');
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_schedule(?:\\?.*)?$'));
  });
});

test('creates a trainer shift and shows success feedback', async ({ page }) => {
  await page.goto('/frontend_manager/manager_schedule');
  await page.getByTestId('manager_schedule-manager-schedule-trainer-card-button-add').first().click();
  const trainerDropdown = page.getByTestId('manager_schedule-managerscheduleshiftmodal-managersearchabledropdown-1');
  await expect(page.getByTestId('manager_schedule-managerscheduleshiftmodal-managersearchabledropdown-1-trigger')).toBeVisible({ timeout: 10000 });
  await page.getByTestId('manager_schedule-managerscheduleshiftmodal-managersearchabledropdown-1-trigger').click();
  const _trainerDropdownOptions = page.getByTestId('manager_schedule-managerscheduleshiftmodal-managersearchabledropdown-1-options');
  await expect(_trainerDropdownOptions).toBeVisible({ timeout: 10000 });
  await _trainerDropdownOptions.locator('[data-testid*="-option-"]').first().click();
  await page.getByTestId('manager_schedule-manager-schedule-shift-modal-button-submit').click();
  await expect(page.getByTestId('ui-toast-status')).toBeVisible();
});
