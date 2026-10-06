import { test, expect } from '@playwright/test';
test.describe('manager_grievance critical user journey', () => {
  test('creates a complaint through the complete form flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_grievance');
    await page.getByRole('button', { name: 'Log Complaint' }).first().click();
    await page.getByLabel('Member Name').fill('E2E Grievance Member');
    await page.getByLabel('Issue Description').fill('E2E regression complaint');
    await page.getByRole('button', { name: 'Log Complaint', exact: true }).last().click();
    await expect(page.getByText('E2E Grievance Member')).toBeVisible();
  });
});
