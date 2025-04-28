import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';

test.describe('Login', () => {
  let loginPage; // definindo a variável loginPage da classe

  test.beforeEach(async ({ page }) => { // o beforeeach faz voltar a esse ponto onde aguarda voltar à pagina inicial pra executar cada teste
    loginPage = new LoginPage(page);
    await loginPage.goto(); 
  });

  test('Fazer login com credenciais corretas', async ({ page }) => { // um caso de teste, com o nome descrevendo seu objetivo
    await test.step('Preencher o usuário', async () => { // os steps servem para quebrar cada caso de teste em pedaços menores, facilitando o debug
      await loginPage.fillUsername('standard_user'); // await para manter o funcionamento dos métodos assíncronos, 
      // utilizando o método fillUsername feito no arquivo da classe e passando o argumento 'standard_user' para preencher o respectivo campo Username
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

  test('Tentar login com username vazio', async ({ page }) => { // outro caso de teste para verificar se o sistema está apresentando o erro esperado quando tentar fazer
    // o login com o username vazio
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
// se todos os testes tiverem o resultado conforme esperado, o terminal deve retornar que os testes foram feitos com sucesso e o tempo de execução deles