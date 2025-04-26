##### Cenário de teste: Login

## Background:
    # Given o usuário esteja na página inicial "https://www.saucedemo.com"

## Scenario outline: Fazer login com credenciais corretas
    # When preenche o campo "Username" com um dos nomes de usuário credenciados a seguir: "standard_user"; "locked_out_user"; "problem_user"; "performance_glitch_user"; "error_user"; "visual_user"
    # And preenche o campo "Password" com a senha credenciada "secret_sauce"
    # And pressione o botão "Login"
    # Then o login deve ser feito com sucesso 
    # And redirecionar a página para o url "https://www.saucedemo.com/inventory.html"

## Scenario: Tentar fazer o login com campo "Username" vazio
    # When deixa vazio o campo "Username" 
    # And preencha o campo "Password" com a senha credenciada "secret_sauce"
    # And pressione o botão "Login"
    # Then é exibido uma mensagem de erro contendo o texto "Epic sadface: Username is required"

## Scenario: Tentar fazer login com o campo "Password" vazio
    # When preenche o campo "Username" com um dos nomes de usuário credenciados a seguir: "standard_user"; "locked_out_user"; "problem_user"; "performance_glitch_user"; "error_user"; "visual_user"
    # And deixa campo "Password" vazio
    # And pressione o botão "Login"
    # Then é exibido uma mensagem de erro contendo o texto "Epic sadface: Username and password do not match any user in this service"

## Scenario: Tentar fazer o login com username diferente dos credenciados
    # When preenche o campo "Username" com um Username diferente de: "standard_user"; "locked_out_user"; "problem_user"; "performance_glitch_user"; "error_user"; "visual_user"
    # And preenche o campo "Password" com a senha credenciada "secret_sauce"
    # And pressione o botão "Login"
    # Then é exibido uma mensagem de erro contendo o texto "Epic sadface: Username and password do not match any user in this service"

## Scenario: Tentar fazer o login com password diferente dos credenciados
    # When preencha o campo "Username" com um dos nomes de usuário credenciados a seguir: "standard_user"; "locked_out_user"; "problem_user"; "performance_glitch_user"; "error_user"; "visual_user"
    # And preencha o campo "Password" com uma senha diferente da credenciada "secret_sauce"
    # And pressione o botão "Login"
    # Then é exibido uma mensagem de erro contendo o texto "Epic sadface: Username and password do not match any user in this service"

