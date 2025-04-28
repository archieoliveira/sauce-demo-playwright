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
}