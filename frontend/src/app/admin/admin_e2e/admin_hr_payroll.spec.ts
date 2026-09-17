import { test, expect } from '@playwright/test';

test.describe('Admin HR payroll workflow', () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([{
      name: 'gymsmart_user',
      value: encodeURIComponent(JSON.stringify({ name: 'Demo Admin', email: 'admin@gymsmart.com', role: 'ADMIN', tenantId: 'tenant_001' })),
      url: 'http://localhost:3000',
    }]);
  });

  test('renders the payroll workspace from module mock data', async ({ page }) => {
    await page.goto('/admin/hr');
    await expect(page.getByText('HR & Managers')).toBeVisible();
    await expect(page.getByText(/Payroll|Salary|Staff/i).first()).toBeVisible();
  });
});
