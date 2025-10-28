import { test, expect } from '@playwright/test';

test('Verificar que el usuario pueda votar por un auto', async ({ page }) => {
  // Iniciar sesión
  await page.goto('https://buggy.justtestit.org/login');
  await page.fill('input[name="login"]', 'Sankevin');
  await page.fill('input[name="password"]', 'Kensa@17a');
  await page.click('button[type="submit"]');

  // Esperar a que cargue la página de perfil
  await page.waitForSelector('text=Profile');

  // Ir a la sección de autos populares
  await page.click('text=Popular Make');

  // Esperar que aparezca lista de autos y votar por el primero
  const firstVoteButton = page.locator('button:has-text("Vote!")').first();
  await firstVoteButton.click();

  // Verificar confirmación o mensaje
  await expect(page.locator('text=Thank you for your vote!')).toBeVisible({ timeout: 5000 });
  console.log('✅ Voto realizado correctamente');
});
