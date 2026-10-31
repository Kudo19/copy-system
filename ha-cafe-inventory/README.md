# Ha? Cafe and Patisserie – Inventory System

React frontend + Node/Express backend, in one repo.

```
ha-cafe-inventory/
├── frontend/   React 18 + Vite + Material UI + Recharts   (port 5173)
└── backend/    Node.js + Express API  ← BACKEND WORKING FOLDER (port 4000)
```

## Quick start

```bash
npm run install:all     # installs root, frontend and backend dependencies
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run dev             # runs API (4000) and web app (5173) together
```

Open http://localhost:5173. During development Vite proxies every `/api/*`
request to the Express server, so there are no CORS problems and the frontend
just calls `fetch('/api/products')`.

Run each side alone with `npm run dev:frontend` or `npm run dev:backend`.

## Frontend stack
- **React Router** – routing and protected routes
- **Material UI (MUI)** – forms, tables, dialogs, menus, snackbars, theme
- **Recharts** – stock movement and report charts
- Reusable building blocks live in `frontend/src/components`
  (`TextInput`, `SelectInput`, `PasswordField`, `DataTable`, `StatCard`, `StatusPill`, `MovementChart`, `ConfirmDialog`, `PageHeader`).

## Backend
See `backend/README.md`. It is a ready-to-extend Express scaffold
(routes, controllers, middleware, env config) with an in-memory sample
`/api/products` endpoint and `/api/health`.

## Next step: connect frontend to API
State currently lives in `frontend/src/context/InventoryContext.jsx` (seeded
from `frontend/src/data/seed.js`). Replace those seed values and the mutating
functions with calls from `frontend/src/api/client.js`.
