import { test, expect } from '@playwright/test';

test.describe('superadmin_tickets critical flows', () => {
  test('opens a ticket reply flow and validates empty reply', async ({ page }) => {
    await page.goto('/superadmin/tickets');
    const row = page.locator('tbody tr').first();
    await expect(row).toBeVisible();
    await row.click();
    const replyTrigger = page.getByRole('button', { name: /reply/i }).first();
    await expect(replyTrigger).toBeVisible();
    await replyTrigger.click();
    await expect(page.getByTestId('superadmin_tickets-tickets-tickets-reply-modal-dialog')).toBeVisible();
    await page.getByTestId('superadmin_tickets-tickets-tickets-reply-modal-reply-2').click();
    await expect(page.getByRole('alert')).toBeVisible();
  });
});
