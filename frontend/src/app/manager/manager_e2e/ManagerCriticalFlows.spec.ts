import { test, expect } from '@playwright/test';
import { StatusCodes } from 'http-status-codes';
import type { Page } from '@playwright/test';


const MANAGER_ROUTES = [
  '/manager/dashboard', '/manager/inquiries', '/manager/members', '/manager/attendance',
  '/manager/plans', '/manager/finance', '/manager/sales', '/manager/expenses', '/manager/reports',
  '/manager/hr', '/manager/schedule', '/manager/pt', '/manager/workout', '/manager/library',
  '/manager/communications', '/manager/referrals', '/manager/notifications', '/manager/store',
  '/manager/profile', '/manager/settings', '/manager/grievance', '/manager/maintenance',
] as const;

async function signInAsManager(page: Page) {
  await page.goto('/auth/login');
  await page.getByLabel('Email').fill('manager@gymsmart.com');
  await page.getByLabel('Password').fill('demo123');
  await page.getByRole('button', { name: /sign in|login/i }).click();
  await expect(page).toHaveURL(/\/manager\/dashboard/);
}

async function openMemberRow(page: Page, memberName: string) {
  await expect(page.getByRole('button', { name: `Open member ${memberName}` })).toBeVisible();
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
    await page.route('**/manager/plans/membership-overview', async (route) => {
      await route.fulfill({ status: StatusCodes.FORBIDDEN, contentType: 'application/json', body: JSON.stringify({ success: false, message: 'Manager membership access denied.', data: null }) });
    });
    await page.goto('/manager/plans');
    await page.getByRole('button', { name: 'Membership Renew' }).click();
    await expect(page.getByText('Manager membership access denied.')).toBeVisible();
  });

  test('session expiry redirects away after an authenticated API returns 401', async ({ page }) => {
    await page.route('**/manager/profile', async (route) => {
      await route.fulfill({ status: StatusCodes.UNAUTHORIZED, contentType: 'application/json', body: JSON.stringify({ success: false, message: 'Session expired.', data: null }) });
    });
    await page.goto('/manager/profile');
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('members create → edit → delete flow reaches visible terminal states', async ({ page }) => {
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

    await page.getByRole('button', { name: 'Edit E2E Manager Member' }).click();
    await expect(page.getByRole('heading', { name: 'Edit Member' })).toBeVisible();
    await page.getByLabel('Email').fill('e2e.member.updated@example.com');
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByText('E2E Manager Member')).toBeVisible();

    await page.getByRole('button', { name: 'Delete E2E Manager Member' }).click();
    await expect(page.getByRole('heading', { name: 'Delete Member' })).toBeVisible();
    await page.getByRole('button', { name: 'Delete', exact: true }).last().click();
    await expect(page.getByRole('button', { name: 'Open member E2E Manager Member' })).toHaveCount(0);
  });

  test('destructive member action opens confirmation and cancel preserves the record', async ({ page }) => {
    await page.goto('/manager/members');
    await openMemberRow(page, 'Aarav Patel');
    await page.getByRole('button', { name: 'Delete Aarav Patel' }).click();
    await expect(page.getByRole('heading', { name: 'Delete Member' })).toBeVisible();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await openMemberRow(page, 'Aarav Patel');
  });

  test('billing/payment workflow completes confirmation and surfaces success', async ({ page }) => {
    await page.goto('/manager/members');
    const duesButton = page.getByRole('button', { name: /Collect Dues for / }).first();
    await duesButton.click();
    await expect(page.getByRole('heading', { name: 'Record Payment' })).toBeVisible();
    await page.getByLabel('Amount').fill('500');
    await page.getByRole('button', { name: 'Confirm Payment' }).click();
    await expect(page.getByRole('heading', { name: 'Confirm Payment' })).toBeVisible();
    await page.getByRole('button', { name: 'Record Payment' }).click();
    await expect(page.getByText('Payment recorded')).toBeVisible();
  });

  test('members search → filter → sort → pagination → CSV export all change the user-visible state', async ({ page }) => {
    await page.goto('/manager/members');
    const search = page.getByPlaceholder('Search by name or phone...');
    await search.fill('Aarav');
    await expect(page).toHaveURL(/search=Aarav/);
    await expect(page.getByText('Aarav Patel')).toBeVisible();

    const statusFilter = page.getByRole('button', { name: /Filter by status/i });
    await statusFilter.click();
    await page.getByRole('option', { name: 'Active' }).click();
    await expect(page).toHaveURL(/status=Active/i);

    await page.getByRole('button', { name: 'Sort by member' }).click();
    await expect(page.getByRole('columnheader', { name: /MEMBER/i })).toHaveAttribute('aria-sort', /ascending|descending/);

    await search.fill('');
    await expect(page).toHaveURL(/\/manager\/members/);
    const next = page.getByRole('button', { name: /Next( Page)?/i });
    if (await next.isEnabled()) {
      await next.click();
      await expect(page).toHaveURL(/page=2/);
    }

    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: /Export CSV/i }).click();
    const file = await download;
    expect(file.suggestedFilename()).toMatch(/manager_members_.*\.csv/);
  });

  test('failed member load can be retried and recovers to the real dataset', async ({ page }) => {
    let failed = false;
    await page.route('**/manager/members?*', async (route) => {
      if (!failed) {
        failed = true;
        await route.fulfill({ status: StatusCodes.SERVICE_UNAVAILABLE, contentType: 'application/json', body: JSON.stringify({ success: false, message: 'Temporary member service failure.', data: null }) });
        return;
      }
      await route.continue();
    });
    await page.goto('/manager/members');
    await expect(page.getByText('Temporary member service failure.')).toBeVisible();
    await page.getByRole('button', { name: 'Retry' }).click();
    await expect(page.getByText('Aarav Patel')).toBeVisible();
  });


  test('grievance create and resolve flows produce visible state changes', async ({ page }) => {
    await page.goto('/manager/grievance');
    await page.getByRole('button', { name: 'Log Complaint' }).click();
    await page.getByLabel('Member Name').fill('E2E Grievance Member');
    await page.getByLabel('Issue Description').fill('E2E complaint for regression coverage');
    await page.getByRole('button', { name: 'Log Complaint' }).last().click();
    await expect(page.getByText('E2E Grievance Member')).toBeVisible();
    await page.getByRole('button', { name: 'Resolve' }).first().click();
    await page.getByLabel('Resolution Note').fill('Issue resolved during E2E verification');
    await page.getByRole('button', { name: 'Submit Resolution' }).click();
    await expect(page.getByText('CLOSED')).toBeVisible();
  });

  test('maintenance create and resolve flows produce visible state changes', async ({ page }) => {
    await page.goto('/manager/maintenance');
    await page.getByRole('button', { name: 'Log Issue' }).click();
    await page.getByLabel('Issue Title').fill('E2E maintenance regression');
    await page.getByLabel('Equipment / Area').fill('Cardio Zone');
    await page.getByRole('button', { name: 'Log Issue' }).last().click();
    await expect(page.getByText('E2E maintenance regression')).toBeVisible();
    await page.getByRole('button', { name: 'Mark as Resolved' }).first().click();
    await expect(page.getByText('RESOLVED')).toBeVisible();
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
});
