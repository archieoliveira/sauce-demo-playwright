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
    await loginPage.successGoingProduct(); // método que já vai direto para a página de produtos
  });

  test('Adicionar um item ao carrinho', async ({ page }) => {
    await test.step('Verificar se o carrinho está vazio', async () => {
      const isEmpty = await cartPage.isCartEmpty();
      expect(isEmpty).toBe(true); // valida se o carrinho está vazio
    });

    await test.step('Adicionar item ao carrinho', async () => {
      await productsPage.addToCart(); // considera que o carrinho está vazio e adiciona o produto conforme o método foi definido na classe
    });
    
    await test.step('Ir para o carrinho', async () => {
        await productsPage.goToCart(); // vai para o carrinho conforme foi definido na classe
        await page.waitForURL('https://www.saucedemo.com/cart.html'); // valida se foi para o carrinho
    });

    await test.step('Verificar se o item foi adicionado ao carrinho', async () => {
        await expect(page.url()).toBe('https://www.saucedemo.com/cart.html'); // só para garantir, espera que url seja a do carrinho
        await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack'); // valida que o produto adicionado está condizente
    });
  });

  test('Verificar se o botão "Add to cart" muda para "Remove"', async ({ page }) => { 
    await test.step('Adicionar item ao carrinho', async () => {
      await productsPage.addToCart();
    });

    await test.step('Verificar se o botão mudou e se sim, clicar', async () => { 
      const isVisible = await productsPage.removeButtonProduct.isVisible(); // verifica se o botão com valor de remover está visivel
      if (isVisible) {
        await productsPage.removeButtonProductsClick(); // se está visivel, aplica o método de clicar nele
      }
    });
  })

  test('Testar filtros de ordenação da página', async ({ page }) => {
    await test.step('Testar ordem alfabética decrescente (Z => A)', async () => {
      await productsPage.isDescAlphabetical(); // esse método valida se os produtos estão em ordem alfabetica invertida
    })

    await test.step('Testar ordem de preço decrescente', async () => { 
      await productsPage.isPriceHighToLow(); // esse método valida se o preço está decrescente
    })

    await test.step('Testar ordem de preço ascendente', async () => {
      await productsPage.isPriceLowToHigh(); // esse método valida se o preço está crescente
    })

    await test.step('Tentar voltar para a ordem alfabética crescente (A => Z)', async () => {
      await productsPage.isAscAlphabetical(); // esse método valida se conseguimos voltar para o padrão, que é ordem alfabética crescente
    })
  })
});