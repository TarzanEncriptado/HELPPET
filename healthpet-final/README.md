# HEALTHPET

Aplicação web para gerenciamento dos grupos, projetos, atividades e usuários do PET Fronteira. Construída com Vue 3, Vuetify, Pinia e Vite.

## Requisitos

- Node.js `^20.19.0` ou `>=22.12.0`
- npm

## Desenvolvimento

```sh
cp .env.example .env
npm ci
npm run dev
```

Inicie também a API seguindo `../healthpet-api/README.md`. Sem a API, o formulário de autenticação informa que o serviço não está disponível.

## Verificação e build

```sh
npm run lint
npm run build
npm run preview
```

O build de produção é gerado em `dist/`. Dependências e artefatos compilados não devem ser incluídos no controle de versão.

## Publicação

O GitHub Actions publica automaticamente o site no GitHub Pages quando há alterações em `healthpet-final/` no ramo `TarzanEncriptado-patch-1`. Defina a variável de repositório `VITE_API_URL` com a URL da API terminada em `/api` para habilitar login, cadastro e administração de usuários. A publicação também pode ser iniciada manualmente pela aba **Actions**.

Endereço esperado: <https://tarzanencriptado.github.io/HELPPET/>.

Login, cadastro e administração de usuários usam a API em `../healthpet-api/`. Grupos, projetos e atividades ainda usam dados simulados no frontend e não devem ser usados para armazenar dados reais.
