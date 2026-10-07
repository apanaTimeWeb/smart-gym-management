import { test, expect } from '@playwright/test';

test.describe('manager_inquiries critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_inquiries');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_inquiries(?:\\?.*)?$'));
    const search = page.getByTestId('manager_inquiries-manager-inquiries-toolbar-input-value');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Inquiry');
    await expect(search).toHaveValue('ZZZ-No-Such-Inquiry');
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_inquiries(?:\\?.*)?$'));
  });
});

test('creates an inquiry and shows success feedback', async ({ page }) => {
  await page.goto('/frontend_manager/manager_inquiries');
  await page.getByTestId('manager_inquiries-manager-inquiries-toolbar-add').click();
  await page.getByTestId('manager_inquiries-inquiries-managerinquiriesmodal-input-edit-inquiry-0').fill('E2E Test Lead');
  await page.getByTestId('manager_inquiries-inquiries-managerinquiriesmodal-input-edit-inquiry-1').fill('9876543210');
  await page.getByTestId('manager_inquiries-inquiries-managerinquiriesmodal-managersearchabledropdown-1').getByTestId(/-trigger$/).click();
  await page.getByTestId('manager_inquiries-inquiries-managerinquiriesmodal-managersearchabledropdown-1').getByTestId(/-option-/).first().click();
  await page.getByTestId('manager_inquiries-manager-inquiries-modal-button-submit').click();
  await expect(page.locator('[data-testid="ui-toast-status"], [data-sonner-toast="true"]').first()).toBeVisible({ timeout: 10000 });
});
