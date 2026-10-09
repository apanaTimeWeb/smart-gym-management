import { expect, test } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';
const ROUTE = '/trainer/sessions';
const SESSION_ROW = '[data-testid^="trainer_sessions-sessions-cancel-"]';

test.describe('trainer_sessions route', () => {
  test('loads the route without a server error', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: 'domcontentloaded' });
    expect(response, 'navigation must produce an HTTP response').not.toBeNull();
    expect(response!.status(), 'feature route must not resolve to a missing/unauthorized/forbidden/server-error response').toBe(200);
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('body')).not.toContainText(/Application error|Internal Server Error/i);
  });

  test('exposes the documented cancellation control for an upcoming session', async ({ page }) => {
    await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: 'domcontentloaded' });
    const cancel = page.locator(SESSION_ROW).first();
    await expect(cancel).toBeVisible();
    await expect(cancel).toContainText(/cancel/i);
  });

  test('opens cancellation confirmation without executing the mutation immediately', async ({ page }) => {
    let cancellationRequests = 0;
    page.on('request', (request) => {
      const pathname = new URL(request.url()).pathname;
      if (request.method() === 'DELETE' && pathname.includes('/trainer/trainer_sessions/')) cancellationRequests += 1;
    });
    await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: 'domcontentloaded' });
    const cancel = page.locator(SESSION_ROW).first();
    await expect(cancel).toBeVisible();
    await cancel.click();
    const dialog = page.locator('[data-testid="trainer_infrastructure-trainerinfrastructureconfirmmodal-div_1"]');
    await expect(dialog).toBeVisible();
    expect(cancellationRequests, 'cancellation must not be sent before confirmation').toBe(0);
    await dialog.getByTestId('trainer_infrastructure-trainerinfrastructureconfirmmodal-button_4').click();
    await expect(dialog).toBeHidden();
    expect(cancellationRequests, 'dismissing confirmation must not cancel the session').toBe(0);
  });
});
