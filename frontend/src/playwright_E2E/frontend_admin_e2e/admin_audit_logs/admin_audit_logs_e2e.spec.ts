import { test, expect } from '@playwright/test';

const baseUrl = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';

test.describe('admin_audit_logs critical journey', () => {
  test('changing date filters produces a filtered audit-log request', async ({ page }) => {
    test.skip(!process.env.PLAYWRIGHT_AUTH_STATE, 'Host-authenticated storage state is required for runtime verification.');
    const requestUrls: string[] = [];
    page.on('request', (request) => {
      if (request.url().includes('/admin/audit-logs')) requestUrls.push(request.url());
    });

    await page.goto(new URL('/admin/audit_logs', baseUrl).toString(), { waitUntil: 'domcontentloaded' });

    const dateFrom = page.locator('[data-testid="admin_audit_logs-admin_audit_logs-toolbar-control"]');
    const dateTo = page.locator('[data-testid="admin_audit_logs-admin_audit_logs-toolbar-control-2"]');
    await expect(dateFrom).toBeVisible();
    await expect(dateTo).toBeVisible();

    await dateFrom.fill('2026-06-01');
    await dateTo.fill('2026-06-30');
    await page.waitForTimeout(450);

    expect(requestUrls.some((url) => url.includes('from=2026-06-01') && url.includes('to=2026-06-30'))).toBeTruthy();
  });
});
