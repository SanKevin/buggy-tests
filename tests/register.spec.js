import { test, expect } from '@playwright/test';

test('Verificar registro de nuevo usuario', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/register');

  // Generar un usuario aleatorio para evitar duplicados
  const randomUser = 'user' + Math.floor(Math.random() * 10000);
  const password = 'Kensa@17a';

  // Llenar formulario de registro
  await page.fill('input[name="username"]', randomUser);
  await page.fill('input[name="firstName"]', 'Kevin');
  await page.fill('input[name="lastName"]', 'Santos');
  await page.fill('input[name="password"]', password);
  await page.fill('input[name="confirmPassword"]', password);

  // Enviar formulario
  await page.click('button[type="submit"]');

  // Verificar mensaje de éxito
  await expect(page.locator('text=Registration is successful')).toBeVisible({ timeout: 5000 });
  console.log(`✅ Registro exitoso del usuario: ${randomUser}`);
});
