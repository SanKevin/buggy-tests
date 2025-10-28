import { test, expect } from '@playwright/test';

test('Verificar que el usuario pueda agregar un comentario en un modelo', async ({ page }) => {
  // Iniciar sesión
  await page.goto('https://buggy.justtestit.org/login');
  await page.fill('input[name="login"]', 'Sankevin');
  await page.fill('input[name="password"]', 'Kensa@17a');
  await page.click('button[type="submit"]');

  // Esperar perfil
  await page.waitForSelector('text=Profile');

  // Ir a la sección de autos populares
  await page.click('text=Popular Make');
  await page.click('a:has-text("Alfa Romeo")'); // Ejemplo de marca (puedes cambiarla)
  await page.click('a:has-text("Giulia Quadrifoglio")'); // Modelo (ajusta si no existe)

  // Escribir comentario
  const comentario = 'Excelente modelo, me gusta su diseño deportivo.';
  await page.fill('textarea', comentario);
  await page.click('button:has-text("Submit")');

  // Verificar que aparezca el comentario
  await expect(page.locator(`text=${comentario}`)).toBeVisible({ timeout: 5000 });
  console.log('✅ Comentario agregado correctamente');
});
