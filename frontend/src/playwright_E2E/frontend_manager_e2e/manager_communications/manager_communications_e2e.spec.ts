import { test, expect } from '@playwright/test';

test.describe('manager_communications critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_communications');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_communications(?:\\?.*)?$'));
    await page.getByRole('tab', { name: /history/i }).click();
    const search = page.getByTestId('manager_communications-manager-communications-history-input-text');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Campaign');
    await expect(search).toHaveValue('ZZZ-No-Such-Campaign');
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_communications(?:\\?.*)?$'));
  });
});

test('sends a campaign from a predefined template and shows success feedback', async ({ page }) => {
  await page.goto('/frontend_manager/manager_communications');
  await page.getByTestId('manager_communications-communications-managercommunicationscomposer-button-3-compose-message-0').click();
  const submit = page.getByTestId('manager_communications-manager-communications-composer-button-submit');
  await expect(submit).toBeEnabled({ timeout: 10000 });
  await page.getByTestId('manager_communications-manager-communications-composer-input-text-1').fill('Test Subject');
  await page.getByTestId('manager_communications-manager-communications-composer-managersearchabledropdown-1-trigger').click();
  await page.locator('[role="listbox"] [role="option"]').first().click();
  await submit.click();
  await expect(page.locator('[role="status"], [role="alert"], [data-sonner-toast], [data-testid="ui-toast-status"]').filter({ hasText: /./ }).first()).toBeVisible({ timeout: 10000 });
});
