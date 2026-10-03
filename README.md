<div align="center">

# Todo App

**A clean, responsive full-stack task manager with automatic saving.**

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
</p>

<p>
  <img src="https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express 5" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma 7" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

<p>
  <a href="#demo">Demo</a> &bull;
  <a href="#features">Features</a> &bull;
  <a href="#tech-stack">Tech Stack</a> &bull;
  <a href="#installation">Installation</a> &bull;
  <a href="#api-endpoints">API</a>
</p>

</div>

---

## Demo

<div align="center">
  <img src="./assets/exec-e7422a81-0319-4f86-859b-0b121ff20b0a.png" alt="Todo App dashboard" width="100%" />
</div>

## Features

- Create, edit, complete, and delete tasks
- Automatically save changes after a short delay
- View total, in-progress, and completed task counts
- Validate form data on both the client and server
- Show success, warning, and deletion notifications
- Use a responsive layout on desktop and mobile devices

## Tech Stack

### Frontend

| Technology | Purpose |
| --- | --- |
| ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white) | Component-based user interface |
| ![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white) | Development server and build tool |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white) | Responsive styling |
| ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?logo=reacthookform&logoColor=white) | Form state management |
| ![Zod](https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=white) | Client-side validation |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white) | HTTP client |

The UI also uses React Toastify, Lucide React, and Moment.js.

### Backend

| Technology | Purpose |
| --- | --- |
| ![Node.js](https://img.shields.io/badge/Node.js-20.19%2B-5FA04E?logo=nodedotjs&logoColor=white) | JavaScript runtime |
| ![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white) | REST API server |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) | Static type checking |
| ![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white) | Database ORM |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white) | Relational database |
| ![Zod](https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=white) | Request validation |

Server logging is handled by Winston and Morgan.

## Project Structure

```text
todoapp/
├── assets/             # README and demo assets
├── client/             # React frontend
│   └── src/
│       ├── api/
│       ├── components/
│       └── utils/
└── server/             # Express API
    ├── prisma/         # Prisma schema
    └── src/
        ├── config/
        ├── controllers/
        ├── middlewares/
        ├── routes/
        ├── services/
        └── utils/
```

## Prerequisites

Install the following before starting:

- Node.js `20.19+` or `22.13+`
- pnpm `11+`
- PostgreSQL

You can enable pnpm through Corepack:

```bash
corepack enable
corepack prepare pnpm@11 --activate
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/highjunesolution/todoapp.git
cd todoapp
```

### 2. Configure and start the server

Install the backend dependencies:

```bash
cd server
pnpm install
```

Copy `server/.env.example` to `server/.env`, then configure the application port and PostgreSQL connection strings:

```env
PORT=8000
DATABASE_URL="postgresql://postgres:password@localhost:5432/todoapp"
DIRECT_URL="postgresql://postgres:password@localhost:5432/todoapp"
```

For a local PostgreSQL database, `DATABASE_URL` and `DIRECT_URL` can use the same connection string. When using a hosted provider, use its pooled URL for `DATABASE_URL` and direct connection URL for `DIRECT_URL`.

Generate the Prisma Client and create the database tables:

```bash
pnpm exec prisma generate
pnpm exec prisma db push
```

Start the API development server:

```bash
pnpm dev
```

The API will be available at `http://localhost:8000/api`.

### 3. Configure and start the client

Open another terminal and install the frontend dependencies:

```bash
cd client
pnpm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:8000/api
```

Start the frontend development server:

```bash
pnpm dev
```

Open `http://localhost:5173` in your browser.

## Available Scripts

### Client

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Vite development server |
| `pnpm build` | Build the frontend for production |
| `pnpm preview` | Preview the production build |
| `pnpm lint` | Run ESLint |

### Server

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the API with file watching |
| `pnpm build` | Compile TypeScript to `dist` |
| `pnpm start` | Run the compiled API |

## API Endpoints

All endpoints use the `/api/todo` prefix.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/list` | Get all tasks |
| `GET` | `/:id` | Get a task by ID |
| `POST` | `/create` | Create a task |
| `PUT` | `/update/:id` | Update a task |
| `DELETE` | `/remove/:id` | Delete a task |
