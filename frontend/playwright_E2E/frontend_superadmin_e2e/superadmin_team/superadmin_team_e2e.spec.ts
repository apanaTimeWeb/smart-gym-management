import { expect, test } from '@playwright/test';

test.describe('superadmin_team critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/superadmin/team');
    await expect(page.getByTestId('superadmin_team-superadmin-team-main-page-ready')).toBeVisible();
  });

  test('exposes the alert preference control', async ({ page }) => {
    await page.goto('/superadmin/team');
    const surface = page.getByTestId('superadmin_team-superadmin-team-roles-and-alert-preferences-panel-alert-preferences-panel-checkbox');
    await expect(surface).toBeVisible();
  });
});
