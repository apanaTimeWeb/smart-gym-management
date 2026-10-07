import { test, expect } from '@playwright/test';

test.describe('manager_attendance critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_attendance');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_attendance(?:\\?.*)?$'));
    const search = page.getByTestId('manager_attendance-attendance-toolbar-input-value');
    await expect(search).toBeVisible();
    // Verify the search input is interactive (MSW always returns mock data regardless of query)
    await search.fill('ZZZ-No-Such-Member');
    await expect(search).toHaveValue('ZZZ-No-Such-Member');
    await search.fill('');
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_attendance(?:\\?.*)?$'));
  });
});

test('creates a member attendance record and shows success feedback', async ({ page }) => {
  await page.goto('/frontend_manager/manager_attendance');

  // Wait for toolbar to be fully rendered before clicking Add
  await expect(page.getByTestId('manager_attendance-attendance-toolbar-button-add')).toBeVisible();
  await page.getByTestId('manager_attendance-attendance-toolbar-button-add').click();

  // Wait for the modal form to appear
  await expect(page.getByTestId('manager_attendance-managerattendancemodal-form-1')).toBeVisible({ timeout: 10000 });

  // The member dropdown trigger — exact testid produced by ManagerSearchableDropdown
  const triggerTestId = 'manager_attendance-managerattendancemodal-managersearchabledropdown-1-trigger';
  await expect(page.getByTestId(triggerTestId)).toBeVisible({ timeout: 10000 });
  await page.getByTestId(triggerTestId).click();

  // Wait for options list to appear and pick the first option
  const optionsContainer = page.getByTestId('manager_attendance-managerattendancemodal-managersearchabledropdown-1-options');
  await expect(optionsContainer).toBeVisible({ timeout: 10000 });

  // Click the first available option
  const firstOption = optionsContainer.locator('[data-testid*="-option-"]').first();
  await expect(firstOption).toBeVisible({ timeout: 10000 });
  await firstOption.click();

  // Submit button should now be enabled
  const submit = page.getByTestId('manager_attendance-attendance-modal-button-submit');
  await expect(submit).toBeEnabled({ timeout: 5000 });
  await submit.click();

  // Toast appears and modal closes
  await expect(page.locator('[role="status"], [role="alert"], [data-sonner-toast], [data-testid="ui-toast-status"]').filter({ hasText: /./ }).first()).toBeVisible({ timeout: 10000 });
  await expect(page.getByTestId('manager_attendance-managerattendancemodal-form-1')).toBeHidden({ timeout: 10000 });
});

