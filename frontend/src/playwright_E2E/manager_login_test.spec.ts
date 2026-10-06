import { test, expect } from '@playwright/test';

test('manager login test', async ({ page }) => {
  console.log("Going to logout to clear session...");
  await page.goto('http://localhost:3000/frontend_auth/auth/logout');
  await page.waitForTimeout(1000);
  
  console.log("Going to login page...");
  await page.goto('http://localhost:3000/frontend_auth/auth/login');
  await page.waitForTimeout(2000);
  
  console.log("Clicking Manager button...");
  await page.getByTestId('auth_login-demo-manager').click();
  
  console.log("Waiting for navigation...");
  await page.waitForURL('**/manager_dashboard', { timeout: 10000 });
  
  console.log("Current URL:", page.url());
  await page.screenshot({ path: 'manager_dashboard_result.png' });
});
