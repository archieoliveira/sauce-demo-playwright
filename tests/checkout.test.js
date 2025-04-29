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
    await loginPage.successGoingCheckout(productsPage, cartPage); // já vai direto para a página de checkout
  });

  test('Checkout com sucesso', async ({ page }) => {
    await test.step('Preencher os campos', async () => {
      await checkoutPage.fillForm('John', 'Doe', '00000-000'); // passa os argumentos corretos para preencher o checkout e finalizar
    });

    await test.step('Clicar em "Continue"', async () => {
      await checkoutPage.submitForm(); // manda o formulário
      await loginPage.validatePage('https://www.saucedemo.com/checkout-step-two.html'); // valida se a página avançou
    });

    await test.step('Finalizar', async () => {
      await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack'); // confere se o produto do checkout está certo
      await checkoutPage.finishFlow(); // finaliza o checkout
    });
  });

  test('Tentar avançar com formulário incompleto', async ({ page }) => {
    const formFields = [ // criei um array com propriedade key:value para preencher os campos do formulário
      { field: '#first-name', name: 'First Name' },
      { field: '#last-name', name: 'Last Name' },
      { field: '#postal-code', name: 'Postal Code' }
    ];

    for (let i = 0; i < formFields.length; i++) {
      for (let j = 0; j < formFields.length; j++) { // fiz uma iteração para rodar como uma matriz 
        if (i === j) { // se nessa iteração o campo do eixo x for igual o do eixo y, pensando em uma matriz
          await page.fill(formFields[j].field, ''); // esse campo fica vazio, ou seja, a cada verificação somente um campo fica vazio
        } else { // caso contrário
          await page.fill(formFields[j].field, 'Teste'); // preenche o campo com "teste", visto que não tem uma validação de formato
        }
      }

      await test.step('Tentar prosseguir com o submit', async () => { // tenta dar submit no formulário com um campo faltando
      await checkoutPage.submitForm(false); // o formulário não deve conseguir ser enviado, por isso tem que retornar false
    })

      await test.step('Retornar mensagens de erro', async () => {
        const errorMessage = await page.locator('[data-test="error"]'); 
        await expect(errorMessage).toBeVisible(); // mostra a mensagem de erro
        await expect(errorMessage).toHaveText(`Error: ${formFields[i].name} is required`); // mostra qual campo está vazio, todos são obrigatórios
      });
    };
  });
});
// sugestão para essa página: não tem nenhum elemento visual que indique obrigatoriedade de todos os campos, como um *