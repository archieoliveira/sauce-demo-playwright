# Cenário de teste: Tela de produtos

## Background:
    #### Given o usuário esteja na página "https://www.saucedemo.com/inventory.html"

### Scenario outline ('Adicionar um item ao carrinho'): 
    #### When o usuário clica em "add to cart" no produto "Sauce Labs Backpack"
    #### And clica no ícone do carrinho no canto superior direito
    #### Then vai para a página "https://www.saucedemo.com/cart.html"
    #### And no carrinho deve estar o produto adicionado

### Scenario outline ('Verificar se o botão "Add to cart" muda para "Remove"'):
    #### When o usuário clica em "add to cart" no produto "Sauce Labs Backpack"
    #### And o botão deve alterar para "remove"
    #### And o usuário clica novamente
    #### Then o produto é removido

### Scenario outline ('Testar filtros de ordenação da página'):
    #### When o usuário clica no dropdown de ordem
    #### And clica na opção do seletor "Name (Z to A)"
    #### Then os produtos são ordenados de Z a A

    #### When o usuário clica na opção do seletor "Price (low to high)"
    #### Then os produtos são ordenados do menor ao maior preço

    #### When o usuário clica na opção do seletor "Price (high to low)"
    #### Then os produtos são ordenados do maior ao menor preço

    #### When o usuário clica na opção do seletor "Name (A to Z)"
    #### Then volta ao padrão, com os produtos organizados em ordem alfabética