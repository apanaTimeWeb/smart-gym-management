import { test, expect } from '@playwright/test';

test.describe('manager_hr critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_hr');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_hr(?:\\?.*)?$'));
    const search = page.getByTestId('manager_hr-manager-hr-tabs-manager-hr-staff-search');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Staff');
    await expect(search).toHaveValue('ZZZ-No-Such-Staff');
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_hr(?:\\?.*)?$'));
  });
});

test('creates a payroll record and confirms the save workflow', async ({ page }) => {
  await page.goto('/frontend_manager/manager_hr');
  await page.getByTestId('manager_hr-manager-hr-tabs-add-payroll').click();
  const staffDropdown = page.getByTestId('manager_hr-managerhrpayrollmodal-managersearchabledropdown-1');
  await expect(page.getByTestId('manager_hr-managerhrpayrollmodal-managersearchabledropdown-1-trigger')).toBeVisible({ timeout: 10000 });
  await page.getByTestId('manager_hr-managerhrpayrollmodal-managersearchabledropdown-1-trigger').click();
  const _staffDropdownOptions = page.getByTestId('manager_hr-managerhrpayrollmodal-managersearchabledropdown-1-options');
  await expect(_staffDropdownOptions).toBeVisible({ timeout: 10000 });
  await _staffDropdownOptions.locator('[data-testid*="-option-"]').first().click();
  await page.getByTestId('manager_hr-manager-hr-payroll-modal-input-number-1').fill('1000');
  await page.getByTestId('manager_hr-manager-hr-payroll-modal-input-number-2').fill('1000');
  await page.getByTestId('manager_hr-manager-hr-payroll-modal-button-submit').click();
  await expect(page.locator('[data-testid="ui-toast-status"], [data-sonner-toast="true"]').first()).toBeVisible({ timeout: 10000 });
});
