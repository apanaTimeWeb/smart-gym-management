import { test, expect } from '@playwright/test';

test.describe('superadmin_integrations critical flows', () => {
  test('opens API-key generation and validates blank submission', async ({ page }) => {
    await page.goto('/superadmin/integrations');
    const trigger = page.getByRole('button', { name: /generate api key/i });
    await expect(trigger).toBeVisible();
    await trigger.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    const submit = page.locator('[data-testid*="generate-api-key-modal"]').getByRole('button', { name: /generate|create|submit/i }).last();
    await expect(submit).toBeVisible();
    await submit.click();
    await expect(page.locator('[role="alert"]').first()).toBeVisible();
  });
});
