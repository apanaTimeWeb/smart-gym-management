import { expect, test } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
const ROUTE = '/trainer/notifications';
const FEATURE_MARKER = '[data-testid="trainer_notifications-notifications-content_recent_activity"]';

test.describe('trainer_notifications route', () => {
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

  test('exposes the mark-all-as-read action when notifications are present', async ({ page }) => {
    await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: 'domcontentloaded' });
    const action = page.locator('[data-testid="trainer_notifications-notifications-content_mark_all_as_read"]');
    // The host E2E fixture must provide at least one unread notification for this scenario.
    await expect(action, 'unread-notification fixture must expose the mark-all-as-read action').toHaveCount(1);
    await expect(action).toBeVisible();
  });
});
