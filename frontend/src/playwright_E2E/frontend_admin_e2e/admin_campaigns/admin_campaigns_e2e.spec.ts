import { test, expect } from '@playwright/test';

const baseUrl = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';

test.describe('admin_campaigns critical journey', () => {
  test('builds a WhatsApp queue and opens the generated link', async ({ page }) => {
    test.skip(!process.env.PLAYWRIGHT_AUTH_STATE, 'Host-authenticated storage state is required for runtime verification.');
    await page.goto(new URL('/admin/campaigns', baseUrl).toString(), { waitUntil: 'domcontentloaded' });

    const audience = page.locator('button[data-testid^="admin_campaigns-admin_campaigns-audience-picker-click-"]');
    const template = page.locator('button[data-testid^="admin_campaigns-admin_campaigns-template-picker-click-"]');
    await expect(audience.first()).toBeVisible();
    await expect(template.first()).toBeVisible();
    await audience.first().click();
    await template.first().click();

    const createQueue = page.locator('button[data-testid^="admin_campaigns-admin_campaigns-main-click-"]');
    if (await createQueue.count()) {
      await createQueue.first().click();
    }

    const openButton = page.locator('button[data-testid^="admin_campaigns-admin_campaigns-queue-panel-click-4-map70-"]');
    await expect(openButton.first()).toBeVisible();
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      openButton.first().click(),
    ]);
    await expect(popup).toHaveURL(/^https:\/\/wa\.me\//);
  });
});
