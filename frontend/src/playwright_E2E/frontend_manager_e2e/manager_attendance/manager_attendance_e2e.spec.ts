import { test, expect } from '@playwright/test';

test.describe('manager_attendance critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_attendance');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_attendance(?:\?.*)?$'));
    const search = page.getByTestId('manager_attendance-attendance-toolbar-input-value');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Member');
    await expect(page.getByText('No attendance records')).toBeVisible();
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_attendance(?:\?.*)?$'));
  });
});

test('creates a member attendance record and shows success feedback', async ({ page }) => {
  await page.goto('/frontend_manager/manager_attendance');
  await page.getByTestId('manager_attendance-attendance-toolbar-button-add').click();
  const memberDropdown = page.getByTestId('manager_attendance-managerattendancemodal-managersearchabledropdown-1');
  await memberDropdown.getByTestId(/-trigger$/).click();
  await memberDropdown.getByTestId(/-option-/).first().click();
  const submit = page.getByTestId('manager_attendance-attendance-modal-button-submit');
  await expect(submit).toBeEnabled();
  await submit.click();
  await expect(page.getByTestId('ui-toast-status')).toBeVisible();
  await expect(page.getByTestId('manager_attendance-managerattendancemodal-form-1')).toBeHidden();
});
