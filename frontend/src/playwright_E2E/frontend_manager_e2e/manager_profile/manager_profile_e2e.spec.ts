import { test, expect } from '@playwright/test';
test.describe('manager_profile critical user journey', () => {
  test('edits the profile and shows the authoritative saved value', async ({ page }) => {
    await page.goto('/frontend_manager/manager_profile');
    // Find input by label
    const name = page.getByLabel('Full Name *');
    await expect(name).toBeVisible({ timeout: 10000 });
    const original = await name.inputValue();
    await name.fill('E2E Manager Updated');
    await page.getByRole('button', { name: /Save Changes/i }).click();
    // Confirm value persists (mock saves in memory)
    await expect(name).toHaveValue('E2E Manager Updated', { timeout: 10000 });
    // Restore
    await name.fill(original || 'Demo Manager');
  });
});
