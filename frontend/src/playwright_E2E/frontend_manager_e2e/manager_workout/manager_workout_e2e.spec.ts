import { test, expect } from '@playwright/test';

test.describe('manager_workout critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_workout');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_workout(?:\?.*)?$'));
    const search = page.getByTestId('manager_workout-manager-workout-toolbar-input-value');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Workout');
    await expect(page.getByText(/No workout plans found matching/)).toBeVisible();
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_workout(?:\?.*)?$'));
  });
});

test('creates a workout plan and shows success feedback', async ({ page }) => {
  await page.goto('/frontend_manager/manager_workout');
  await page.getByTestId('manager_workout-manager-workout-toolbar-tab').click();
  await page.getByTestId('manager_workout-manager-workout-modal-manager-workout-name').fill('E2E Strength Plan');
  await page.getByTestId('manager_workout-manager-workout-modal-manager-workout-days').fill('5');
  await page.getByTestId('manager_workout-manager-workout-modal-manager-workout-exercises').fill('6');
  await page.getByTestId('manager_workout-manager-workout-modal-manager-workout-focus').fill('Strength');
  await page.getByTestId('manager_workout-manager-workout-modal-manager-workout-duration').fill('60 min');
  await page.getByTestId('manager_workout-manager-workout-modal-button-submit').click();
  await expect(page.getByTestId('ui-toast-status')).toBeVisible();
});
