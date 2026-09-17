import { test, expect } from '@playwright/test';

test.describe('Superadmin Ghost Login Flow', () => {
  test('should allow superadmin to ghost login into a gym and return', async ({ page }) => {
    // 0. Login as superadmin
    await page.goto('/auth/login');
    await page.fill('input[name="email"]', 'demo_admin@gym.com');
    await page.fill('input[name="password"]', 'demo123');
    await page.getByRole('button', { name: /Sign In/i }).click();

    // 1. Wait for redirect and navigate to Superadmin Gyms page
    await expect(page).toHaveURL(/\/superadmin\/dashboard/);
    await page.goto('/superadmin/gyms');
    
    // Check we are on the superadmin page
    await expect(page.getByRole('heading', { name: 'Gyms', exact: true })).toBeVisible();

    // 2. Click the Ghost Login button on the first gym row
    // Wait for the table rows to render
    const firstRowGhostLoginBtn = page.getByRole('button', { name: /Ghost Login/i }).first();
    await firstRowGhostLoginBtn.waitFor({ state: 'visible' });
    await firstRowGhostLoginBtn.click();
    
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'test-screenshot.png' });

    // 3. Verify we are redirected to the admin dashboard
    await expect(page).toHaveURL(/\/admin\/dashboard/);
    
    // 5. Verify Ghost Login Banner is visible
    const banner = page.locator('text=Ghost Login Active');
    await expect(banner).toBeVisible();

    // 6. Click "Exit Ghost Login"
    const returnBtn = page.getByRole('button', { name: /Exit Ghost Login/i });
    await returnBtn.click();

    // 7. Verify we are back to superadmin
    await expect(page).toHaveURL(/\/superadmin\/gyms/);
  });
});
