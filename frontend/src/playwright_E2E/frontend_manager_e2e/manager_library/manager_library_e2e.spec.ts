import { test, expect } from '@playwright/test';
test.describe('manager_library critical user journey', () => {
  test('opens exercise creation and proves validation blocks an invalid submit', async ({ page }) => {
    await page.goto('/manager/library');
    await page.getByRole('tab', { name: 'Exercises' }).click();
    await page.getByRole('button', { name: 'Add Exercise' }).click();
    await expect(page.getByRole('dialog', { name: 'Add Exercise' })).toBeVisible();
    await page.getByRole('button', { name: 'Add Exercise', exact: true }).click();
    await expect(page.getByText('Exercise name is required')).toBeVisible();
  });
});

test('creates an exercise from the modal and shows success feedback', async ({ page }) => {
  await page.goto('/manager/library');
  await page.getByRole('tab', { name: 'Exercises' }).click();
  await page.getByRole('button', { name: 'Add Exercise' }).click();
  await page.getByTestId('manager_library-manager-library-exercise-modal-manager-library-exercise-name').fill('E2E Bench Press');
  await page.getByTestId('manager_library-manager-library-exercise-modal-manager-library-exercise-category').selectOption({ index: 1 });
  await page.getByTestId('manager_library-manager-library-exercise-modal-manager-library-exercise-muscle').fill('Chest');
  await page.getByTestId('manager_library-managerlibraryexercisemodal-managersearchabledropdown-1').getByTestId(/-trigger$/).click();
  await page.getByTestId('manager_library-managerlibraryexercisemodal-managersearchabledropdown-1').getByTestId(/-option-/).first().click();
  await page.getByTestId('manager_library-manager-library-exercise-modal-manager-library-exercise-sets').fill('3');
  await page.getByTestId('manager_library-manager-library-exercise-modal-manager-library-exercise-reps').fill('10');
  await page.getByTestId('manager_library-manager-library-exercise-modal-button-submit').click();
  await expect(page.getByTestId('ui-toast-status')).toBeVisible();
});
