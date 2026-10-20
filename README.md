# Taka Khata

A personal finance ledger for tracking income, expenses, budgets, and savings.

## Run locally

```sh
npm install
npm run dev
```

The development command starts the Vite client and the Express API. The API
stores accounts and ledger data in `server/data.db` using SQLite. To use a
different database file, set `DB_PATH` before starting the server.

## Sign-in and data

Continue with your name and mobile number. The first use of a mobile number
creates an account and an empty ledger; the balance remains blank until the
first transaction is saved. Transactions, budgets, and savings goals are
stored in SQLite and remain associated with the account.

Name and mobile number alone do not verify identity. Add a verified SMS
one-time code or another authentication factor before using this login flow
for real financial data or deploying it publicly.

## Build

```sh
npm run build
```
