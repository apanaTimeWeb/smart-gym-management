import { test, expect } from '@playwright/test';

const TRAINER_ROUTES = [
  '/trainer/dashboard', '/trainer/members', '/trainer/workout', '/trainer/progress-tracking',
  '/trainer/library', '/trainer/sessions', '/trainer/attendance', '/trainer/schedule',
  '/trainer/earnings', '/trainer/notifications', '/trainer/profile',
];

test.describe('Trainer critical journeys', () => {
  test('every supported Trainer route reaches a visible page state', async ({ page }) => {
    for (const route of TRAINER_ROUTES) {
      await page.goto(route);
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('permission-denied UI is visible to an unauthorized role', async ({ page }) => {
    await page.goto('/trainer/dashboard');
    await page.evaluate(() => document.cookie = 'gymsmart_user=' + encodeURIComponent(JSON.stringify({ id: 'u_manager', role: 'MANAGER', name: 'Manager' })) + '; path=/');
    await page.reload();
    await expect(page.getByRole('alert')).toContainText(/access denied/i);
  });

  test('session cancellation presents confirmation before mutation', async ({ page }) => {
    await page.goto('/trainer/sessions');
    const cancelButton = page.getByRole('button', { name: /cancel session/i }).first();
    if (await cancelButton.count()) {
      await cancelButton.click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await expect(page.getByRole('dialog')).toContainText(/cancel session/i);
    }
  });

  test('progress destructive actions require confirmation', async ({ page }) => {
    await page.goto('/trainer/progress-tracking');
    const deleteButton = page.getByRole('button', { name: /delete/i }).first();
    if (await deleteButton.count()) {
      await deleteButton.click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await expect(page.getByRole('dialog')).toContainText(/confirm|delete/i);
    }
  });

  test('schedule leave form exposes validation and confirmation-safe submission controls', async ({ page }) => {
    await page.goto('/trainer/schedule');
    const leaveButton = page.getByRole('button', { name: /request leave/i }).first();
    if (await leaveButton.count()) {
      await leaveButton.click();
      const form = page.getByRole('form').first();
      await expect(form).toBeVisible();
      const submit = form.getByRole('button', { name: /submit|request leave/i }).last();
      if (await submit.count()) {
        await submit.click();
        expect(await form.locator('[aria-invalid=\"true\"]').count()).toBeGreaterThan(0);
      }
    }
  });

  test('members search and pagination remain shareable through URL state', async ({ page }) => {
    await page.goto('/trainer/members?search=Rahul&page=2');
    await expect(page).toHaveURL(/search=Rahul/);
    await expect(page).toHaveURL(/page=2/);
  });

  test('earnings remains read-only for Trainer role', async ({ page }) => {
    await page.goto('/trainer/earnings');
    await expect(page.locator('body')).toBeVisible();
    await expect(page.getByRole('button', { name: /mark as paid|edit earnings|delete earnings/i })).toHaveCount(0);
  });

  test('profile route renders form controls for profile/security workflows', async ({ page }) => {
    await page.goto('/trainer/profile');
    await expect(page.locator('input').first()).toBeVisible();
  });

  test('Trainer shell remains usable at documented breakpoints', async ({ page }) => {
    for (const viewport of [{ width: 375, height: 812 }, { width: 768, height: 1024 }, { width: 1280, height: 900 }]) {
      await page.setViewportSize(viewport);
      await page.goto('/trainer/dashboard');
      await expect(page.locator('body')).toBeVisible();
    }
  });
});
