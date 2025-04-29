# Conclusões e aprendizados 

## POM (Page Object Model):
    
    ### Notei que é um paradigma com fortes semelhanças à programação orientada a objetos, as principais vantagens de ambos os modelos
    são a capacidade de reutilizar trechos do código para mantê-lo mais legível, conciso e fácil de refatorar e dar manutenção.

    No POM, devemos separar as páginas do sistema em classes, instanciar seus objetos atribuindo um seletor html/css da página à variáveis,
    assim conseguimos aplicar métodos a esses seletores de forma que fique mais legível. É importante utilizar nomes claros e de fácil compreensão,
    também para facilitar o entendimento de outras pessoas que trabalharão com o código ou que terão que o ler.
    Com as classes e objetos instanciados, dentro de cada classe criamos métodos com suas respectivas variáveis, esses métodos tem como objetivo
    definir uma ação ou um conjunto de ações dentro de um nome curto, conciso e que possa ser chamado facilmente em outras partes do código,
    no caso dos nossos testes, geralmente chamamos nos arquivos de teste propriamente ditos. Além da vantagem de diminuir o tamanho do código final,
    a principal vantagem do POM tem a ver com o que citei previamente de facilitar a manutenção, porque se precisar mudar alguma ação dentro do método,
    só precisa alterar dentro de sua definição na classe e toda vez que ele foi chamado nos testes já vai estar atualizado, sem os métodos, precisaríamos
    ficar alterando toda vez que aquela função teria sido chamada.

    Em relação às funções assíncroncas (async), sua utilidade é para garantir que os comandos anteriores da automação tenham sido feitos com sucesso,
    antes que essa função seja executada, por exemplo, se você vai fazer uma automação para executar um login corretamente, é preciso que o método seja
    assíncrono e que antes de cada ação se use a função "await", para garantir que os campos serão preenchidos antes do envio do formulário.

    Em relação aos arquivos de teste e documentações, preferi separar por páginas, já que optei por cobrir casos de teste além dos que foram solicitados, 
    pensei que ficasse mais organizado dessa maneira, também fiz a separação as pastas dessa forma. 

    Utilizei a função "trace: on" no arquivo de configuração, para que ficasse salvo os resultados do teste na pasta padrão "test-results".

    Antes de subir essa última versão do repositório, rodei os testes uma última vez para conferir se deu tudo certo, a confirmação deles está no
    ".last-run.json" na pasta "test-results".

    No mais, foi uma experiência incrível poder aprender Playwright e fazer uma cobertura mais aprofundada das funções do site :D