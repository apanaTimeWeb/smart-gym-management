import { test, expect } from '@playwright/test';
test.describe('manager_reports critical user journey', () => {
  test('changes report tabs and requests the selected dataset', async ({ page }) => {
    await page.goto('/frontend_manager/manager_reports');
    const tabs = page.locator('[data-testid^="manager_reports-reports-managerreportscontent-button-primary-"]');
    await expect(tabs.first()).toBeVisible();
    const second = tabs.nth(1);
    const request = page.waitForRequest(request => request.url().includes('/manager/reports/summary') && request.url().includes('tab='));
    await second.click();
    await request;
    await expect(second).toHaveClass(/bg-card/);
  });
});
