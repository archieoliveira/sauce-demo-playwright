//Configurações globais do projeto Playwright desse diretório

module.exports = {
    use: {
      headless: false,
      viewport: { width: 1280, height: 720 },
      screenshot: 'only-on-failure',
      video: 'retain-on-failure'
    },
    testDir: './tests',
    retries: 0,
    timeout: 30000,
  };
  