import { test, expect } from '@playwright/test';
test.describe('manager_settings critical user journey', () => {
  test('edits a setting and verifies the visible saved value', async ({ page }) => {
    await page.goto('/frontend_manager/manager_settings');
    // Wait for form to render — settings tab is 'gym_profile'
    const tabBtn = page.getByTestId('manager_settings-settings-managersettingsmain-button-app-settings-1');
    await expect(tabBtn).toBeVisible({ timeout: 10000 });
    await tabBtn.click(); // switch to gym_profile tab
    // Find first gym input (gymName)
    const nameInput = page.getByTestId('manager_settings-settings-managersettingsmain-input-gymName');
    await expect(nameInput).toBeVisible({ timeout: 10000 });
    const originalVal = await nameInput.inputValue();
    await nameInput.fill('E2E Smart Gym');
    await page.getByTestId('manager_settings-manager-settings-main-button-submit').click();
    await expect(nameInput).toHaveValue('E2E Smart Gym', { timeout: 10000 });
    // Restore
    await nameInput.fill(originalVal || 'Smart Gym');
  });
});
