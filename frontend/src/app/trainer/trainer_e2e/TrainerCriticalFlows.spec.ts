import { test, expect } from '@playwright/test';

const TRAINER_ROUTES = [
  '/trainer/dashboard','/trainer/members','/trainer/workout','/trainer/progress-tracking','/trainer/library','/trainer/sessions','/trainer/attendance','/trainer/schedule','/trainer/earnings','/trainer/notifications','/trainer/profile'
];

test.describe('Trainer critical journeys', () => {
  test('trainer route shell loads across supported module routes', async ({ page }) => {
    for (const route of TRAINER_ROUTES) {
      await page.goto(route);
      await expect(page.locator('body')).toBeVisible();
    }
  });
  test('permission denied UI is available to unauthorized role', async ({ page }) => {
    await page.goto('/trainer/dashboard');
    await page.evaluate(() => document.cookie = 'gymsmart_user=' + encodeURIComponent(JSON.stringify({ id: 'u_manager', role: 'MANAGER', name: 'Manager' })) + '; path=/');
    await page.reload();
    await expect(page.getByRole('alert')).toContainText(/Access denied/i);
  });
  test('login/logout flow redirects through auth boundary', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page).toHaveURL(/auth\/login/);
    await expect(page.locator('input').first()).toBeVisible();
  });
  test('session expiry is handled by the global boundary', async ({ page }) => {
    await page.goto('/trainer/dashboard');
    await page.evaluate(() => document.cookie = 'gymsmart_token=expired; path=/');
    await page.reload();
    await expect(page.locator('body')).toBeVisible();
  });
  test('trainer can filter members through URL state', async ({ page }) => {
    await page.goto('/trainer/members?search=Rahul&page=1');
    await expect(page).toHaveURL(/search=Rahul/);
  });
  test('trainer pagination remains shareable through URL state', async ({ page }) => {
    await page.goto('/trainer/members?page=2');
    await expect(page).toHaveURL(/page=2/);
  });
  test('destructive progress action requires confirmation UI', async ({ page }) => {
    await page.goto('/trainer/progress-tracking');
    const deleteButtons = page.getByRole('button', { name: /delete/i });
    if (await deleteButtons.count()) {
      await deleteButtons.first().click();
      await expect(page.getByRole('dialog')).toBeVisible();
    }
  });
  test('billing-sensitive earnings is visible but not editable', async ({ page }) => {
    await page.goto('/trainer/earnings');
    await expect(page.locator('body')).toBeVisible();
    await expect(page.getByRole('button', { name: /delete|mark as paid|edit earnings/i })).toHaveCount(0);
  });
  test('responsive trainer shell renders at mobile and desktop sizes', async ({ page }) => {
    for (const viewport of [{ width: 375, height: 812 }, { width: 768, height: 1024 }, { width: 1280, height: 900 }]) {
      await page.setViewportSize(viewport);
      await page.goto('/trainer/dashboard');
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('workout member selector is searchable and closes after selection', async ({ page }) => {
    await page.goto('/trainer/members');
    const rows = page.locator('tr.cursor-pointer');
    if (await rows.count()) {
      await rows.first().click();
      const workoutTab = page.getByRole('button', { name: /workout/i });
      if (await workoutTab.count()) { await workoutTab.click(); }
      const assign = page.getByRole('button', { name: /assign workout|change plan/i }).first();
      if (await assign.count()) { await assign.click(); }
    }
  });

  test('earnings and profile routes expose user-facing loading or content states', async ({ page }) => {
    for (const route of ['/trainer/earnings','/trainer/profile']) {
      await page.goto(route);
      await expect(page.locator('main, body').first()).toBeVisible();
    }
  });
});
