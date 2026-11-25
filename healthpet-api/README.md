# HEALTHPET API

API de autenticação e administração de usuários. O serviço usa NestJS, Prisma e MySQL; não compartilha nem persiste senhas em texto puro.

## Rodar localmente

1. Instale Node.js 22.12+ e Docker.
2. Na pasta `healthpet-api`, copie `.env.example` para `.env` e gere um segredo exclusivo:

   ```sh
   cp .env.example .env
   openssl rand -base64 48
   ```

   Coloque o resultado em `JWT_SECRET` e defina uma senha única para `ADMIN_PASSWORD`.
3. Inicie o MySQL local:

   ```sh
   docker compose up -d
   ```
4. Instale, prepare o banco e crie a conta administrativa:

   ```sh
   npm ci
   npm run prisma:generate
   npm run prisma:migrate -- --name init
   npm run prisma:seed
   ```
5. Inicie a API:

   ```sh
   npm run start:dev
   ```

A API estará em `http://localhost:3000/api`. `GET /api/health` é público; cadastro e login ficam em `/api/auth/register` e `/api/auth/login`. A administração de usuários exige um JWT válido com papel de administrador.

## Frontend

Configure `VITE_API_URL` no ambiente de build do frontend, por exemplo `https://api.seudominio.com/api`. Para desenvolvimento, `http://localhost:3000/api` é usado como padrão. A origem do frontend também precisa constar em `FRONTEND_ORIGIN`.

O GitHub Pages hospeda somente o frontend. Para uso online, publique esta API e um banco MySQL gerenciado em um serviço separado, configure `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` e `FRONTEND_ORIGIN` como variáveis/segredos do serviço, e execute `npm run prisma:deploy` e `npm run prisma:seed` uma vez. Nunca publique `.env` nem reutilize credenciais de desenvolvimento.

Tokens JWT duram 15 minutos e ficam em `sessionStorage` (restrito à aba, mas acessível ao JavaScript). Não trate dados como altamente sensíveis até hospedar frontend e API sob uma arquitetura de mesma origem e validar o fluxo de segurança em produção.
