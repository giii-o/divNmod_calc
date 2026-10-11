import { expect, test } from '@playwright/test';

test('renders the calculator UI and accepts keypad input', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /hello div n mod calc/i })).toBeVisible();
  await expect(page.getByRole('button', { name: '7' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Delete last character' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Enter' })).toBeVisible();

  await page.getByRole('button', { name: '7' }).click();
  await expect(page.locator('.display')).toContainText('7');
});
