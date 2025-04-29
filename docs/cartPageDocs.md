# Cenário de teste: Tela de checkout

## Background:
    #### Given o usuário esteja na página "https://www.saucedemo.com/cart.html"

### Scenario outline ('Adicionar um item ao carrinho'): 
    #### When o usuário adiciona um item no carrinho
    #### And clica no ícone do carrinho no canto superior direito
    #### Then o produto deve ter sido adicionado no carrinho
    #### And deve ser possível prosseguir para o checkout clicando no botão "Checkout"

### Scenario outline ('Tentar ir para o checkout com o carrinho vazio'): 
    #### When o carrinho está vazio
    #### And o usuário clica para ir para o checkout
    #### Then deve exibir uma mensagem de erro, informando que não é possível avançar sem itens no carrinho

### Scenario outline ('Clicar no botão "Continue Shopping"'):
    #### When o usuário clica no botão "Continue shopping"
    #### Then deve voltar à pagina de produtos

### Scenario outline ('Testar botão de remover produto'):
    #### When o usuário está na tela de produtos
    #### And adiciona um produto no carrinho
    #### And clica no botão de remover depois que ele aparece
    #### Then o botão deve voltar a ter o texto "Add to cart", mostrando que foi excluído

