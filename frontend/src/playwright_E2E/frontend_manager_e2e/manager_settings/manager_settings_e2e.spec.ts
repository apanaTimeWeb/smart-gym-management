import { test, expect } from '@playwright/test';
test.describe('manager_settings critical user journey', () => {
  test('edits a setting and verifies the visible saved value', async ({ page }) => {
    await page.goto('/frontend_manager/manager_settings');
    const name = page.getByDisplayValue('Smart Gym');
    await expect(name).toBeVisible();
    await name.fill('E2E Smart Gym');
    await page.getByRole('button', { name: 'Save Settings' }).click();
    await expect(page.getByDisplayValue('E2E Smart Gym')).toBeVisible();
  });
});
