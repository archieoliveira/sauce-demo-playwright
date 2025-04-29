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
      await productsPage.addToCart();
    });
    
    await test.step('Ir para o carrinho', async () => {
        await productsPage.goToCart();
        await page.waitForURL('https://www.saucedemo.com/cart.html');
    });

    await test.step('Verificar se o item foi adicionado ao carrinho', async () => {
        await expect(page.url()).toBe('https://www.saucedemo.com/cart.html');
        await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    });

    await test.step('Ir para o checkout', async () => {
      await cartPage.goToCheckout();
    });
    await test.step('Verificar URL do checkout', async () => {
      expect(page.url()).toBe('https://www.saucedemo.com/checkout-step-one.html');
    });
  });

  test('Tentar ir para o checkout com o carrinho vazio', async ({ page }) => {
    await test.step('Verificar se o carrinho está vazio', async () => {
      const isEmpty = await cartPage.isCartEmpty();
      expect(isEmpty).toBe(true);
    });

    await test.step('Tentar ir para o checkout', async () => {
      try {
        await cartPage.goToCheckout();
        throw new Error('Deveria ter lançado erro ao tentar ir com o carrinho vazio!');
      } catch (error) {
        expect(error.message).toBe('❌ Não é possível avançar para o checkout com o carrinho vazio!');
      }
    });
  });

  test('Clicar no botão "Continue Shopping"', async ({ page }) => {

    await test.step('Ir para o carrinho', async () => {
        await productsPage.goToCart();
        await page.waitForURL('https://www.saucedemo.com/cart.html');
    });

    await test.step('Clicar no botão', async () => {
        await page.waitForSelector('.btn.btn_secondary.back.btn_medium'); // Esperar o botão aparecer
        await cartPage.clickContinueShopping();
    });

    await test.step('Validar se voltou para a tela de produtos', async () => {
        await page.waitForURL('**/inventory.html');
        await expect(page).toHaveURL(/.*inventory\.html/);
    });
  });

  test('Testar botão de remover produto', async ({ page }) => {
    await test.step('Adicionar item ao carrinho', async () => {
        await productsPage.addToCart();
    });
    
  
    await test.step('Verificar se o carrinho tem o produto', async () => {
      const isEmpty = await cartPage.isCartEmpty();
      expect(isEmpty).toBe(true); // Espera que tenha item antes de remover
    });
  
    await test.step('Clicar no botão de remover', async () => {
      await cartPage.clickRemoveProduct();
    });
  
    await test.step('Verificar se removeu o produto', async () => {
      const isEmpty = await cartPage.isCartEmpty();
      expect(isEmpty).toBe(true); // Depois de remover, carrinho deve estar vazio
    });
  });  
});
