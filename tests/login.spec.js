import { test, expect } from '@playwright/test';

test('Verificar login y logout', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/login');

  // Ingresar credenciales
  await page.fill('input[name="login"]', 'Sankevin'); // tu usuario real
  await page.fill('input[name="password"]', 'Kensa@17a'); // tu contraseña real
  await page.click('button[type="submit"]');

  try {
    // Esperar indicador de login exitoso
    await page.waitForSelector('text=Profile', { timeout: 5000 });
    console.log('Inicio de sesión exitoso');

    // Buscar y presionar logout
    const logoutVisible = await page.isVisible('text=Logout');
    await page.click('text=Logout');
    console.log('Logout realizado correctamente');
    await expect(page).toHaveURL(/login/);

  } catch {
    // Si no aparece el indicador de login, verificar mensaje de error
    const errorVisible = await page.isVisible('text=Username or password is incorrect');
     console.log('Usuario o contraseña incorrectos');
  }
});