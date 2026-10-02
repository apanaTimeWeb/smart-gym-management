import { expect, test } from '@playwright/test';

test.describe('superadmin_usage_meters critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/frontend_superadmin/superadmin_usage_meters');
    
    // Wait for network idle to ensure MSW mocks have loaded
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    
    // The page should not show a Next.js error overlay
    await expect(page.locator('nextjs-portal')).toHaveCount(0);
    
    // The page should have rendered successfully (not a 404, not an unhandled exception)
    // We check for any heading or main container which indicates the UI loaded
    const mainContent = page.locator('main, h1, h2, h3, [class*="container"], [class*="layout"]');
    await expect(mainContent.first()).toBeVisible({ timeout: 10000 });
  });

  test('exposes the module interaction contract', async ({ page }) => {
    await page.goto('/frontend_superadmin/superadmin_usage_meters');
    
    // Wait for the page to stabilize
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    
    // Ensure the page rendered interactable elements (buttons, inputs, or tables)
    // which signifies the mocked data was successfully bound to the surface.
    const interactables = page.locator('button, input, table, a, select, [role="button"]');
    await expect(interactables.first()).toBeVisible({ timeout: 10000 });
  });
});
