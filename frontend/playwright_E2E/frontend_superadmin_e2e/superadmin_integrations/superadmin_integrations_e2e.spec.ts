import { expect, test } from '@playwright/test';

test.describe('superadmin_integrations critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/superadmin/integrations');
    await expect(page.getByTestId('superadmin_integrations-superadmin-integrations-main-page-ready')).toBeVisible();
  });

  test('exposes the integration retry control', async ({ page }) => {
    await page.goto('/superadmin/integrations');
    const surface = page.getByTestId('superadmin_integrations-superadmin-integrations-main-integrations-integrations-client-retry');
    await expect(surface).toBeVisible();
  });
});
