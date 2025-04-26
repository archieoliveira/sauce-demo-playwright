class ProductsPage {
    constructor(page) {
        
        this.page = page;
        
        this.productTitle = page
        .locator('.inventory_item_name :text("Sauce Labs Backpack")');
        
        this.productDescription = page
        .locator('.inventory_item_desc :text("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.")');
        
        this.productPrice = page
        .locator('.inventory_item_price :text("$29.99")');
        
        this.addToCartButton = page
        .locator('#add-to-cart-sauce-labs-backpack');
        
        this.cartIcon = page
        .locator('.shopping_cart_link');

        this.cartIconBadge = page
        .locator('.shopping_cart_badge')
    };

    async goto(){
        await this.page
        .goto('https://www.saucedemo.com/inventory.html');
    };

    async selectProduct(){
        await this.productTitle.first().click();
    }

    async addToCart () {
        await this.addToCartButton.first().click();
    }

    async getCartItemCount() {
        const badgeExists = await this.cartIconBadge.count() > 0; // Verifica se o elemento existe
        return badgeExists ? await this.cartIconBadge.innerText() : '0'; // Retorna 0 se não houver itens
    }

    async goToCaart () {
        await this.cartIcon.click();
        await this.page
        .waitForURL('https://www.saucedemo.com/cart.html');
    }

    async getCartItemCount() {
        return await this.cartIconBadge.count() > 0 ? await this.cartIconBadge.innerText() : '0';
    }
};

module.exports = { ProductsPage };
