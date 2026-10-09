import { expect, test } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
const ROUTE = '/trainer/attendance';
const FEATURE_MARKER = '[data-testid="trainer_attendance-attendance-toolbar_add"]';

test.describe('trainer_attendance route', () => {
      test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/frontend_auth/auth/login`);
    await page.getByTestId('auth_login-demo-trainer').click();
    await page.waitForURL('**/trainer_dashboard');
    await expect(page.locator('[data-testid="trainer_dashboard-dashboard-main_date_range"]').first()).toBeVisible({ timeout: 15000 });
  });

  test('loads the route without a server error', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: 'domcontentloaded' });
    expect(response, 'navigation must produce an HTTP response').not.toBeNull();
    expect(response!.status(), 'feature route must not resolve to a missing/unauthorized/forbidden/server-error response').toBe(200);
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('body')).not.toContainText(/Application error|Internal Server Error/i);
  });

  test('renders the feature-owned UI marker', async ({ page }) => {
    await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator(FEATURE_MARKER).first()).toBeVisible();
  });

  test('opens the documented add-attendance form from the toolbar', async ({ page }) => {
    await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: 'domcontentloaded' });
    const add = page.locator('[data-testid="trainer_attendance-attendance-toolbar_add"]');
    await expect(add).toBeVisible();
    await add.click();
    await expect(page.locator('[data-testid="trainer_attendance-trainerattendancemodal-form_2"]')).toBeVisible();
  });
});
