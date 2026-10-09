import { expect, test } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
const ROUTE = '/trainer/dashboard';
const FEATURE_MARKER = '[data-testid="trainer_dashboard-dashboard-main_date_range"]';

test.describe('trainer_dashboard route', () => {
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

  test('changes the documented dashboard date range control', async ({ page }) => {
    await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: 'domcontentloaded' });
    const range = page.locator('[data-testid="trainer_dashboard-dashboard-main_date_range"]');
    await expect(range).toBeVisible();
    const initial = new URL(page.url()).searchParams.get('range') ?? 'this_month';
    const options = await range.locator('option').evaluateAll((items) => items.map((item) => (item as HTMLOptionElement).value));
    const nextRange = options.find((value) => value !== initial);
    expect(nextRange, 'date-range select must offer a range other than the current value').toBeTruthy();
    await range.selectOption(nextRange!);
    await expect.poll(() => new URL(page.url()).searchParams.get('range')).toBe(nextRange);
    expect(await range.inputValue()).toBe(nextRange);
  });
});
