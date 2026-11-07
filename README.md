# Meu Primeiro Agente ✦

Oficina prática **no computador**, para pessoas iniciantes aprenderem a configurar um assistente personalizado no Google Gemini.

O site inclui:
- Duas missões: atividade coletiva (**Tutor Paciente**) e criação personalizada;
- Passo a passo detalhado, com mapas ilustrativos da interface;
- Botões para copiar nome, descrição, instruções e testes;
- Gerador local de instruções para seis ideias de assistentes;
- Checklist de progresso salvo apenas no navegador do estudante;
- Plano B para contas sem o recurso Habilidades;
- Conteúdo responsivo, acessível e sem necessidade de backend, API ou frameworks.

## Pré-visualizar

Abra `index.html` no navegador. O site também funciona sem internet para a leitura e para o gerador de instruções (mas o Gemini precisa de internet).

## Publicar no GitHub Pages (configuração inicial)

O código da oficina já está na branch `main`. Resta ativar o Pages uma única vez:

1. Abra **https://github.com/Dev-Gabriel-exe/meu-primeiro-agente/settings/pages**.
2. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
3. Em **Branch**, selecione **main** e **/(root)** e clique em **Save**.
4. Confira o link **https://dev-gabriel-exe.github.io/meu-primeiro-agente/** depois que o GitHub indicar a publicação.

Não é preciso criar nem financiar um workflow personalizado. O GitHub pode criar e executar internamente o fluxo de publicação do Pages. Este site é composto somente de HTML, CSS, JavaScript e SVG, sem dependências, APIs ou chaves.

## Atualizações

O Google está migrando Gems para Habilidades. Os nomes de botões podem variar entre contas/versões. A oficina ensina o fluxo de Habilidades e inclui um plano alternativo para contas sem acesso.

## Fontes oficiais

- [Criar e gerenciar Habilidades — Google](https://support.google.com/gemini/answer/17094296?hl=pt-BR&co=GENIE.Platform%3DDesktop)
- [Escrever habilidades eficazes — Google](https://support.google.com/gemini/answer/17102773?hl=pt-BR)
- [Transição de Gems para Habilidades — Google](https://support.google.com/gemini/answer/18560919?hl=pt-BR)

## Privacidade e acessibilidade

Não há envio de dados para servidor. O checklist de progresso é armazenado no `localStorage` do navegador, e o gerador cria instruções localmente. Não é necessário cadastro no site; o acesso ao Gemini segue a política e elegibilidade do Google. Não coletar dados pessoais de alunos.

Projeto didático independente, não afiliado ao Google.


## Experiência interativa (v2)

- Demonstração **local e ilustrativa** do Tutor Paciente (não usa API e não faz chamadas ao Gemini).
- Guia de cliques interativo com os nomes oficiais de menus para computador.
- Laboratório de personalização com prévia instantânea de nome, público e objetivo.
- Quiz rápido com feedback; progresso salvo apenas no navegador local; animação de conquista.
- Modo foco para projeção em sala, navegação por teclado e movimento reduzido.
- Sem builds, bibliotecas externas, tokens ou custos de API. Hospedável diretamente na raiz da `main` no GitHub Pages.

### Verificação

O fluxo de criação usa a documentação oficial do Google para computador: https://support.google.com/gemini/answer/17094296?co=GENIE.Platform%3DDesktop&hl=pt-BR . Contas e menus podem variar; confira o Plano B. O site não controla o Gemini nem cria habilidades remotamente.
