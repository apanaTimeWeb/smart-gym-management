import { test, expect } from '@playwright/test';

const SUPERADMIN_ROUTES = [
  { path: '/reports', label: 'reports' }, { path: '/tickets', label: 'tickets' },
  { path: '/backups', label: 'backups' }, { path: '/plans', label: 'plans' },
  { path: '/gyms', label: 'gyms' }, { path: '/gyms/add', label: 'gyms add' },
  { path: '/gyms/t1', label: 'gym detail' }, { path: '/features', label: 'features' },
  { path: '/coupons', label: 'coupons' }, { path: '/usage-meters', label: 'usage-meters' },
  { path: '/settings', label: 'settings' }, { path: '/branches', label: 'branches' },
  { path: '/dashboard', label: 'dashboard' }, { path: '/franchises', label: 'franchises' },
  { path: '/jobs', label: 'jobs' }, { path: '/broadcasts', label: 'broadcasts' },
  { path: '/global-audit', label: 'global-audit' }, { path: '/invoices', label: 'invoices' },
  { path: '/onboarding', label: 'onboarding' }, { path: '/system', label: 'system' },
  { path: '/analytics', label: 'analytics' }, { path: '/profile', label: 'profile' },
  { path: '/cancellations', label: 'cancellations' }, { path: '/affiliates', label: 'affiliates' },
  { path: '/migrations', label: 'migrations' }, { path: '/messaging', label: 'messaging' },
  { path: '/infrastructure', label: 'infrastructure' },
] as const;

test.describe('Superadmin backendless route smoke', () => {
  for (const route of SUPERADMIN_ROUTES) {
    test(`${route.label} renders with backendless data`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: 'domcontentloaded' });
      await expect(page).not.toHaveURL(/\/login(?:\?|$)/);
      await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
      await expect(page.locator('body')).not.toContainText(/Application error|Unhandled Runtime Error|Cannot read properties/);
    });
  }

  test('Gyms: onboarding route opens from the page CTA', async ({ page }) => {
    await page.goto('/gyms', { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: /Onboard New Gym/i }).click();
    await expect(page).toHaveURL(/\/gyms\/add(?:\?|$)/);
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('Gyms: delete requires type-to-confirm before enabling the danger action', async ({ page }) => {
    await page.goto('/gyms', { waitUntil: 'domcontentloaded' });
    const deleteButtons = page.getByRole('button', { name: /delete gym|delete/i });
    if (await deleteButtons.count()) {
      await deleteButtons.first().click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      const confirmButton = dialog.getByRole('button', { name: /delete/i }).last();
      await expect(confirmButton).toBeDisabled();
      await dialog.getByRole('textbox').last().fill('DELETE');
      await expect(confirmButton).toBeEnabled();
    }
  });

  test('Messaging: compose dialog exposes an accessible close action', async ({ page }) => {
    await page.goto('/messaging', { waitUntil: 'domcontentloaded' });
    const compose = page.getByRole('button', { name: /compose|new message|send message/i });
    if (await compose.count()) {
      await compose.first().click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole('button', { name: /close/i })).toBeVisible();
    }
  });
});
