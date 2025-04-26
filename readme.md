## TESTE TÉCNICO AUVO - SAUCE DEMO

## Automação de testes funcionais do mock site Sauce Demo utilizando Playwright framework e paradigma POM (Page Object Model);

## Este projeto tem como objetivo validas as funcionalidades de login utilizando as credenciais permitidas pelos desenvolvedores, adição de produtos ao carrinho, remoção de itens e checkout/finalização da compra.

## Como instalar o projeto:

## 1 - Clonar o repositório, comando => git clone 

## 2 - Acessar a pasta cd Sauce-demo-playwright

## 3 - Instale as dependências => npm init playwright@latest ou yarn create playwright

## 4 - Execução dos testes => npx playwright test ou yarn playwright test

## 5 - Executar um teste específico => npx playwright test tests/>teste<>.js ou yarn playwright test tests/>teste<.spec.js

## Obs: A versão do playwright deve ser superior a 1.43.1, para verificar a versão atual você pode usar o comando => npx playwright --version ou yarn playwright --version, caso não esteja condizendo, pode atualizar com => npm install -D @playwright/test@latest ou yarn add --dev @playwright/test@latest