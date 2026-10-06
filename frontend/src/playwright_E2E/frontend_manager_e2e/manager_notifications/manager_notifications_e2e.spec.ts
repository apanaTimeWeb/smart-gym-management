import { test, expect } from '@playwright/test';

test.describe('manager_notifications critical user journey', () => {
  test('renders the canonical route and exercises the primary search flow', async ({ page }) => {
    await page.goto('/frontend_manager/manager_notifications');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_notifications(?:\?.*)?$'));
    const search = page.getByTestId('manager_notifications-manager-notifications-table-input-text');
    await expect(search).toBeVisible();
    await search.fill('ZZZ-No-Such-Notification');
    await expect(page.getByText('No notifications found')).toBeVisible();
    await search.fill('');
    await expect(page).toHaveURL(new RegExp('/frontend_manager/manager_notifications(?:\?.*)?$'));
  });
});


test('status filtering changes the shareable query state', async ({ page }) => {
  await page.goto('/frontend_manager/manager_notifications');
  const status = page.getByTestId('manager_notifications-manager-notifications-table-select-option-3');
  await expect(status).toBeVisible();
  await status.selectOption('UNREAD');
  await expect(page).toHaveURL(/status=UNREAD/);
});

test('marks all notifications as read and shows success feedback', async ({ page }) => {
  await page.goto('/frontend_manager/manager_notifications');
  const markAll = page.getByTestId(/manager_notifications-.*mark-all-read/);
  await expect(markAll).toBeVisible();
  await markAll.click();
  await expect(page.getByTestId('ui-toast-status')).toBeVisible();
});
