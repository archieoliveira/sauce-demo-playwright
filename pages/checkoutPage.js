export class CheckOutPage { // definindo a classe e exportando
    
    constructor(page) {  // instanciando os objetos que iremos usar na página e associando seletores da página
        
        this.page = page;
        
        this.firstNameInput = page
        .locator('#first-name');

        this.lastNameInput = page
        .locator('#last-name');

        this.zipOrPostalCodeInput = page
        .locator('#postal-code');

        this.cancelButton = page
        .locator('#cancel')

        this.continueButton = page
        .locator('#continue')

        this.errorMessage = page
        .locator('.error-message-container.error')

        this.finishButton = page
        .locator('#finish')
    };

    async fillForm(firstName = '', lastName = '', zipOrPostalCode = '') { // passando os argumentos que iremos preencher nos campos do formulário
        await this.firstNameInput
        .fill(firstName);
        
        await this.lastNameInput
        .fill(lastName);
        
        await this.zipOrPostalCodeInput
        .fill(zipOrPostalCode);
    }

    async submitForm(expectNavigation = true) {
        await this.page.locator('#continue').click();
        if (expectNavigation) {
            await this.page.waitForURL('https://www.saucedemo.com/checkout-step-two.html');
        }
    }

    async getErrorMessage() {
        return await this.errorMessage
        .innerText();
    }

    async cancelCart() {
        await this.cancelButton
        .click()
        await this.page
        .waitForURL('https://www.saucedemo.com/cart.html');
    }

    async finishFlow() {
        await this.finishButton.click()
    }
}


