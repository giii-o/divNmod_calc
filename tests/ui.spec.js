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

test('calculates div and mod expressions', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: '2' }).click();
  await page.getByRole('button', { name: '0' }).click();
  await page.getByRole('button', { name: 'div' }).click();
  await page.getByRole('button', { name: '3' }).click();
  await page.getByRole('button', { name: 'Enter' }).click();

  await expect(page.getByTestId('result')).toHaveText('6');

  await page.getByRole('button', { name: 'clear' }).click();
  await page.getByRole('button', { name: '2' }).click();
  await page.getByRole('button', { name: '0' }).click();
  await page.getByRole('button', { name: 'mod' }).click();
  await page.getByRole('button', { name: '3' }).click();
  await page.getByRole('button', { name: 'Enter' }).click();

  await expect(page.getByTestId('result')).toHaveText('2');
});

test('reports division by zero', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: '7' }).click();
  await page.getByRole('button', { name: 'div' }).click();
  await page.getByRole('button', { name: '0' }).click();
  await page.getByRole('button', { name: 'Enter' }).click();

  await expect(page.getByRole('alert')).toContainText('cannot be divided');
});
