import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { CartPage } from '../pages/cartPage.js';
import { ProductsPage } from '../pages/productsPage.js';

test.describe('Cart', () => {
  
  let loginPage;
  let cartPage;
  let productsPage;

  test.beforeEach(async ({ page }) => { 
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    productsPage = new ProductsPage(page);

    await loginPage.goto(); 
    await loginPage.login('standard_user', 'secret_sauce'); 
    await loginPage.validatePage('https://www.saucedemo.com/inventory.html'); 
    
  });

  test('Adicionar um item ao carrinho', async ({ page }) => {
    await test.step('Verificar se o carrinho está vazio', async () => {
      const isEmpty = await cartPage.isCartEmpty();
      expect(isEmpty).toBe(true); // valida se o carrinho está vazio
    });

    await test.step('Adicionar item ao carrinho', async () => {
      await productsPage.addToCart(); // adiciona o produto ao carrinho
    });
    
    await test.step('Ir para o carrinho', async () => {
        await productsPage.goToCart();
        await page.waitForURL('https://www.saucedemo.com/cart.html'); // valida se foi para a página do carrinho
    });

    await test.step('Verificar se o item foi adicionado ao carrinho', async () => {
        await expect(page.url()).toBe('https://www.saucedemo.com/cart.html'); // espera carregar a página do carrinho pra continuar
        await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack'); // valida se o nome do produto é o argumento passado no toHaveText
    });

    await test.step('Ir para o checkout', async () => {
      await cartPage.goToCheckout(); // tenta ir para o checkout
    });
    await test.step('Verificar URL do checkout', async () => {
      expect(page.url()).toBe('https://www.saucedemo.com/checkout-step-one.html'); // estando tudo certo, deve ser possível chegar até o checkout, mas para ai, por conta do escopo do teste
    });
  });

  test('Tentar ir para o checkout com o carrinho vazio', async ({ page }) => {
    await test.step('Verificar se o carrinho está vazio', async () => {
      const isEmpty = await cartPage.isCartEmpty();
      expect(isEmpty).toBe(true); // espera que o carrinho esteja 
    });

    await test.step('Tentar ir para o checkout', async () => {
      try {
        await cartPage.goToCheckout(); // tenta ir para o checkout com o carrinho vazio
        throw new Error('Deveria ter lançado erro ao tentar ir com o carrinho vazio!'); // exibe um erro falando que não pode avançar sem produto no carrinho
      } catch (error) { // valida o erro
        expect(error.message).toBe('❌ Não é possível avançar para o checkout com o carrinho vazio!'); // valida a mensagem correta
      }
    });
  });

  test('Clicar no botão "Continue Shopping"', async ({ page }) => {

    await test.step('Ir para o carrinho', async () => {
        await productsPage.goToCart();
        await page.waitForURL('https://www.saucedemo.com/cart.html'); // já vai para a página do carrinho
    });

    await test.step('Clicar no botão', async () => {
        await page.waitForSelector('.btn.btn_secondary.back.btn_medium'); // esperar o botão aparecer
        await cartPage.clickContinueShopping(); // clica no botão para continuar comprando, ou seja, deve voltar à pagina de produtos
    });

    await test.step('Validar se voltou para a tela de produtos', async () => {
        await page.waitForURL('**/inventory.html'); // espera voltar para continuar o teste
        await expect(page).toHaveURL(/.*inventory\.html/); // valida que voltou para a tela de produtos
    });
  });

  test('Testar botão de remover produto', async ({ page }) => {
    await test.step('Adicionar item ao carrinho', async () => {
        await productsPage.addToCart(); // adiciona o produto ao carrinho
    });
    
    await test.step('Verificar se o carrinho tem o produto', async () => {
      const isEmpty = await cartPage.isCartEmpty();
      expect(isEmpty).toBe(true); // espera que tenha item antes de remover
    });
  
    await test.step('Clicar no botão de remover', async () => {
      await cartPage.clickRemoveProduct(); // clica em remover o produto
    });
  
    await test.step('Verificar se removeu o produto', async () => {
      const isEmpty = await cartPage.isCartEmpty();
      expect(isEmpty).toBe(true); // depois de remover, carrinho deve estar vazio
    });
  });  
});
