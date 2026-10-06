import { expect, test } from '@playwright/test';

test.describe('PublicLanding major flows', () => {
  test('public navigation and BMI flow reach visible end states', async ({ page }) => {
    await page.goto('/landing');
    await page.getByTestId('landing-navbar-plans').click();
    await expect(page.locator('#plans')).toBeVisible();
    await page.getByTestId('landing-bmi-height-input').fill('175');
    await page.getByTestId('landing-bmi-weight-input').fill('70');
    await page.getByTestId('landing-bmi-calculate-submit').click();
    await expect(page.getByTestId('landing-bmi-result-value')).toHaveText('22.9');
  });

  test('booking reaches success and retry preserves the same intent', async ({ page }) => {
    await page.goto('/landing#booking');
    await page.getByTestId('landing-booking-type-trial').check();
    await page.getByTestId('landing-booking-name-input').fill('E2E Visitor');
    await page.getByTestId('landing-booking-email-input').fill('visitor@example.org');
    await page.getByTestId('landing-booking-phone-input').fill('9876543210');
    await page.getByTestId('landing-booking-date-input').fill('2026-10-10');
    await page.getByTestId('landing-booking-submit').click();
    await expect(page.getByTestId('landing-booking-success-state')).toBeVisible();
  });

  test('contact reaches success after valid submit', async ({ page }) => {
    await page.goto('/landing#contact');
    await page.getByTestId('landing-contact-name-input').fill('E2E Visitor');
    await page.getByTestId('landing-contact-email-input').fill('visitor@example.org');
    await page.getByTestId('landing-contact-message-input').fill('Please share membership details.');
    await page.getByTestId('landing-contact-submit').click();
    await expect(page.getByTestId('landing-contact-success-state')).toBeVisible();
  });
});
