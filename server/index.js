import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DB_PATH = path.join(__dirname, 'data.db')
const JWT_SECRET = process.env.JWT_SECRET || 'takaTrackSecretKey'

const app = express()
app.use(cors())
app.use(express.json())

const sqlite = sqlite3.verbose()
const db = new sqlite.Database(DB_PATH, err => {
  if (err) {
    console.error('Unable to open SQLite database:', err.message)
    process.exit(1)
  }
  console.log('SQLite database connected:', DB_PATH)
})

const run = (sql, params = []) => new Promise((resolve, reject) => {
  db.run(sql, params, function (err) {
    if (err) reject(err)
    else resolve(this)
  })
})

const all = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => {
    if (err) reject(err)
    else resolve(rows)
  })
})

const get = (sql, params = []) => new Promise((resolve, reject) => {
  db.get(sql, params, (err, row) => {
    if (err) reject(err)
    else resolve(row)
  })
})

const createTables = async () => {
  await run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`)

  await run(`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    cat TEXT NOT NULL,
    amount REAL NOT NULL,
    note TEXT,
    date TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`)

  await run(`CREATE TABLE IF NOT EXISTS budgets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    cat TEXT NOT NULL,
    budget_limit REAL NOT NULL,
    period TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`)

  await run(`CREATE TABLE IF NOT EXISTS goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    target REAL NOT NULL,
    saved REAL NOT NULL,
    color TEXT NOT NULL,
    deadline TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`)
}

const seedDefaultData = async () => {
  const userCount = await get('SELECT COUNT(*) AS count FROM users')
  let userId = null

  if (userCount?.count === 0) {
    const passwordHash = await bcrypt.hash('Demo@1234', 10)
    const result = await run('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', ['demo@takatrack.com', passwordHash, 'Demo User'])
    userId = result.lastID
  } else {
    const existing = await get('SELECT id FROM users LIMIT 1')
    userId = existing?.id
  }

  const txCount = await get('SELECT COUNT(*) AS count FROM transactions WHERE user_id = ?', [userId])
  if (txCount?.count === 0 && userId) {
    const defaultTxs = [
      { type: 'income', cat: 'Salary', amount: 85000, note: 'Monthly salary', date: '2026-04-01' },
      { type: 'income', cat: 'Freelance', amount: 22000, note: 'Client project payment', date: '2026-04-05' },
      { type: 'expense', cat: 'Food', amount: 8500, note: 'Grocery & dining', date: '2026-04-08' },
      { type: 'expense', cat: 'Transport', amount: 3200, note: 'Ride shares + fuel', date: '2026-04-10' },
      { type: 'expense', cat: 'Bills', amount: 5800, note: 'Electricity & internet', date: '2026-04-12' },
      { type: 'expense', cat: 'Shopping', amount: 6400, note: 'Clothes & accessories', date: '2026-04-15' },
      { type: 'expense', cat: 'Health', amount: 2100, note: 'Medicine & checkup', date: '2026-04-18' },
      { type: 'income', cat: 'Investment', amount: 4500, note: 'Stock dividend', date: '2026-04-20' },
      { type: 'expense', cat: 'Education', amount: 3500, note: 'Online courses', date: '2026-04-22' },
    ]
    for (const tx of defaultTxs) {
      await run(
        'INSERT INTO transactions (user_id, type, cat, amount, note, date) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, tx.type, tx.cat, tx.amount, tx.note, tx.date],
      )
    }
  }

  const budgetCount = await get('SELECT COUNT(*) AS count FROM budgets WHERE user_id = ?', [userId])
  if (budgetCount?.count === 0 && userId) {
    const defaultBudgets = [
      { cat: 'Food', limit: 10000, period: 'Monthly' },
      { cat: 'Transport', limit: 5000, period: 'Monthly' },
      { cat: 'Shopping', limit: 8000, period: 'Monthly' },
      { cat: 'Bills', limit: 7000, period: 'Monthly' },
    ]
    for (const budget of defaultBudgets) {
      await run('INSERT INTO budgets (user_id, cat, budget_limit, period) VALUES (?, ?, ?, ?)', [userId, budget.cat, budget.limit, budget.period])
    }
  }

  const goalCount = await get('SELECT COUNT(*) AS count FROM goals WHERE user_id = ?', [userId])
  if (goalCount?.count === 0 && userId) {
    const defaultGoals = [
      { name: 'Emergency Fund', target: 300000, saved: 125000, color: '#22d3a0', deadline: '2026-12-31' },
      { name: 'New Laptop', target: 120000, saved: 68000, color: '#6c8ef6', deadline: '2026-07-01' },
      { name: 'Vacation', target: 80000, saved: 22000, color: '#f5a623', deadline: '2026-11-01' },
    ]
    for (const goal of defaultGoals) {
      await run(
        'INSERT INTO goals (user_id, name, target, saved, color, deadline) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, goal.name, goal.target, goal.saved, goal.color, goal.deadline],
      )
    }
  }
}

const initDb = async () => {
  await createTables()
  await seedDefaultData()
}

const signToken = user => jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' })

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

app.post('/api/register', async (req, res) => {
  const { email, name, password } = req.body
  if (!email || !name || !password) {
    return res.status(400).json({ error: 'Registration details are incomplete.' })
  }

  const existing = await get('SELECT id FROM users WHERE email = ?', [email])
  if (existing) {
    return res.status(409).json({ error: 'Email already in use.' })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const result = await run('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [email, passwordHash, name])
  const user = await get('SELECT id, email, name FROM users WHERE id = ?', [result.lastID])
  res.status(201).json({ token: signToken(user), user })
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Login details are incomplete.' })
  }

  const user = await get('SELECT * FROM users WHERE email = ?', [email])
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' })
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid email or password.' })
  }

  res.json({ token: signToken(user), user: { id: user.id, email: user.email, name: user.name } })
})

app.get('/api/me', authenticate, async (req, res) => {
  const user = await get('SELECT id, email, name FROM users WHERE id = ?', [req.user.id])
  res.json({ user })
})

app.get('/api/transactions', authenticate, async (req, res) => {
  const rows = await all('SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC, id DESC', [req.user.id])
  res.json(rows)
})

app.post('/api/transactions', authenticate, async (req, res) => {
  const { type, cat, amount, note, date } = req.body
  if (!type || !cat || !amount || !date) {
    return res.status(400).json({ error: 'Transaction data is incomplete.' })
  }

  const result = await run(
    'INSERT INTO transactions (user_id, type, cat, amount, note, date) VALUES (?, ?, ?, ?, ?, ?)',
    [req.user.id, type, cat, amount, note || '', date],
  )
  const created = await get('SELECT * FROM transactions WHERE id = ?', [result.lastID])
  res.status(201).json(created)
})

app.delete('/api/transactions/:id', authenticate, async (req, res) => {
  await run('DELETE FROM transactions WHERE id = ? AND user_id = ?', [req.params.id, req.user.id])
  res.sendStatus(204)
})

app.get('/api/budgets', authenticate, async (req, res) => {
  const rows = await all('SELECT id, cat, budget_limit AS "limit", period FROM budgets WHERE user_id = ? ORDER BY id DESC', [req.user.id])
  res.json(rows)
})

app.post('/api/budgets', authenticate, async (req, res) => {
  const { cat, limit, period } = req.body
  if (!cat || !limit || !period) {
    return res.status(400).json({ error: 'Budget entry is incomplete.' })
  }

  const result = await run('INSERT INTO budgets (user_id, cat, budget_limit, period) VALUES (?, ?, ?, ?)', [req.user.id, cat, limit, period])
  const created = await get('SELECT id, cat, budget_limit AS "limit", period FROM budgets WHERE id = ?', [result.lastID])
  res.status(201).json(created)
})

app.delete('/api/budgets/:id', authenticate, async (req, res) => {
  await run('DELETE FROM budgets WHERE id = ? AND user_id = ?', [req.params.id, req.user.id])
  res.sendStatus(204)
})

app.get('/api/goals', authenticate, async (req, res) => {
  const rows = await all('SELECT * FROM goals WHERE user_id = ? ORDER BY id DESC', [req.user.id])
  res.json(rows)
})

app.post('/api/goals', authenticate, async (req, res) => {
  const { name, target, saved, color, deadline } = req.body
  if (!name || !target || !color) {
    return res.status(400).json({ error: 'Goal entry is incomplete.' })
  }

  const result = await run(
    'INSERT INTO goals (user_id, name, target, saved, color, deadline) VALUES (?, ?, ?, ?, ?, ?)',
    [req.user.id, name, target, saved ?? 0, color, deadline || ''],
  )
  const created = await get('SELECT * FROM goals WHERE id = ?', [result.lastID])
  res.status(201).json(created)
})

app.put('/api/goals/:id', authenticate, async (req, res) => {
  const id = Number(req.params.id)
  const goal = await get('SELECT * FROM goals WHERE id = ? AND user_id = ?', [id, req.user.id])
  if (!goal) {
    return res.status(404).json({ error: 'Goal not found.' })
  }

  const { saved, inc } = req.body
  let newSaved = goal.saved
  if (typeof inc === 'number') {
    newSaved = Math.min(goal.target, goal.saved + inc)
  } else if (typeof saved === 'number') {
    newSaved = Math.min(goal.target, saved)
  }

  await run('UPDATE goals SET saved = ? WHERE id = ? AND user_id = ?', [newSaved, id, req.user.id])
  const updated = await get('SELECT * FROM goals WHERE id = ?', [id])
  res.json(updated)
})

app.delete('/api/goals/:id', authenticate, async (req, res) => {
  await run('DELETE FROM goals WHERE id = ? AND user_id = ?', [req.params.id, req.user.id])
  res.sendStatus(204)
})

const clientPath = path.join(__dirname, '../dist')
app.use(express.static(clientPath))
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found.' })
  }
  res.sendFile(path.join(clientPath, 'index.html'))
})

const PORT = Number(process.env.PORT) || 4000

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend server started on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('Failed to initialize database:', err)
    process.exit(1)
  })
