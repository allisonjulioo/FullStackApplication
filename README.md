# TestFrontBack - Sistema de Gerenciamento de Produtos e Pedidos

Aplicação fullstack com frontend em **Next.js** e backend em **NestJS** para gerenciamento de produtos e pedidos.

---

## Estrutura do Projeto

```
TestFrontBack/
├── frontend/    # Next.js + Redux + Styled Components
└── backend/     # NestJS + TypeORM + SQLite
```

---

## Frontend

Aplicação Next.js 13 com gerenciamento de estado via Redux Toolkit e estilização com Styled Components.

**Funcionalidades:**
- Listagem de produtos com paginação
- Criação de novos produtos via modal
- Filtros por nome, faixa de preço, categoria e ordenação
- Suporte a mock com MSW (Mock Service Worker) via localStorage

### Como rodar

```bash
cd frontend
npm install
npm run dev
```

O frontend sobe em `http://localhost:3000` e consome a API em `http://localhost:4040`.

### Modo Mock (sem backend)

Para usar o frontend sem o backend real, abra o console do navegador e execute:

```js
localStorage.setItem('enableMock', 'true')
```

Recarregue a página. O MSW interceptará as requisições e retornará dados mockados. Para desativar:

```js
localStorage.removeItem('enableMock')
```

---

## Backend

API RESTful em NestJS com arquitetura em camadas (controller, service, repository), seguindo princípios SOLID.

**Funcionalidades:**
- CRUD completo de produtos
- Criação e listagem de pedidos com controle de estoque
- Autenticação JWT
- Middleware de log de requisições
- Documentação Swagger
- Seed automático de 12 produtos ao iniciar

### Como rodar

```bash
cd backend
npm install
npm run start:dev
```

A API sobe em `http://localhost:4040`. A documentação Swagger fica disponível em `http://localhost:4040/api/docs`.

### Testes

```bash
cd backend
npm test
```

### Endpoints

| Método | Rota              | Descrição                           |
|--------|--------------------|-------------------------------------|
| GET    | /products          | Listar todos os produtos            |
| GET    | /products/:id      | Buscar produto por ID               |
| POST   | /products          | Criar novo produto                  |
| PUT    | /products/:id      | Editar produto                      |
| DELETE | /products/:id      | Deletar produto                     |
| GET    | /orders            | Listar todos os pedidos             |
| POST   | /orders            | Criar pedido (valida estoque)       |
| POST   | /auth/login        | Login (retorna token JWT)           |

### Autenticação

```bash
curl -X POST http://localhost:4040/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin"}'
```

---

## Docker (Backend)

```bash
cd backend
docker-compose up --build
```

---

## Stack

| Camada   | Tecnologias                                      |
|----------|--------------------------------------------------|
| Frontend | Next.js, React, Redux Toolkit, Styled Components, MSW |
| Backend  | NestJS, TypeORM, SQLite, Passport JWT, Swagger   |
| Testes   | Jest                                             |
