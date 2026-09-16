import { test, expect, type Page } from '@playwright/test';
import { StatusCodes } from 'http-status-codes';

const MANAGER_ROUTES = [
  '/manager/dashboard',
  '/manager/inquiries',
  '/manager/members',
  '/manager/attendance',
  '/manager/plans',
  '/manager/finance',
  '/manager/sales',
  '/manager/expenses',
  '/manager/reports',
  '/manager/hr',
  '/manager/schedule',
  '/manager/pt',
  '/manager/workout',
  '/manager/library',
  '/manager/communications',
  '/manager/referrals',
  '/manager/notifications',
  '/manager/store',
  '/manager/profile',
  '/manager/settings',
] as const;

async function signInAsManager(page: Page) {
  await page.goto('/auth/login');
  await page.getByLabel('Email').fill('manager@gymsmart.com');
  await page.getByLabel('Password').fill('demo123');
  await page.getByRole('button', { name: /sign in|login/i }).click();
  await expect(page).toHaveURL(/\/manager\/dashboard/);
}

test.describe('Manager critical journeys', () => {
  test.beforeEach(async ({ page }) => {
    await signInAsManager(page);
  });

  test('all Manager routes render without a server error', async ({ page }) => {
    for (const route of MANAGER_ROUTES) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBeLessThan(500);
      await expect(page.locator('body')).not.toContainText('Internal Server Error');
    }
  });

  test('manager can navigate and log out', async ({ page }) => {
    await page.getByRole('link', { name: 'Member Management' }).click();
    await expect(page).toHaveURL(/\/manager\/members/);
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL(/\/manager\/dashboard/);
    await page.getByRole('button', { name: 'Toggle profile menu' }).click();
    await page.getByRole('button', { name: 'Log out' }).click();
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('permission-denied responses surface the backend message', async ({ page }) => {
    await page.route('**/api/v1/manager/plans/membership-overview', async (route) => {
      await route.fulfill({
        status: StatusCodes.FORBIDDEN,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, message: 'Manager membership access denied.', data: null }),
      });
    });
    await page.goto('/manager/plans');
    await page.getByRole('button', { name: 'Membership Renew' }).click();
    await expect(page.getByText('Manager membership access denied.')).toBeVisible();
  });

  test('session expiry redirects away after an authenticated API returns 401', async ({ page }) => {
    await page.route('**/api/v1/manager/profile', async (route) => {
      await route.fulfill({
        status: StatusCodes.UNAUTHORIZED,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, message: 'Session expired.', data: null }),
      });
    });
    await page.goto('/manager/profile');
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('members CRUD requires the real modal and completes creation', async ({ page }) => {
    await page.goto('/manager/members');
    await page.getByRole('button', { name: 'Add Member' }).first().click();
    await expect(page.getByText('Add New Member')).toBeVisible();
    await page.getByLabel('Full Name').fill('E2E Manager Member');
    await page.getByLabel('Email').fill('e2e.member@example.com');
    await page.getByLabel('Phone').fill('9876543201');
    await page.getByLabel('Aadhaar No.').fill('123456789012');
    await page.getByLabel('Address').fill('Test Address');
    await page.getByText('Select plan...').click();
    await page.getByText('Annual Pro', { exact: true }).click();
    await page.getByRole('button', { name: 'Add Member' }).last().click();
    await expect(page.getByText('E2E Manager Member')).toBeVisible();
  });

  test('destructive member actions open the confirmation dialog before mutation', async ({ page }) => {
    await page.goto('/manager/members');
    const deleteButton = page.getByRole('button', { name: /Delete / }).first();
    await deleteButton.click();
    await expect(page.getByRole('heading', { name: 'Delete Member' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await page.getByRole('button', { name: 'Cancel' }).click();
  });

  test('billing/payment workflow exposes a real payment form', async ({ page }) => {
    await page.goto('/manager/members');
    const duesButton = page.getByRole('button', { name: /Collect Dues for / }).first();
    await duesButton.click();
    await expect(page.getByRole('heading', { name: 'Record Payment' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Confirm Payment' })).toBeVisible();
    await page.getByRole('button', { name: 'Cancel' }).click();
  });

  test('search, pagination controls, and CSV export are available on member tables', async ({ page }) => {
    await page.goto('/manager/members');
    const search = page.getByPlaceholder('Search by name or phone...');
    await search.fill('Aarav');
    await expect(page).toHaveURL(/search=Aarav/);
    await expect(page.getByRole('button', { name: /Export CSV/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Next|Next Page/i })).toBeVisible();
  });


  for (const viewport of [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 900 },
  ]) {
    test(`Manager shell remains usable at ${viewport.name} breakpoint`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/manager/dashboard');
      await expect(page.locator('body')).toBeVisible();
      await expect(page.getByRole('main')).toBeVisible();
    });
  }

  test('manager sidebar navigation reaches the dashboard', async ({ page }) => {
    await page.goto('/manager/dashboard');
    await page.getByRole('link', { name: 'Member Management' }).click();
    await expect(page).toHaveURL(/\/manager\/members/);
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL(/\/manager\/dashboard/);
  });
});
