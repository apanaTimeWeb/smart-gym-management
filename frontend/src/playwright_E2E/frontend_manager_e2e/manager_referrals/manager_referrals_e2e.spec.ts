import { test, expect } from '@playwright/test';

test.describe('manager_referrals critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_referrals');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_referrals(?:\\?.*)?$'));
    const search = page.getByTestId('manager_referrals-manager-referrals-main-input-text');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Referral');
    await expect(search).toHaveValue('ZZZ-No-Such-Referral');
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_referrals(?:\\?.*)?$'));
  });
});

test('creates a referral from the manual referral form and shows success feedback', async ({ page }) => {
  await page.goto('/frontend_manager/manager_referrals');
  await page.getByTestId('manager_referrals-manager-referrals-main-button-add-referral').click();
  await page.getByTestId('manager_referrals-referrals-managerreferralsaddmodal-input-log-new-referral-0').fill('Existing Member');
  await page.getByTestId('manager_referrals-referrals-managerreferralsaddmodal-input-log-new-referral-1').fill('M001');
  await page.getByTestId('manager_referrals-referrals-managerreferralsaddmodal-input-log-new-referral-2').fill('E2E Inquiry');
  await page.getByTestId('manager_referrals-referrals-managerreferralsaddmodal-input-log-new-referral-3').fill('9876543210');
  await page.getByTestId('manager_referrals-managerreferralsaddmodal-managersearchabledropdown-1-trigger').click();
  await page.locator('[role="listbox"] [role="option"]').first().click();
  await page.getByTestId('manager_referrals-manager-referrals-main-button-submit').click();
  await expect(page.locator('[data-testid="ui-toast-status"], [data-sonner-toast="true"]').first()).toBeVisible({ timeout: 10000 });
});
