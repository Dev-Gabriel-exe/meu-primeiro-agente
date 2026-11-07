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

## Publicar no GitHub Pages (sem workflow personalizado)

1. Acesse **https://github.com/new?name=meu-primeiro-agente** e crie um repositório chamado **`meu-primeiro-agente`** como **Public**.
2. Envie para a raiz da branch `main` os arquivos `index.html`, `styles.css`, `script.js`, `favicon.svg`, `.nojekyll`, `README.md` e `GUIA-PROFESSOR.md`. Pelo navegador, use **Add file → Upload files** (extraia o ZIP antes; não envie apenas o ZIP).
3. No repositório, abra **Settings → Pages**.
4. Na seção **Build and deployment**, em **Source**, escolha **Deploy from a branch**.
5. Em **Branch**, selecione **main** e **/(root)**, depois clique em **Save**.
6. Depois da publicação, acesse `https://SEU-USUARIO.github.io/meu-primeiro-agente/` (troque `SEU-USUARIO` pelo login real).
7. Gere seu QR code a partir do endereço **que estiver abrindo normalmente** no navegador.

> O GitHub Pages, nesse modo, publica os arquivos da branch. Você não precisa criar um workflow próprio; o GitHub ainda pode executar internamente um workflow de publicação do Pages. A presença de `.nojekyll` evita a etapa de compilação Jekyll. Segundo a documentação, os runners padrão de Actions são gratuitos em repositórios públicos.
>
> A publicação pode levar algum tempo; espere a mensagem de confirmação em Settings → Pages e teste em uma janela anônima.

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
