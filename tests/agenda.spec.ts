import { expect, test } from '@playwright/test';

test('cadastra, filtra e exclui um atendimento', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.getByLabel('Data do atendimento').fill('2026-11-16');
  await page.getByLabel('Cliente').fill('Ana Silva');
  await page.getByRole('button', { name: '13:00', exact: true }).click();
  await page.getByRole('button', { name: 'Agendar', exact: true }).click();

  const appointment = page.getByRole('listitem').filter({ hasText: 'Ana Silva' });
  await expect(appointment).toContainText('13:00');
  await expect(page.getByRole('button', { name: '13:00', exact: true })).toBeDisabled();
  await page.screenshot({ path: testInfo.outputPath('desktop.png'), fullPage: true });

  await page.getByLabel('Filtrar por data').fill('2026-11-17');
  await expect(appointment).toHaveCount(0);
  await page.getByLabel('Filtrar por data').fill('2026-11-16');
  await expect(appointment).toBeVisible();
  await page.getByRole('button', { name: 'Excluir agendamento de Ana Silva' }).click();
  await expect(appointment).toHaveCount(0);
  await expect(page.getByText('Nenhum agendamento neste período.')).toHaveCount(3);
});

test('ajusta o layout em tela estreita', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Sua agenda' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  await page.screenshot({ path: testInfo.outputPath('mobile.png'), fullPage: true });
});
