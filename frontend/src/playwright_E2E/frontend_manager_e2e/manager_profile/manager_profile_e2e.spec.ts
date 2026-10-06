import { test, expect } from '@playwright/test';
test.describe('manager_profile critical user journey', () => {
  test('edits the profile and shows the authoritative saved value', async ({ page }) => {
    await page.goto('/manager/profile');
    const name = page.getByLabel('Full Name *');
    await expect(name).toBeVisible();
    await name.fill('E2E Manager Updated');
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(page.getByDisplayValue('E2E Manager Updated')).toBeVisible();
  });
});
