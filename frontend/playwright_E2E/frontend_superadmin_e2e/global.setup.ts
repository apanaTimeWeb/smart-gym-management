import { test as setup } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

setup('create auth state', async ({ page }) => {
  const cookieValue = encodeURIComponent(
    JSON.stringify({
      name: 'Super Admin',
      email: 'superadmin@gymsmart.com',
      role: 'superadmin',
    })
  );

  // Go to a dummy page on the domain so we can set a cookie
  await page.goto('/');

  // Set the cookie
  await page.context().addCookies([
    {
      name: 'gymsmart_user',
      value: cookieValue,
      domain: '127.0.0.1',
      path: '/',
    },
    {
      name: 'gymsmart_user',
      value: cookieValue,
      domain: 'localhost',
      path: '/',
    }
  ]);

  // Save the state
  await page.context().storageState({ path: 'storageState.json' });
});
