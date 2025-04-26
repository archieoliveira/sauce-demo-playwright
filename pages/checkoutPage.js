class CheckOutPage { // definindo a classe
    
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
    };

    async submitForm(firstName = '', lastName = '', zipOrPostalCode = '') { // passando os argumentos que iremos preencher nos campos do formulário
        await this.firstNameInput
        .fill(firstName);
        
        await this.lastNameInput
        .fill(lastName);
        
        await this.zipOrPostalCodeInput
        .fill(zipOrPostalCode);
        
        await this.continueButton
        .click();
        
        await this.page
        .waitForURL('https://www.saucedemo.com/checkout-step-two.html')
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
};


module.exports = { CheckOutPage }; // exportando a classe CheckOutPage, tornando possível importar em outro arquivo do projeto
