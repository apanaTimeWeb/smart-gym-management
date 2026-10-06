import { test, expect } from '@playwright/test';

test.describe('manager_dashboard critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/manager/dashboard');
    await expect(page).toHaveURL(new RegExp('/manager/dashboard(?:\?.*)?$'));
    const search = page.getByTestId('manager_dashboard-manager-dashboard-recent-members-input-value');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Member');
    await expect(page.getByText('No members matching "ZZZ-No-Such-Member"')).toBeVisible();
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/manager/dashboard(?:\?.*)?$'));
  });
});
