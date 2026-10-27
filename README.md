# Taka Khata

A personal finance tracker for recording income and expenses, setting budgets, and keeping an eye on savings goals. Taka Khata pairs a welcoming dashboard with a simple ledger so you can see where your money is going.

## Features

- Personalized dashboard greeting and at-a-glance balance
- Income and expense entries with categories, notes, and dates
- Quick date selection for today and yesterday
- Transaction search and type filters
- Budget limits and savings goals
- Spending summaries, charts, and planning insights
- Light and dark themes using a navy-and-cream palette
- Per-account data stored in SQLite

## Tech stack

- React 19 and Vite
- Express 5 API
- SQLite database
- JWT-based API sessions

## Get started

### Requirements

- Node.js (current LTS recommended)
- npm

### Install and run

```sh
git clone https://github.com/Oywon/Taka-tracker.git
cd Taka-tracker
npm install
```

Create a local environment file from the example:

```sh
cp .env.example .env.local
```

For local development, leave `VITE_API_URL` empty so the browser uses Vite's
same-origin `/api` proxy to reach the backend. Set this variable only when the
frontend needs to use a separately hosted API. No Firebase configuration is
required for sign-up or sign-in:

```env
VITE_API_URL=
```

Start the frontend and API together:

```sh
npm run dev
```

Open the URL printed by Vite (typically `http://localhost:5173`). The Express API listens on `http://localhost:4000`.

On Windows PowerShell, copy the example file with:

```powershell
Copy-Item .env.example .env.local
```

## Deploy

The Vercel site hosts the frontend. The Express API and SQLite database must
run separately; Vercel's serverless filesystem is not persistent enough for
the ledger database.

### Deploy the API on Render

1. In Render, create a **Blueprint** from this GitHub repository.
2. Render reads `render.yaml` and creates the API service with a persistent
   disk. Keep the generated `JWT_SECRET` private.
3. Wait for the API service to finish deploying. Its address will look like
   `https://taka-tracker-api.onrender.com`.
4. Check that `https://<your-api-host>/api/health` returns `{"status":"ok"}`.

The persistent disk is required so user accounts and ledger entries survive
service restarts and deployments.

### Connect the Vercel frontend

1. In the Vercel project, open **Settings → Environment Variables**.
2. Add `VITE_API_URL` with the Render API's base URL, for example
   `https://taka-tracker-api.onrender.com` (do not add `/api` at the end).
3. Apply it to the Production environment and redeploy the frontend.

The Render Blueprint allows requests from the current Vercel site and local
development. If the frontend domain changes, update `CORS_ORIGIN` on Render
to the new origin and redeploy the API.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server and Express API |
| `npm run server` | Start only the API server |
| `npm run build` | Create a production frontend build in `dist/` |
| `npm run preview` | Preview the production frontend build |
| `npm run lint` | Run ESLint |

## Configuration

| Variable | Used by | Description |
| --- | --- | --- |
| `VITE_API_URL` | Frontend | Base URL of the API. Use `http://localhost:4000` for local development. |
| `PORT` | API | API port. Defaults to `4000`. |
| `DB_PATH` | API | SQLite database path. Defaults to `server/data.db`. |
| `JWT_SECRET` | API | Secret used to sign session tokens. Set a strong, private value outside local development. |
| `CORS_ORIGIN` | API | Comma-separated list of allowed browser origins. Defaults to local Vite development URLs. |
| `SEED_DEMO_DATA` | API | Set to `true` to seed demo ledger data. |

Keep secrets in your local environment or deployment provider; do not commit them to GitHub. The local SQLite database is ignored by Git.

## Data and sign-in

Sign in with a name and mobile number. The first use of a mobile number creates a new account and an empty ledger. Transactions, budgets, and savings goals are stored in SQLite and associated with that account.

**Security note:** The current sign-in flow uses a name and mobile number but does not verify ownership of the number. It is intended for development and demonstration, not production use with real financial data. Add a verified one-time code or another authentication factor and review the API security configuration before deploying publicly.

## Project structure

```text
src/          React application and UI components
server/       Express API and SQLite setup
public/       Static assets
```
