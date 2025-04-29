# Cenário de teste: Tela de checkout

## Background:
    #### Given o usuário esteja na página "https://www.saucedemo.com/checkout-step-one.html"

### Scenario outline ('Checkout com sucesso'): 
    #### When o usuário preenche todos os campos corretamente 
    (ex: First Name = 'John'; Last name = 'Doe'; Postal code = '12345-678')
    #### And clica em "Continue"
    #### Then vai para a página "https://www.saucedemo.com/checkout-step-two.html"
    #### And verifica se o produto e valor estão corretos
    #### And clica em "Finish"
    #### Then finaliza o fluxo 
    #### And aparece a mensagem de "Thank you for your order! Your order has been dispatched, and will arrive just as fast as the pony can get there!"

### Scenario outline ('Tentar avançar com formulário incompleto'): 
    #### When o usuário preenche 2 campos e deixa um vazio, independente de qual seja
    #### And tenta avançar com o botão de "Continue"
    #### Then deve exibir uma mensagem de erro apontando qual campo está vazio
    