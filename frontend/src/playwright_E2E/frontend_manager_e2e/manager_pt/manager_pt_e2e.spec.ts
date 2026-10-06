import { test, expect } from '@playwright/test';

test.describe('manager_pt critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/manager/pt');
    await expect(page).toHaveURL(new RegExp('/manager/pt(?:\?.*)?$'));
    const search = page.getByTestId('manager_pt-manager-pt-main-input-value');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Assignment');
    await expect(page.getByText('No active assignments')).toBeVisible();
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/manager/pt(?:\?.*)?$'));
  });
});

test('creates a PT assignment and shows success feedback', async ({ page }) => {
  await page.goto('/manager/pt');
  await page.getByTestId('manager_pt-manager-pt-main-button-action').click();
  await page.getByTestId('manager_pt-manager-pt-main-input-value').fill('member-001');
  const trainerDropdown = page.getByTestId('manager_pt-managerptassignmentform-managersearchabledropdown-1');
  await trainerDropdown.getByTestId(/-trigger$/).click();
  await trainerDropdown.getByTestId(/-option-/).first().click();
  const packageDropdown = page.getByTestId('manager_pt-managerptassignmentform-managersearchabledropdown-2');
  await packageDropdown.getByTestId(/-trigger$/).click();
  await packageDropdown.getByTestId(/-option-/).first().click();
  const today = new Date().toISOString().slice(0, 10);
  await page.getByTestId('manager_pt-manager-pt-main-input-date').fill(today);
  await page.getByTestId('manager_pt-manager-pt-main-button-submit').click();
  await expect(page.getByTestId('ui-toast-status')).toBeVisible();
});
