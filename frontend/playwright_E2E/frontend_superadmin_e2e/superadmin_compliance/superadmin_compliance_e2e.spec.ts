import { expect, test } from '@playwright/test';

test.describe('superadmin_compliance critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/superadmin/compliance');
    await expect(page.getByTestId('superadmin_compliance-superadmin-compliance-main-page')).toBeVisible();
  });

  test('exposes the compliance summary surface', async ({ page }) => {
    await page.goto('/superadmin/compliance');
    const surface = page.getByTestId('superadmin-compliance-superadmin-compliance-summary-cards-metric-card-1');
    await expect(surface).toBeVisible();
  });
});
