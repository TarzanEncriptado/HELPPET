# HEALTHPET

Aplicação web para gerenciamento dos grupos, projetos, atividades e usuários do PET Fronteira. Construída com Vue 3, Vuetify, Pinia e Vite.

## Requisitos

- Node.js `^20.19.0` ou `>=22.12.0`
- npm

## Desenvolvimento

```sh
npm ci
npm run dev
```

## Verificação e build

```sh
npm run lint
npm run build
npm run preview
```

O build de produção é gerado em `dist/`. Dependências e artefatos compilados não devem ser incluídos no controle de versão.

## Publicação

O GitHub Actions publica automaticamente o site no GitHub Pages quando há alterações em `healthpet-final/` no ramo `TarzanEncriptado-patch-1`. A publicação também pode ser iniciada manualmente pela aba **Actions**.

Endereço esperado: <https://tarzanencriptado.github.io/HELPPET/>.

> O projeto ainda usa dados simulados no frontend; autenticação e operações não substituem um backend de produção.
