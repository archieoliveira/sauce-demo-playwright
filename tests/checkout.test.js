import { test, expect } from '@playwright/test';
import { CheckOutPage } from '../pages/checkoutPage.js';
import { LoginPage } from '../pages/loginPage.js';
import { CartPage } from '../pages/cartPage.js';
import { ProductsPage } from '../pages/productsPage.js';

test.describe('Checkout', () => {
  let loginPage;
  let cartPage;
  let productsPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckOutPage(page);
    await loginPage.goto();
    await loginPage.successGoingCheckout(productsPage, cartPage);
  });

  test('Checkout com sucesso', async ({ page }) => {
    await test.step('Preencher os campos', async () => {
      await checkoutPage.fillForm('John', 'Doe', '00000-000');
    });

    await test.step('Clicar em "Continue"', async () => {
      await checkoutPage.submitForm();
      await loginPage.validatePage('https://www.saucedemo.com/checkout-step-two.html');
    });

    await test.step('Finalizar', async () => {
      await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
      await checkoutPage.finishFlow();
    });
  });

  test('Tentar avançar com formulário incompleto', async ({ page }) => {
    const formFields = [
      { field: '#first-name', name: 'First Name' },
      { field: '#last-name', name: 'Last Name' },
      { field: '#postal-code', name: 'Postal Code' }
    ];

    for (let i = 0; i < formFields.length; i++) {
      // Preenche todos os campos, exceto o atual
      for (let j = 0; j < formFields.length; j++) {
        if (i === j) {
          await page.fill(formFields[j].field, '');
        } else {
          await page.fill(formFields[j].field, 'Teste');
        }
      }

      await checkoutPage.submitForm(false);

      const errorMessage = await page.locator('[data-test="error"]'); // Seletor correto para erro no Sauce Demo
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText(`Error: ${formFields[i].name} is required`);

      // Opcional: Resetar o formulário ou recarregar página se necessário para o próximo ciclo
    }
  });
});
