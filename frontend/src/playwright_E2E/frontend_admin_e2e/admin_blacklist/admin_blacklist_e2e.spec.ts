import { test, expect } from '@playwright/test';

const baseUrl = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';

test.describe('admin_blacklist critical journey', () => {
  test('switches between blacklist tabs and renders the selected view', async ({ page }) => {
    test.skip(!process.env.PLAYWRIGHT_AUTH_STATE, 'Host-authenticated storage state is required for runtime verification.');
    await page.goto(new URL('/admin/blacklist', baseUrl).toString(), { waitUntil: 'domcontentloaded' });

    const tabs = page.locator('button[data-testid^="admin_blacklist-admin_blacklist-tabs-click-"]');
    await expect(tabs).toHaveCount(2);

    await tabs.nth(1).click();
    const crossGymSurface = page.locator('[data-testid="admin_blacklist-admin_blacklist-cross-gym-empty-state-state"], [data-admin-responsive-table]').first();
    await expect(crossGymSurface).toBeVisible();

    await tabs.nth(0).click();
    const primarySurface = page.locator('[data-testid^="admin_blacklist-admin_blacklist-table-"], [data-testid="admin_blacklist-admin_blacklist-empty-state-state"]').first();
    await expect(primarySurface).toBeVisible();
  });
});
