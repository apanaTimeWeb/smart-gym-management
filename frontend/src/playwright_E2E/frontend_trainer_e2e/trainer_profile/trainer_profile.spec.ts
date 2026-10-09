import { expect, test } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
const ROUTE = '/trainer/profile';
const FEATURE_MARKER = '[data-testid="trainer_profile-main-tab_personal"]';

test.describe('trainer_profile route', () => {
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

  test('switches between personal and security profile sections', async ({ page }) => {
    await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: 'domcontentloaded' });
    const security = page.locator('[data-testid="trainer_profile-main-tab_security"]');
    await expect(security).toBeVisible();
    await security.click();
    await expect(page.locator('[data-testid="trainer_profile-trainerprofilemain-form_9"]')).toBeVisible();
  });
});
