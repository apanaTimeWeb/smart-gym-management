import { test } from '@playwright/test';

/**
 * Admin auth setup — injects the gymsmart_user cookie directly so that
 * both the Next.js middleware (HTTP cookie) and the client-side usePermissions
 * hook (document.cookie) can read it. Avoids httpOnly pitfalls from server
 * actions that would block the JS permission gate from resolving the role.
 */
test('auth setup', async ({ page }) => {
  const cookieValue = encodeURIComponent(
    JSON.stringify({
      name: 'Demo Admin',
      email: 'admin@gymsmart.com',
      role: 'admin',
      tenantId: 'demo-tenant',
    })
  );

  // Navigate to the domain so cookies can be set
  await page.goto('http://localhost:3000/');

  // Inject cookie without httpOnly so document.cookie is readable client-side
  await page.context().addCookies([
    {
      name: 'gymsmart_user',
      value: cookieValue,
      domain: 'localhost',
      path: '/',
      httpOnly: false,
      sameSite: 'Lax',
    },
  ]);

  // Verify middleware accepts the cookie by navigating to the dashboard
  await page.goto('http://localhost:3000/frontend_admin/admin_dashboard');
  await page.waitForURL('**/admin_dashboard', { timeout: 10000 });

  // Save the auth state for all admin tests
  await page.context().storageState({ path: 'src/playwright_E2E/frontend_admin_e2e/adminAuth.json' });
});
