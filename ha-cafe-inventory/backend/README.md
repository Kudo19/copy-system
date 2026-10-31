# Backend – working folder (Node.js / Express)

**This folder is the working folder for the backend.** All server-side code
(API routes, controllers, database models, auth, middleware) goes here.
The React app in `../frontend` talks to it over `/api/*`.

## Run

```bash
cd backend
npm install
cp .env.example .env
npm run dev      # nodemon, http://localhost:4000
```

Check it: `curl http://localhost:4000/api/health`

## Structure

```
backend/
├── package.json
├── .env.example        PORT, CLIENT_ORIGIN, JWT_SECRET, DATABASE_URL
└── src/
    ├── server.js       process entry, starts HTTP server
    ├── app.js          Express app: middleware + route mounting
    ├── config/env.js   loads and validates environment variables
    ├── middleware/     errorHandler, notFound  (add auth.js here)
    ├── routes/         health.js, products.js  (add suppliers, users, stock…)
    ├── controllers/    request handlers
    └── data/           in-memory sample data (replace with a database)
```

## Suggested next endpoints (matching the frontend screens)

| Screen            | Endpoints                                              |
|-------------------|--------------------------------------------------------|
| Login / Sign up   | `POST /api/auth/login`, `POST /api/auth/register`, `POST /api/auth/reset-password` |
| Products          | `GET/POST /api/products`, `PUT/DELETE /api/products/:id` |
| Stock in / out    | `POST /api/stock/in`, `POST /api/stock/out`, `GET /api/stock/movements` |
| Suppliers         | `GET/POST /api/suppliers`                              |
| Users             | `GET /api/users`, `PUT/DELETE /api/users/:id`          |
| Reports           | `GET /api/reports/summary`                             |

## Notes
- CORS is restricted to `CLIENT_ORIGIN` (the Vite dev URL by default).
- Pick a database (PostgreSQL / MySQL / MongoDB) and set `DATABASE_URL`;
  swap `src/data/products.js` for real queries.
- Hash passwords (bcrypt) and issue JWTs before using real accounts.
