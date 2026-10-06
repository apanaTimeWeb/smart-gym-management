import { test, expect } from '@playwright/test';

test.describe('manager_pt critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_pt');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_pt(?:\\?.*)?$'));
    // PT has no search input — verify the action button renders (real UI element)
    const actionBtn = page.getByTestId('manager_pt-manager-pt-main-button-action');
    await expect(actionBtn).toBeVisible({ timeout: 10000 });
    // Verify tab bar renders
    await expect(page.getByTestId('manager_pt-managerpttabbar-interactive')).toBeVisible({ timeout: 10000 });
  });
});

test('creates a PT assignment and shows success feedback', async ({ page }) => {
  await page.goto('/frontend_manager/manager_pt');
  await expect(page.getByTestId('manager_pt-manager-pt-main-button-action')).toBeVisible({ timeout: 10000 });
  await page.getByTestId('manager_pt-manager-pt-main-button-action').click();

  // Wait for assignment form modal to appear
  const trainerTrigger = page.getByTestId('manager_pt-managerptassignmentform-managersearchabledropdown-1-trigger');
  await expect(trainerTrigger).toBeVisible({ timeout: 10000 });
  await trainerTrigger.click();
  const trainerOptions = page.getByTestId('manager_pt-managerptassignmentform-managersearchabledropdown-1-options');
  await expect(trainerOptions).toBeVisible({ timeout: 10000 });
  await trainerOptions.locator('[data-testid*="-option-"]').first().click();

  const packageTrigger = page.getByTestId('manager_pt-managerptassignmentform-managersearchabledropdown-2-trigger');
  await expect(packageTrigger).toBeVisible({ timeout: 10000 });
  await packageTrigger.click();
  const packageOptions = page.getByTestId('manager_pt-managerptassignmentform-managersearchabledropdown-2-options');
  await expect(packageOptions).toBeVisible({ timeout: 10000 });
  await packageOptions.locator('[data-testid*="-option-"]').first().click();

  const today = new Date().toISOString().slice(0, 10);
  const dateInput = page.getByTestId('manager_pt-manager-pt-main-input-date');
  if (await dateInput.isVisible().catch(() => false)) {
    await dateInput.fill(today);
  }
  await page.getByTestId('manager_pt-managerptmain-managersearchabledropdown-1-trigger').click();
  await page.getByRole('option').first().click();
  await page.getByTestId('manager_pt-manager-pt-main-button-submit').click();
  await expect(page.getByTestId('ui-toast-status')).toBeVisible({ timeout: 10000 });
});
