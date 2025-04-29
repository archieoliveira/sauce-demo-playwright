import { expect } from '@playwright/test';

export class ProductsPage {
    constructor(page) {
        
        this.page = page;
        
        this.productTitle = page
        .locator('.inventory_item_name:text("Sauce Labs Backpack")');
        
        this.productDescription = page
        .locator('.inventory_item_desc :text("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.")');
        
        this.productPrice = page
        .locator('.inventory_item_price :text("$29.99")');
        
        this.addToCartButton = page
        .locator('#add-to-cart-sauce-labs-backpack');

        this.removeButtonProduct = page
        .locator('button', { hasText: 'Remove' });
        
        this.cartIcon = page
        .locator('.shopping_cart_link');

        this.cartIconBadge = page
        .locator('.shopping_cart_badge')

        this.orderBySelector = page
        .locator('.product_sort_container')
    }

    async selectProduct(){
        await this.productTitle.first().click();
    };

    async addToCart () {
        await this.addToCartButton.first().click();
    };

    async removeButtonProductsClick() {
        await this.removeButtonProduct.click();
      }

    async getCartItemCount() {
        const badgeExists = await this.cartIconBadge.count() > 0; // verifica se o elemento existe
        return badgeExists ? await this.cartIconBadge.innerText() : '0'; // retorna 0 se não houver itens (seria igual um 'false')
    };

    async goToCart () {
        await this.cartIcon.click();
        await this.page
        .waitForURL('https://www.saucedemo.com/cart.html');
    };

    async getCartItemCount() {
        return await this.cartIconBadge.count() > 0 ? await this.cartIconBadge.innerText() : '0';
    };

    async validateInventoryPage() {
        await this.page.waitForURL('https://www.saucedemo.com/inventory.html');
    };

    async isAscAlphabetical() {
        await this.orderBySelector.selectOption('az'); 
        await this.page.waitForLoadState('networkidle');
        const productNames = await this.page.locator('.inventory_item_name').allTextContents();
        const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));
        expect(productNames, 'Produtos não estão ordenados de A para Z').toEqual(sortedNames);
    };
    
    async isDescAlphabetical() {
        await this.orderBySelector.selectOption('za'); 
        await this.page.waitForLoadState('networkidle');
        const productNames = await this.page.locator('.inventory_item_name').allTextContents();
        const sortedNames = [...productNames].sort((a, b) => b.localeCompare(a));
        expect(productNames, 'Produtos não estão ordenados de Z para A').toEqual(sortedNames);
    }
    
    async isPriceHighToLow() {
        await this.orderBySelector.selectOption('hilo'); 
        await this.page.waitForLoadState('networkidle');
        const productPricesText = await this.page.locator('.inventory_item_price').allTextContents();
        const productPrices = productPricesText.map(price => parseFloat(price.replace('$', '')));
        const sortedPrices = [...productPrices].sort((a, b) => b - a);
        expect(productPrices, 'Preços não estão ordenados do maior para o menor').toEqual(sortedPrices);
    };
    
    async isPriceLowToHigh() {
        await this.orderBySelector.selectOption('lohi'); 
        await this.page.waitForLoadState('networkidle');
        const productPricesText = await this.page.locator('.inventory_item_price').allTextContents();
        const productPrices = productPricesText.map(price => parseFloat(price.replace('$', '')));
        const sortedPrices = [...productPrices].sort((a, b) => a - b);
        expect(productPrices, 'Preços não estão ordenados do menor para o maior').toEqual(sortedPrices);
    };
};    
