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
- Offline-first data stored in this browser
- Installable progressive web app with an offline app shell

## Tech stack

- React 19 and Vite
- Browser local storage for transactions, budgets, and savings goals
- Service worker for offline app loading

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

Start the frontend:

```sh
npm run dev
```

Open the URL printed by Vite (typically `http://localhost:5173`). No API or
account setup is required.

## Deploy

Deploy the Vite frontend to Vercel. No API service or environment variables
are required. The service worker caches the app after the first successful
online visit; open the app once while online before relying on it offline.

## Offline data and access

- Transactions, budgets, savings goals, and theme preferences stay in this
  browser's local storage. They do not sync or transfer to another device.
- Clearing this site's browser data can permanently delete the ledger.
- There is no login, phone verification, or access lock. Anyone can open the
  public website. A phone number entered in the profile is saved only in that
  browser and is not included in the public build; it does not restrict access.
- Offline mode works after the app has loaded successfully online at least
  once. Browser storage and service-worker support are required.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run server` | Start only the API server |
| `npm run build` | Create a production frontend build in `dist/` |
| `npm run preview` | Preview the production frontend build |
| `npm run lint` | Run ESLint |

## Project structure

```text
src/          React application and UI components
server/       Legacy Express API and SQLite setup (not used by the offline app)
public/       Static assets
```
