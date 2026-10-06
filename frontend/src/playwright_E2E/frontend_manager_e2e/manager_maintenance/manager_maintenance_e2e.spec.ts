import { test, expect } from '@playwright/test';
test.describe('manager_maintenance critical user journey', () => {
  test('creates a maintenance issue and renders the new record', async ({ page }) => {
    await page.goto('/manager/maintenance');
    await page.getByRole('button', { name: 'Log Issue' }).first().click();
    await page.getByLabel('Issue Title').fill('E2E Maintenance Issue');
    await page.getByLabel('Equipment / Area').fill('E2E Test Area');
    await page.getByRole('button', { name: 'Log Issue', exact: true }).last().click();
    await expect(page.getByText('E2E Maintenance Issue')).toBeVisible();
  });
});
