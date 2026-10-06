import { test, expect } from '@playwright/test';

const baseUrl = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';

/**
 * AI-portable functional smoke contract for `admin_usage`.
 * The suite is intentionally self-contained so this module's E2E folder can be supplied independently.
 * Runtime execution requires the host application and authenticated PLAYWRIGHT_AUTH_STATE.
 */
test.describe('admin_usage', () => {
  test('loads the module and exercises a safe interactive path', async ({ page }) => {
    test.skip(!process.env.PLAYWRIGHT_AUTH_STATE, 'Host-authenticated storage state is required for runtime verification.');

    await page.goto(new URL('/frontend_admin/admin_usage', baseUrl).toString(), { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(new RegExp('/frontend_admin/admin_usage(?:\\?.*)?$'));

    const moduleSurface = page.locator('[data-testid^="admin_usage-"]');
    await expect(moduleSurface.first()).toBeVisible();

    const safeSearch = page.locator('input[data-testid^="admin_usage-"][data-testid*="search"]:not([disabled])').first();
    if (await safeSearch.count()) {
      await safeSearch.fill('test');
      await page.waitForTimeout(350);
      await safeSearch.fill('');
    }

    const dropdownTrigger = page.locator('button[data-testid^="admin_usage-"][aria-haspopup="listbox"]:not([disabled])').first();
    if (await dropdownTrigger.count()) {
      await dropdownTrigger.click();
      await expect(page.locator('[role="listbox"]')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.locator('[role="listbox"]')).toHaveCount(0);
    }

    const moduleControls = await page.locator('[data-testid^="admin_usage-"]').count();
    expect(moduleControls).toBeGreaterThan(0);
  });
});
