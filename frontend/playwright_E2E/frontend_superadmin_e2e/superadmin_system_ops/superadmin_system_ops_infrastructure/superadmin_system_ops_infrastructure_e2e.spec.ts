import { test, expect } from '@playwright/test';

test.describe('superadmin_system_ops_infrastructure critical flows', () => {
  test('renders health state and retry affordance', async ({ page }) => {
    await page.goto('/superadmin/system-ops/infrastructure');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByTestId('superadmin_system_ops_infrastructure-infrastructure-retry')).toBeVisible();
  });
});
