import { expect, test } from '@playwright/test';

test.describe('superadmin_messaging critical frontend journey', () => {
  test('renders the canonical module route and primary surface', async ({ page }) => {
    await page.goto('/superadmin/messaging');
    await expect(page.getByTestId('superadmin_messaging-superadmin-messaging-main-superadmin_messaging-main-compose')).toBeVisible();
  });

  test('exposes the WhatsApp queue action', async ({ page }) => {
    await page.goto('/superadmin/messaging');
    const surface = page.getByTestId('superadmin_messaging-superadmin-messaging-v1-whats-app-queue-panel-app-queue-panel-next');
    await expect(surface).toBeVisible();
  });
});
