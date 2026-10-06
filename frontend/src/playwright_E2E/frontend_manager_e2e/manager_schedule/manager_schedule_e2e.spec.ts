import { test, expect } from '@playwright/test';

test.describe('manager_schedule critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_schedule');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_schedule(?:\?.*)?$'));
    const search = page.getByTestId('manager_schedule-manager-schedule-content-input-value');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Trainer');
    await expect(page.getByText('No trainers match your search.')).toBeVisible();
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_schedule(?:\?.*)?$'));
  });
});

test('creates a trainer shift and shows success feedback', async ({ page }) => {
  await page.goto('/frontend_manager/manager_schedule');
  await page.getByTestId('manager_schedule-manager-schedule-trainer-card-button-add').first().click();
  const trainerDropdown = page.getByTestId('manager_schedule-managerscheduleshiftmodal-managersearchabledropdown-1');
  await trainerDropdown.getByTestId(/-trigger$/).click();
  await trainerDropdown.getByTestId(/-option-/).first().click();
  await page.getByTestId('manager_schedule-manager-schedule-shift-modal-button-submit').click();
  await expect(page.getByTestId('ui-toast-status')).toBeVisible();
});
