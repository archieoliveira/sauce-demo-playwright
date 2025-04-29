    import { expect } from '@playwright/test';

    export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]'); // adicionei para capturar o erro também
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async fillUsername(username) {
        await this.usernameInput.fill(username);
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async login(username = '', password = '') {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    async getErrorMessage() {
        return this.errorMessage;
    }

    async validatePage(urlExpected = '') { // 
        const urlToWaitFor = urlExpected || 'https://www.saucedemo.com/inventory.html'
    };

    async successGoingCheckout(productsPage, cartPage) {
        await this.fillUsername('standard_user');
        await this.fillPassword('secret_sauce');
        await this.clickLogin();
        const isEmpty = await cartPage.isCartEmpty();
        expect(isEmpty).toBe(true);
        await productsPage.addToCart();
        await productsPage.goToCart();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(this.page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
        await cartPage.goToCheckout();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    };

    async successGoingCart(productsPage, cartPage) {
        await this.fillUsername('standard_user');
        await this.fillPassword('secret_sauce');
        await this.clickLogin();
        await productsPage.addToCart();
        await productsPage.goToCart(); // Primeiro ir para a página de carrinho
        await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
    }

    async successGoingProduct(cartPage) {
        await this.fillUsername('standard_user');
        await this.fillPassword('secret_sauce');
        await this.clickLogin();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    };
};