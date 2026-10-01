import { test, expect } from '@playwright/test';

test.describe('superadmin_messaging critical flows', () => {
  test('opens compose dialog and blocks an empty send', async ({ page }) => {
    await page.goto('/superadmin/messaging');
    await page.getByTestId('superadmin_messaging-main-compose').click();
    await expect(page.getByTestId('superadmin_messaging-messaging-messaging-compose-modal-dialog')).toBeVisible();
    await page.getByTestId('superadmin_messaging-messaging-messaging-compose-modal-action4').click();
    await expect(page.locator('[role="alert"]').first()).toBeVisible();
    await page.getByTestId('superadmin_messaging-messaging-messaging-compose-modal-cancel').click();
    await expect(page.getByTestId('superadmin_messaging-messaging-messaging-compose-modal-dialog')).toHaveCount(0);
  });
});
