class CartPage { // definindo a classe
    constructor(page) { // instanciando os objetos que iremos usar na página e associando seletores da página
        
        this.page = page;
        this.cartItemTitle = page
        .locator('.inventory_item_name :text("Sauce Labs Backpack")');

        this.cartItemDescription = page
        .locator('.inventory_item_desc :text("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.")');
        
        this.cartItemtPrice = page
        .locator('.inventory_item_price :text("$29.99")');

        this.checkoutButton = page
        .locator('#checkout');

        this.removeButton = page
        .locator('#remove-sauce-labs-backpack');

        this.continueShoppingButton = page
        .locator('#continue-shopping'); 
    };

    async goToCheckout() { 
        if (await this.isCartEmpty()) {
            throw new Error('❌ Não é possível avançar para o checkout com o carrinho vazio!');
        }
        await this.checkoutButton
        .click();
        await this.page.waitForURL('https://www.saucedemo.com/checkout-step-one.html');
    }

    async isCartEmpty() {
        return await this.cartItems.count() === 0; // Retorna true se não houver itens
    }
};


module.exports = { CartPage }; // exportando a classe CartPage, tornando possível importar em outro arquivo do projeto
