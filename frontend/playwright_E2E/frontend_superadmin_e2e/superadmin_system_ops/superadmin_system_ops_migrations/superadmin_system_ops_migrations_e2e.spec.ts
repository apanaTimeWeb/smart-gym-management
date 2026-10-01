import { test, expect } from '@playwright/test';

test.describe('superadmin_system_ops_migrations critical flows', () => {
  test('validates migration target before deployment', async ({ page }) => {
    await page.goto('/superadmin/system-ops/migrations');
    const input = page.getByTestId('superadmin_system_ops_migrations-migrations-main-version');
    await expect(input).toBeVisible();
    await input.fill('invalid target');
    await page.getByRole('button', { name: /deploy new schema/i }).click();
    await expect(page.getByRole('alert')).toBeVisible();
  });
});
