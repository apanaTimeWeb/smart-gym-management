import { test, expect } from '@playwright/test';

test.describe('manager_pt critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_pt');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_pt(?:\\?.*)?$'));
    const search = page.getByTestId('manager_pt-manager-pt-main-input-value');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Assignment');
    await expect(search).toHaveValue('ZZZ-No-Such-Assignment');
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_pt(?:\\?.*)?$'));
  });
});

test('creates a PT assignment and shows success feedback', async ({ page }) => {
  await page.goto('/frontend_manager/manager_pt');
  await page.getByTestId('manager_pt-manager-pt-main-button-action').click();
  await page.getByTestId('manager_pt-manager-pt-main-input-value').fill('member-001');
  const trainerDropdown = page.getByTestId('manager_pt-managerptassignmentform-managersearchabledropdown-1');
  await expect(page.getByTestId('manager_pt-managerptassignmentform-managersearchabledropdown-1-trigger')).toBeVisible({ timeout: 10000 });
  await page.getByTestId('manager_pt-managerptassignmentform-managersearchabledropdown-1-trigger').click();
  const _trainerDropdownOptions = page.getByTestId('manager_pt-managerptassignmentform-managersearchabledropdown-1-options');
  await expect(_trainerDropdownOptions).toBeVisible({ timeout: 10000 });
  await _trainerDropdownOptions.locator('[data-testid*="-option-"]').first().click();
  const packageDropdown = page.getByTestId('manager_pt-managerptassignmentform-managersearchabledropdown-2');
  await expect(page.getByTestId('manager_pt-managerptassignmentform-managersearchabledropdown-2-trigger')).toBeVisible({ timeout: 10000 });
  await page.getByTestId('manager_pt-managerptassignmentform-managersearchabledropdown-2-trigger').click();
  const _packageDropdownOptions = page.getByTestId('manager_pt-managerptassignmentform-managersearchabledropdown-2-options');
  await expect(_packageDropdownOptions).toBeVisible({ timeout: 10000 });
  await _packageDropdownOptions.locator('[data-testid*="-option-"]').first().click();
  const today = new Date().toISOString().slice(0, 10);
  await page.getByTestId('manager_pt-manager-pt-main-input-date').fill(today);
  await page.getByTestId('manager_pt-manager-pt-main-button-submit').click();
  await expect(page.getByTestId('ui-toast-status')).toBeVisible();
});
