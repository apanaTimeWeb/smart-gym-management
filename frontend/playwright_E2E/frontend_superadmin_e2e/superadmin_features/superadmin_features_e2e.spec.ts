import { test, expect } from '@playwright/test';

test.describe('superadmin_features critical flows', () => {
  test('opens canary rollout and preserves selectable tenant state', async ({ page }) => {
    await page.goto('/superadmin/features');
    const rollout = page.getByRole('button', { name: /canary rollout|rollout/i }).first();
    await expect(rollout).toBeVisible();
    await rollout.click();
    await expect(page.getByTestId('superadmin_features-features-feature-rollout-modal-dialog')).toBeVisible();
    await page.getByTestId('superadmin_features-features-feature-rollout-modal-select-all').click();
    await expect(page.getByTestId('superadmin_features-features-feature-rollout-modal-clear')).toBeVisible();
  });

});
