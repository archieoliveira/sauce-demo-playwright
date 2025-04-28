import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';

test.describe('Login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Fazer login com credenciais corretas', async ({ page }) => {
    await test.step('Preencher o usuário', async () => {
      await loginPage.fillUsername('standard_user');
    });

    await test.step('Preencher a senha', async () => {
      await loginPage.fillPassword('secret_sauce');
    });

    await test.step('Clicar no botão de login', async () => {
      await loginPage.clickLogin();
    });

    await test.step('Validar redirecionamento para o inventário', async () => {
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
  });

  test('Tentar login com username vazio', async ({ page }) => {
    await test.step('Deixar o campo de usuário vazio', async () => {
      await loginPage.fillUsername('');
    });

    await test.step('Preencher a senha', async () => {
      await loginPage.fillPassword('secret_sauce');
    });

    await test.step('Clicar no botão de login', async () => {
      await loginPage.clickLogin();
    });

    await test.step('Validar mensagem de erro', async () => {
      const errorMessage = await loginPage.getErrorMessage();
      await expect(errorMessage).toContainText('Username is required');
    });
  });

  test('Tentar login com senha incorreta', async ({ page }) => {
    await test.step('Preencher o usuário correto', async () => {
      await loginPage.fillUsername('standard_user');
    });

    await test.step('Preencher uma senha errada', async () => {
      await loginPage.fillPassword('senha_errada');
    });

    await test.step('Clicar no botão de login', async () => {
      await loginPage.clickLogin();
    });

    await test.step('Validar mensagem de erro de credenciais inválidas', async () => {
      const errorMessage = await loginPage.getErrorMessage();
      await expect(errorMessage).toContainText('Username and password do not match any user in this service');
    });
  });

  // ✅ NOVO TESTE 2: Usuário bloqueado
  test('Tentar login com usuário bloqueado', async ({ page }) => {
    await test.step('Preencher o usuário bloqueado', async () => {
      await loginPage.fillUsername('locked_out_user');
    });

    await test.step('Preencher a senha correta', async () => {
      await loginPage.fillPassword('secret_sauce');
    });

    await test.step('Clicar no botão de login', async () => {
      await loginPage.clickLogin();
    });

    await test.step('Validar mensagem de usuário bloqueado', async () => {
      const errorMessage = await loginPage.getErrorMessage();
      await expect(errorMessage).toContainText('Sorry, this user has been locked out.');
    });
  });

});
