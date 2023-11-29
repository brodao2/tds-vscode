# Changelog ([Changelog Versão 1](CHANGELOG.md))


## Versão [2.0.0-RC16]

### Correção

#### Correções de tradução

#### _Linter_: tratamento de avisos

Corrigido o tratamento de avisos do _linter_, que haviam sido retirados indevidamente na implementação do _DSS_.

## Versão [2.0.0-RC15]

### Correção

#### Correções e melhorias pontuais na interface de validação na aplicação de Patches

## Versão [2.0.0-RC14]

### Melhoria

#### Migração do mecanismo de tradução de vscode-nls para @vscode/l10n [DTCLIENT01-4399](https://jiraproducao.totvs.com.br/browse/DTCLIENT01-4399)

Devido a descontinuação do [vscode-nls](https://github.com/microsoft/vscode-nls#vscode-nls), foi efetuado migração para @vscode/l10n e revisão das traduções e ortografia.

#### Problemas de acentuações no debug [#1113](https://github.com/totvs/tds-vscode/issues/1113) [DTCLIENT01-4042](https://jiraproducao.totvs.com.br/browse/DTCLIENT01-4042)

Implementado tratamento de código de página na interface entre o depurador do VS-Code e o DebugAdapter (motor de depuração).
Veja detalhes em [Depuração com variáveis do tipo string](docs\debugger.md#depuração-com-variáveis-do-tipo-string).

### Correção

#### Identificação do servidor corrente na barra de status (rodapé)

Ajustado a apresentação do servidor e ambiente corrente na barra de status. Nas versões anteriores não era atualizado.

## Versão [2.0.0-RC13]

### Correção

#### Consumo de CPU

Solucionado consumo de CPU exagerado em algumas situações.

#### Problema com referencia de array na importação do TDS Replay [DTCLIENT01-4264](https://jiraproducao.totvs.com.br/browse/DTCLIENT01-4264)

Ajustado processamento da identificação de retornos de funções, gravadas no log do TDSReplay.

#### Sintaxe destacada em HTML e APH não está funcionando [DTCLIENT01-4345](https://jiraproducao.totvs.com.br/browse/DTCLIENT01-4345)

Implementado tratamento específico para arquivo ``.aph``, para suporte a sintaxe destacada de HTML e outros.

## Versão [2.0.0-RC12]

### Correção

A formatação de arquivos HTML não estava sendo realizada e apareciam como um texto simples.

## Versão [2.0.0-RC11]

### Melhoria

Otimização de código e ajustes na apresentação dos resultados da ação ``peek``.

### Correção

Na obtenção da estrutura de fonte (_outline_) em definições de variáveis com atribuição de valor. Por exemplo:

```
local v1, v2 := 0, v3 := {|| .f.}
```

A estrutura apresentava apenas ``v1`` e ``v3``.

## Versão [2.0.0-RC10]

### Melhoria

### Correção

#### Documentação DSS [DTCLIENT01-4282](https://jiraproducao.totvs.com.br/browse/DTCLIENT01-4282)  [DTCLIENT01-4283](https://jiraproducao.totvs.com.br/browse/DTCLIENT01-4283)

Correções na documentação.

#### No mouseover sobre a função a descrição do retorno precisa ajustes [DTCLIENT01-4279](https://jiraproducao.totvs.com.br/browse/DTCLIENT01-4279)

Corrigido montagem do texto da documentação (ProtheusDOC).

#### Erro ao declarar uma variável [DTCLIENT01-4284](https://jiraproducao.totvs.com.br/browse/DTCLIENT01-4284)

Ao iniciar a declaração de uma variável ``local``, apresentava mensagem de erro na resposta da requisição da mensagem ``textDocument/documentSymbol``.

#### Múltipla exibição de variável [DTCLIENT01-4286](https://jiraproducao.totvs.com.br/browse/DTCLIENT01-4286)

Ajustado seleção de elementos de acordo com o escopo do mesmo. Também foi ajustado a seleção de ``static function``.

#### Erro mouse _hover_ em `DEFINE` [DTCLIENT01-4285](https://jiraproducao.totvs.com.br/browse/DTCLIENT01-4285)

Implementado tratamento de diretivas `#define` de constantes efetuadas no próprio fonte.

#### _Peek_ em variáveis não apresenta resultados [DTCLIENT01-4301](https://jiraproducao.totvs.com.br/browse/DTCLIENT01-4301)

Correção em filtro de seleção em variáveis de acordo com escopo de definição e definições (``#define``).

## Versão [2.0.0-RC9]

### Melhoria

#### Documentação DSS

Adicionado imagens animadas demonstrando os recursos.

### Correção

#### Assistente de assinatura (_Signature Help_)

Ajustado tratamento quando cursor esta sobre a vírgula de separação de parâmetros.

#### Ir para definição (_Go to Definition_)

Corrigido caminho do arquivo que contem a definição.

## Versão [2.0.0-RC8]

### Correção

#### Assistente de assinatura (_Signature Help_)

Ajustado posicionamento do parâmetro corrente na documentação apresentada.

## Versão [2.0.0-RC7]

### Novos recursos

Liberação ['TDS: Developer Support Subsystem (DSS)'](docs/dss.md).

## Versão [2.0.0-RC6]

## [Informação/Referências](docs/dss.md#informaçãoreferências)

Informação de quantas vezes e onde, uma função, classe ou método estático é utilizado.

## Versão [2.0.0-RC5]

### Assistente de assinatura (Otto)

*Intellisense* para visualizar os parâmetros de funções Advpl/PL não tem o comportamento esperado.

### Disparar o assistente de assinatura, na lista de parâmetros em código já existente (Otto)

Código teste: ``oTButton1 := TButton():New( 0, 510, "Ir",oPanel,{||oWebEngine:Navigate(cGet1)}, 20,10,,,.F.,.T.,.F.,,.F.,,,.F. )``

### Ao acionar o assistente no método construtor (new), não traz o da classe específica (Otto)

### Auto completar (Otto)

*Auto-Complete* para _user function_ é "estranho", ele acha o nome da função mas não como ``u_``.

### Renomear variável local (Otto)

Mudar o nome de uma variável local, não altera o nome mostrado no outline (fechar e abrir o vscode "resolve")

### Não traz documentação de classes binárias (Otto)

Gerar a documentação de classes binárias a partir dos arquivos em ``\advpldoc\advpl\src\classes``.

### Erro ao digitar ao criar função no vscode [DTCLIENT01-4089](https://jiraproducao.totvs.com.br/browse/DTCLIENT01-4089)(John)

Ao criar um user function em um arquivo ``tlpp`` na primeira linha gera um erro que trava o software do vscode.

## Versão [2.0.0-RC4]

### ``Ir para definição`` em variável local (Otto)

*Ctrl-click* (``go to definition``) em uma variável definida como local não está levando na definição (apesar de mostrar no _outline_)

#### Navegação no código falha após ler o _cache_ (Otto)

Revisto processo de salva e carga de _cache_.

> Efetuado higienização de código, eliminando propriedades e processos desnecessários.

### ``User function`` não aceita identificador numérico

O compilador aceita identificador numérico, pois após o pré-processamento, este passa a contar com prefixo ``u_``, validando o identificador.

> Mesmo coisa com outros escopos de função.

### Navegação em classe

No código ``oGrid:= MyGrid():New(oDlg,aData)``, não vai para a definição da classe ao acionar ``goto definition`` em ``MyGrid()``.

### Navegação em método estático

Ajustado navegação para métodos estáticos.

## Versão [2.0.0-RC3]

### Novos recursos

#### Assistente de assinatura de funções

### Melhorias

#### ProtheusDOC em classes

Adicionado tratamento de ProtheusDOC em classes.

### Correção

#### ``Ir para definição`` na inicialização (``new``) de objetos

Corrigido a navegação e _text hover_ na definição de objeto na sua inicialização.

#### Passagem _mouse_ (_text hover_)

Apresentava informações de definição e local de uso de forma indevida.

#### Abrir símbolo pelo nome (``Ctrl+T``)

Correção na execução da mensagem ``workspace/symbol``.

## Versão [2.0.0-RC2]

### Correções

### Leitura do cache e aprimoramento na salva/carga do cache

Ao ler o cache, este está sendo invalidado e com isso reindexa os arquivos.

### Melhoria

### Documentação das funções de binário (_binary function_)

Extração da documentação das funções binárias direto do projeto _totvsvmtests_, via ferramenta _advplDoc_ (solução _TotvsTecTools_).
Para detalhes, veja ``<local folder>\totvsls\dbcode\dbcode_manager.cpp``, método ``DBCodeManager::loadBinaryFunctions``.

## Versão [2.0.0]

> Interoperabilidade entre sistemas operacionais
>
> Para garantir a interoperabilidade das áreas de trabalho entre os sistemas operacionais suportados pelo **TDS-VSCode** e seus componentes, recomenda-se que pastas e arquivos não contenham caracteres especiais (exceto hífen e sublinhado) ou acentuados e sempre em minúsculas.
>
> Leia [Convenção para nomenclatura de _File System_ em ambiente Linux](<https://tdn.totvs.com/x/h8BICw>).

### Melhorias

#### Assistente de assinatura de funções

Adicionado assistente de assinatura de funções (_SignatureHelp_).

#### Informações sobre uso e outras informações

BETA: Adicionado informações sobre o uso de funções (_CodeLens_).

#### Implementação de configuração para ignorar pastas e arquivos

Efetuado a implementação de configuração para a extensão ignorar pastas e arquivos no processo de _Navegação em fontes_ e recursos associados, através da existência do arquivo `.tdsignore`.

Detalhes da implementação em [# TDS: Developer Support Subsystem](docs/dss.md#ignore).

#### Navegação em fontes, passagem de mouse e referências

Efetuado a implementação de navegação em fontes, passagem de mouse e referências.
Detalhes da implementação em [TDS: Developer Support Subsystem](docs/dss.md).

> Os recursos aqui apresentados, podem ser influenciados devido ao _linter_ ignorar o processamento de fontes configurado em [TDS: Linter -> Ignorar pastas e arquivos](docs/linter.md#tdsignore).
> As informações sobre navegação, podem ou não ficar em [_cache_](docs/dss.md#cache).

#### Visão *Estrutura*

Apresenta alguns detalhes sobre o item de acordo com sua definição.

#### Navegação em classes quando usado ``self`` e ``_Super``

- Adicionado tratamento há herança de classe (``_Super``,  ``from``, ``inherited`` e ``of``)
- Unificado tratamento de ``::`` e ``self``
