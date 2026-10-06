import { test, expect } from '@playwright/test';

test.describe('manager_communications critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/manager/communications');
    await expect(page).toHaveURL(new RegExp('/manager/communications(?:\?.*)?$'));
    const search = page.getByTestId('manager_communications-manager-communications-history-input-text');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Campaign');
    await expect(page.getByText('No campaigns yet')).toBeVisible();
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/manager/communications(?:\?.*)?$'));
  });
});

test('sends a campaign from a predefined template and shows success feedback', async ({ page }) => {
  await page.goto('/manager/communications');
  await page.getByTestId('manager_communications-communications-managercommunicationscomposer-button-3-compose-message-0').click();
  const submit = page.getByTestId('manager_communications-manager-communications-composer-button-submit');
  await expect(submit).toBeEnabled();
  await submit.click();
  await expect(page.getByTestId('ui-toast-status')).toBeVisible();
});
