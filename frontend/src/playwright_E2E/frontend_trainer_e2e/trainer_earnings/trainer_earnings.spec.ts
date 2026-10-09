import { expect, test } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
const ROUTE = '/trainer/earnings';
const FEATURE_MARKER = '[data-testid="trainer_earnings-earnings-history_search"]';

test.describe('trainer_earnings route', () => {
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

  test('propagates ledger search through the visible search control', async ({ page }) => {
    await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: 'domcontentloaded' });
    const search = page.locator('[data-testid="trainer_earnings-earnings-history_search"]');
    await expect(search).toBeVisible();
    await search.fill('Session');
    await expect(search).toHaveValue('Session');
    await expect.poll(() => new URL(page.url()).searchParams.get('search')).toBe('Session');
    await expect.poll(() => new URL(page.url()).searchParams.get('page')).toBe('1');
  });
});
