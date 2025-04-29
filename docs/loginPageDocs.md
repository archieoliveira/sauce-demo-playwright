# Cenário de teste: Login

## Background:
    # Given o usuário esteja na página inicial "https://www.saucedemo.com"

### Scenario outline ('Fazer login com credenciais corretas'):
    #### When preenche o campo "Username" com um dos nomes de usuário credenciados a seguir: "standard_user"; "locked_out_user"; "problem_user"; "performance_glitch_user"; "error_user"; "visual_user"
    #### And preenche o campo "Password" com a senha credenciada "secret_sauce"
    #### And pressione o botão "Login"
    #### Then o login deve ser feito com sucesso 
    #### And redirecionar a página para o url "https://www.saucedemo.com/inventory.html"

### Scenario ('Tentar login com username vazio'):
    #### When deixa vazio o campo "Username" 
    #### And preencha o campo "Password" com a senha credenciada "secret_sauce"
    #### And pressione o botão "Login"
    #### Then é exibido uma mensagem de erro contendo o texto "Epic sadface: Username is required"
    #### And não deve prosseguir com o login

### Scenario ('Tentar login com senha incorreta'):
    # When preenche o campo "Username" com um dos nomes de usuário credenciados a seguir: "standard_user"; "locked_out_user"; "problem_user"; "performance_glitch_user"; "error_user"; "visual_user"
    # And inserir "senha_errada" no campo "Password"
    # And pressione o botão "Login"
    # Then é exibido uma mensagem de erro contendo o texto "Username and password do not match any user in this service"
    # And não deve prosseguir com o login

### Scenario ('Tentar login com usuário bloqueado'):
    #### When preenche o campo "Username" com "locked_out_user"
    #### And preenche o campo "Password" com a senha credenciada "secret_sauce"
    #### And pressione o botão "Login"
    #### Then é exibido uma mensagem de erro contendo o texto "Sorry, this user has been locked out."
    #### And não deve prosseguir com o login

