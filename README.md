# Atividade 5 MaisPrati
---

O trabalho consistiu na criação de uma aplicação em React que consome a API do TMDB. A aplicação permite pesquisar filmes, visualizar detalhes e salvar favoritos. 

Na parte da pesquisa, o usuário tem um campo de texto para digitar o nome do filme. Os resultados aparecem em cartões com título, ano e pôster. A navegação entre várias páginas de resultados foi implementada com botões de paginação.

Também foi criada a lista de favoritos, onde o usuário pode adicionar ou remover filmes. Essa lista é persistida no navegador usando o localStorage, garantindo que os favoritos não se percam quando a página é recarregada.

Foram tratados cenários de carregamento e erro: enquanto os resultados não chegam da API, aparece a mensagem de “carregando”, e em caso de erro, o usuário recebe o aviso adequado.

Além disso, há uma página inicial com um banner, uma página de erro 404 e um sistema de rotas que organiza a navegação entre Página inicial, Pesquisa, Favoritos e Detalhes.

---

## Enunciado da tarefa:


*Visão Geral: Você deverá criar uma aplicação em React que consuma a API do TMDB (ou OMDb) para permitir que usuários busquem filmes, vejam detalhes e montem uma lista de favoritos.*

### Funcionalidades Obrigatórias
 
1. **Página de Busca:**
Um campo de texto para o usuário digitar o termo. 
Exibir lista de resultados com pôster, título, ano e botão para ver detalhes.  ✅
---
2. **Paginação:**
Permitir navegar pelas páginas de resultados.  ✅
---
3. **Página de Detalhes:**
Exibir informações completas (diretor, elenco, sinopse, avaliação) ao clicar em um filme.  ✅
---
4. **Lista de Favoritos:**
Botão para adicionar/remover filmes da lista de favoritos.  
Persistir favoritos em localStorage. ✅
---

5. **Tratamento de Erros & Loading:**
Exibir indicador enquanto aguarda resposta e mensagens de erro quando necessário. ✅

---
# Para executar este projeto:

**Como executar este projeto React**

**Clonar o repositório**
```

git clone git@github.com:barbaramsilveira/atividade5MaisPraTi.git

```

**Entrar na pasta do projeto**
```

cd nome-do-repositorio

```

**Instalar dependências**
```

npm install

```

**ou, se você usa yarn:**
```

yarn

```
**Configurar a chave da API:**

Por questões de segurança, a chave da API foi configurada em um arquivo .env, que não está versionado no GitHub.

Crie um arquivo .env na raiz do projeto.

Adicione sua chave no formato:

```

REACT_APP_TMDB_API_KEY=sua_chave_aqui

```

**Executar a aplicação**
```

npm start

```

**ou com yarn:**
```

yarn start

```


**Abrir no navegador:**

O React iniciará o projeto em uma porta determinada automaticamente (geralmente http://localhost:3000).

---

### Caso não queira ver o código e prefira apenas acessar o deploy da aplicação, o deploy foi feito com a ferramenta Vercel e está disponível no seguinte link:

https://barbara-martins-site-filmes-maisprati.vercel.app/

