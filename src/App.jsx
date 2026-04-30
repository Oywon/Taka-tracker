import React, { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import {
  Plus, Trash2, Edit2, TrendingUp, TrendingDown, Wallet,
  PiggyBank, Target, BarChart2, ArrowUpRight, ArrowDownRight,
  Calendar, Tag, AlignLeft, CheckCircle2, Circle, AlertTriangle,
  ChevronRight, ChevronDown, X, Save, Home, Settings,
  DollarSign, ShoppingCart, Car, Coffee, Utensils, Zap,
  Heart, BookOpen, Music, Plane, Smartphone, MoreHorizontal,
  RefreshCw, Eye, EyeOff, Moon, Sun, Filter, Bell, Search,
  TrendingDown as TDown, CreditCard, Layers, Activity
} from 'lucide-react'

/* ─── shadcn/ui IMPORTS ─────────────────────────────────────── */
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

/* ─── THEME CONTEXT ─────────────────────────────────────────── */
const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} })
const useTheme = () => useContext(ThemeContext)

/* ─── FONTS & GLOBAL STYLES ────────────────────────────────── */
const FontLoader = ({ theme }) => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap');

    :root {
      /* DARK THEME (default) */
      --bg:           #070912;
      --surface:      #11151f;
      --surface2:     #171d2b;
      --surface3:     #212a3a;
      --border:       rgba(255,255,255,0.08);
      --border2:      rgba(255,255,255,0.14);
      --text:         #eef2ff;
      --text2:        #c1c9dc;
      --text3:        #7f8ba8;
      --green:        #34d399;
      --green-bg:     rgba(52,211,153,0.14);
      --red:          #fb7185;
      --red-bg:       rgba(251,113,133,0.14);
      --amber:        #fbbf24;
      --amber-bg:     rgba(251,191,36,0.14);
      --blue:         #60a5fa;
      --blue-bg:      rgba(96,165,250,0.14);
      --purple:       #a78bfa;
      --purple-bg:    rgba(167,139,250,0.14);
      --accent:       #34d399;
      --radius:       14px;
      --radius-sm:    10px;
      --shadow:       0 4px 24px rgba(0,0,0,0.4);
      --shadow-lg:    0 24px 80px rgba(0,0,0,0.5);
    }

    [data-theme="light"] {
      --bg:           #f4f6fb;
      --surface:      #ffffff;
      --surface2:     #f0f3fa;
      --surface3:     #e4e9f5;
      --border:       rgba(0,0,0,0.08);
      --border2:      rgba(0,0,0,0.14);
      --text:         #0f1629;
      --text2:        #3a4565;
      --text3:        #7f8ba8;
      --green:        #059669;
      --green-bg:     rgba(5,150,105,0.10);
      --red:          #e11d48;
      --red-bg:       rgba(225,29,72,0.10);
      --amber:        #d97706;
      --amber-bg:     rgba(217,119,6,0.10);
      --blue:         #2563eb;
      --blue-bg:      rgba(37,99,235,0.10);
      --purple:       #7c3aed;
      --purple-bg:    rgba(124,58,237,0.10);
      --accent:       #059669;
      --shadow:       0 4px 24px rgba(0,0,0,0.08);
      --shadow-lg:    0 24px 80px rgba(0,0,0,0.12);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      -webkit-font-smoothing: antialiased;
      transition: background 0.3s ease, color 0.3s ease;
    }

    .page-shell {
      background: var(--bg);
      min-height: 100vh;
      transition: background 0.3s ease;
    }

    [data-theme="dark"] .page-shell {
      background: radial-gradient(circle at 15% 10%, rgba(52,211,153,0.10), transparent 28%),
                  radial-gradient(circle at 90% 15%, rgba(96,165,250,0.08), transparent 20%),
                  radial-gradient(circle at 50% 110%, rgba(251,191,36,0.06), transparent 12%),
                  #070912;
    }

    [data-theme="light"] .page-shell {
      background: radial-gradient(circle at 10% 0%, rgba(5,150,105,0.06), transparent 30%),
                  radial-gradient(circle at 90% 10%, rgba(37,99,235,0.05), transparent 25%),
                  #f4f6fb;
    }

    .app-sidebar {
      background: var(--surface);
      border-right: 1px solid var(--border);
      box-shadow: var(--shadow);
      transition: background 0.3s ease, border-color 0.3s ease;
    }

    [data-theme="light"] .app-sidebar {
      box-shadow: 4px 0 24px rgba(0,0,0,0.06);
    }

    .hero-card {
      border: 1px solid var(--border);
      box-shadow: var(--shadow-lg);
    }

    [data-theme="dark"] .hero-card {
      background: linear-gradient(180deg, rgba(52,211,153,0.10), rgba(17,21,31,0.95));
    }

    [data-theme="light"] .hero-card {
      background: linear-gradient(135deg, rgba(5,150,105,0.06) 0%, var(--surface) 100%);
    }

    .section-heading {
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px; margin-bottom: 24px;
    }
    .section-heading h1 { margin: 0; font-size: 28px; letter-spacing: -0.03em; }
    .section-heading p  { margin: 0; color: var(--text2); font-size: 13px; }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 14px;
    }
    @media (max-width: 1080px) { .card-grid { grid-template-columns: repeat(2,1fr); } }
    @media (max-width:  760px) { .card-grid { grid-template-columns: 1fr; } }

    @media (max-width: 860px) {
      .page-shell { flex-direction: column; }
      .app-sidebar {
        width: 100%; position: relative; height: auto;
        border-right: none; border-bottom: 1px solid var(--border);
        padding: 18px;
      }
      .sidebar-nav { flex-direction: row; flex-wrap: wrap; gap: 8px; }
      .app-sidebar .nav-link {
        flex: 1 1 calc(50% - 8px); justify-content: center;
        padding: 10px 12px; text-align: center; min-width: 120px;
      }
      .app-sidebar .nav-link span { flex: unset; }
      .app-sidebar .nav-link.active { border-radius: 16px; }
      .section-heading { flex-direction: column; align-items: flex-start; }
      main { min-height: calc(100vh - 140px); }
    }

    .font-display { font-family: 'DM Serif Display', Georgia, serif; }
    .font-mono    { font-family: 'JetBrains Mono', monospace; }

    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--surface3); border-radius: 4px; }

    @keyframes fadeUp   { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
    @keyframes scaleIn  { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }

    .fade-up   { animation: fadeUp  0.45s cubic-bezier(0.16,1,0.3,1) both; }
    .fade-up-1 { animation: fadeUp  0.45s 0.05s cubic-bezier(0.16,1,0.3,1) both; }
    .fade-up-2 { animation: fadeUp  0.45s 0.10s cubic-bezier(0.16,1,0.3,1) both; }
    .fade-up-3 { animation: fadeUp  0.45s 0.15s cubic-bezier(0.16,1,0.3,1) both; }
    .fade-up-4 { animation: fadeUp  0.45s 0.20s cubic-bezier(0.16,1,0.3,1) both; }
    .scale-in  { animation: scaleIn 0.3s  cubic-bezier(0.16,1,0.3,1) both; }
    .fade-in   { animation: fadeIn  0.3s ease both; }

    /* Custom card styles that extend shadcn */
    .stat-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px 22px;
      position: relative; overflow: hidden;
      transition: all 0.2s;
    }
    .stat-card::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at top left, rgba(34,211,160,0.04) 0%, transparent 60%);
      pointer-events: none;
    }
    [data-theme="light"] .stat-card::before { background: none; }

    .nav-link {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 14px; border-radius: var(--radius-sm);
      color: var(--text2); text-decoration: none;
      font-size: 13.5px; font-weight: 500;
      transition: all 0.15s; cursor: pointer;
      border: none; background: none; width: 100%;
    }
    .nav-link:hover { background: var(--surface2); color: var(--text); }
    .nav-link.active { background: var(--green-bg); color: var(--green); }

    .sidebar-nav { display: flex; flex-direction: column; gap: 2px; }
    .app-sidebar .nav-link { justify-content: flex-start; }
    .app-sidebar .nav-link span { flex: 1; }

    /* Legacy btn classes kept for compat */
    .btn {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 9px 18px; border-radius: var(--radius-sm);
      font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
      cursor: pointer; border: none; transition: all 0.15s;
    }
    .btn-primary { background: var(--green); color: #0e0f14; }
    .btn-primary:hover { opacity: 0.88; }
    .btn-secondary { background: var(--surface2); color: var(--text); border: 1px solid var(--border); }
    .btn-secondary:hover { background: var(--surface3); }
    .btn-danger { background: var(--red-bg); color: var(--red); }
    .btn-ghost { background: none; color: var(--text2); }
    .btn-ghost:hover { color: var(--text); background: var(--surface2); }
    .btn-icon { padding: 8px; border-radius: var(--radius-sm); }

    /* Custom inputs */
    .custom-input {
      background: var(--surface2); border: 1px solid var(--border);
      border-radius: var(--radius-sm); padding: 10px 14px;
      color: var(--text); font-family: 'DM Sans', sans-serif;
      font-size: 13.5px; outline: none; transition: border-color 0.15s; width: 100%;
    }
    .custom-input:focus { border-color: var(--green); }
    .custom-input::placeholder { color: var(--text3); }
    select.custom-input option { background: var(--surface2); color: var(--text); }

    .custom-label {
      font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--text3);
      display: block; margin-bottom: 6px;
    }

    .progress-track { height: 6px; background: var(--surface3); border-radius: 3px; overflow: hidden; }
    .progress-fill  { height: 100%; border-radius: 3px; transition: width 1s cubic-bezier(0.16,1,0.3,1); }

    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.7);
      backdrop-filter: blur(6px); z-index: 200;
      display: flex; align-items: center; justify-content: center;
      padding: 16px; animation: fadeIn 0.2s ease both;
    }
    .modal {
      background: var(--surface); border: 1px solid var(--border2);
      border-radius: 20px; padding: 28px; width: 100%; max-width: 480px;
      animation: scaleIn 0.25s cubic-bezier(0.16,1,0.3,1) both;
      box-shadow: var(--shadow-lg);
    }

    .tx-row {
      display: flex; align-items: center; gap: 12px;
      padding: 13px 0; border-bottom: 1px solid var(--border);
      transition: all 0.15s; cursor: pointer;
    }
    .tx-row:last-child { border-bottom: none; }
    .tx-row:hover {
      background: var(--surface2); border-radius: var(--radius-sm);
      padding-left: 10px; padding-right: 10px; margin: 0 -10px;
    }

    .amount-positive { color: var(--green); }
    .amount-negative { color: var(--red); }

    .tooltip { position: relative; }
    .tooltip-content {
      display: none; position: absolute; bottom: calc(100% + 6px); left: 50%;
      transform: translateX(-50%); background: var(--surface3); color: var(--text);
      font-size: 11px; padding: 5px 10px; border-radius: 6px;
      white-space: nowrap; pointer-events: none; z-index: 10;
    }
    .tooltip:hover .tooltip-content { display: block; }

    /* Theme toggle button */
    .theme-btn {
      width: 38px; height: 38px; border-radius: 10px;
      border: 1px solid var(--border); background: var(--surface2);
      color: var(--text2); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .theme-btn:hover { background: var(--surface3); color: var(--text); border-color: var(--border2); }

    /* Topbar */
    .topbar {
      height: 58px; border-bottom: 1px solid var(--border);
      background: var(--surface); display: flex;
      align-items: center; padding: 0 24px; gap: 12px;
      position: sticky; top: 0; z-index: 10;
      backdrop-filter: blur(10px);
      transition: background 0.3s ease;
    }
    [data-theme="light"] .topbar { background: rgba(255,255,255,0.85); }
    [data-theme="dark"] .topbar { background: rgba(17,21,31,0.85); }

    .card-custom {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius); transition: all 0.2s;
    }
    .card-custom:hover { border-color: var(--border2); }
  `}</style>
)

/* ─── HELPERS ───────────────────────────────────────────────── */
const fmt = n => '৳' + Number(n).toLocaleString('en-BD', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
const today = () => new Date().toISOString().slice(0, 10)

const CAT_ICONS = {
  Food:        <Utensils size={14} />,
  Transport:   <Car size={14} />,
  Shopping:    <ShoppingCart size={14} />,
  Bills:       <Zap size={14} />,
  Health:      <Heart size={14} />,
  Education:   <BookOpen size={14} />,
  Salary:      <DollarSign size={14} />,
  Freelance:   <Smartphone size={14} />,
  Savings:     <PiggyBank size={14} />,
  Investment:  <TrendingUp size={14} />,
  Other:       <MoreHorizontal size={14} />,
}

const CAT_COLORS = {
  Food: '#f5a623', Transport: '#6c8ef8', Shopping: '#f4607a',
  Bills: '#a78bfa', Health: '#f87171', Education: '#34d399',
  Salary: '#22d3a0', Freelance: '#60a5fa', Savings: '#fbbf24',
  Investment: '#a78bfa', Other: '#9395a5'
}

const EXPENSE_CATS = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Education', 'Other']
const INCOME_CATS  = ['Salary', 'Freelance', 'Investment', 'Other']

const DEFAULT_TXS = [
  { id: 1, type: 'income',  cat: 'Salary',    amount: 85000, note: 'Monthly salary',         date: '2026-04-01' },
  { id: 2, type: 'income',  cat: 'Freelance', amount: 22000, note: 'Client project payment',  date: '2026-04-05' },
  { id: 3, type: 'expense', cat: 'Food',      amount: 8500,  note: 'Grocery & dining',        date: '2026-04-08' },
  { id: 4, type: 'expense', cat: 'Transport', amount: 3200,  note: 'Ride shares + fuel',      date: '2026-04-10' },
  { id: 5, type: 'expense', cat: 'Bills',     amount: 5800,  note: 'Electricity & internet',  date: '2026-04-12' },
  { id: 6, type: 'expense', cat: 'Shopping',  amount: 6400,  note: 'Clothes & accessories',   date: '2026-04-15' },
  { id: 7, type: 'expense', cat: 'Health',    amount: 2100,  note: 'Medicine & checkup',      date: '2026-04-18' },
  { id: 8, type: 'income',  cat: 'Investment',amount: 4500,  note: 'Stock dividend',          date: '2026-04-20' },
  { id: 9, type: 'expense', cat: 'Education', amount: 3500,  note: 'Online courses',          date: '2026-04-22' },
]

const DEFAULT_BUDGETS = [
  { id: 1, cat: 'Food',      limit: 10000, period: 'Monthly' },
  { id: 2, cat: 'Transport', limit: 5000,  period: 'Monthly' },
  { id: 3, cat: 'Shopping',  limit: 8000,  period: 'Monthly' },
  { id: 4, cat: 'Bills',     limit: 7000,  period: 'Monthly' },
]

const DEFAULT_SAVINGS = [
  { id: 1, name: 'Emergency Fund', target: 300000, saved: 125000, color: '#22d3a0', deadline: '2026-12-31' },
  { id: 2, name: 'New Laptop',     target: 120000, saved: 68000,  color: '#6c8ef6', deadline: '2026-07-01' },
  { id: 3, name: 'Vacation',       target: 80000,  saved: 22000,  color: '#f5a623', deadline: '2026-11-01' },
]

/* ─── LOGO ──────────────────────────────────────────────────── */
const AppLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <div style={{
      width: 36, height: 36, borderRadius: 10,
      background: 'linear-gradient(135deg, #22d3a0 0%, #6c8ef8 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 14px rgba(34,211,160,0.3)'
    }}>
      <Wallet size={18} color="#0e0f14" strokeWidth={2.5} />
    </div>
    <div>
      <div className="font-display" style={{ fontSize: 17, color: 'var(--text)', lineHeight: 1.1 }}>TakaTrack</div>
      <div style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text3)', fontWeight: 600 }}>Finance Center</div>
    </div>
  </div>
)

/* ─── THEME TOGGLE BUTTON ───────────────────────────────────── */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <button className="theme-btn" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  )
}

/* ─── AUTH PAGE ─────────────────────────────────────────────── */
const AuthPage = ({ onLogin, onRegister, error }) => {
  const [mode, setMode]       = useState('login')
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy]       = useState(false)
  const { theme }             = useTheme()

  const submit = async () => {
    setBusy(true)
    try {
      if (mode === 'login') await onLogin(email, password)
      else await onRegister(name, email, password)
    } finally { setBusy(false) }
  }

  return (
    <div className="page-shell" data-theme={theme} style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 24 }}>
      <FontLoader theme={theme} />
      <div style={{ maxWidth: 460, width: '100%' }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <AppLogo />
        </div>

        <Card style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }}>
          <CardHeader style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <CardTitle className="font-display" style={{ fontSize: 22, color: 'var(--text)' }}>
                  {mode === 'login' ? 'Welcome back' : 'Create account'}
                </CardTitle>
                <CardDescription style={{ color: 'var(--text3)', marginTop: 4 }}>
                  {mode === 'login' ? 'Sign in to your finance dashboard' : 'Start tracking your finances today'}
                </CardDescription>
              </div>
              <ThemeToggle />
            </div>
            {/* Mode tabs using shadcn Badge */}
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              {['login', 'register'].map(m => (
                <Badge
                  key={m}
                  onClick={() => setMode(m)}
                  variant={mode === m ? 'default' : 'outline'}
                  style={{
                    cursor: 'pointer',
                    background: mode === m ? 'var(--green)' : 'transparent',
                    color: mode === m ? '#0e0f14' : 'var(--text3)',
                    border: mode === m ? 'none' : '1px solid var(--border)',
                    padding: '5px 14px', borderRadius: 20, fontWeight: 600,
                    fontSize: 12, textTransform: 'capitalize'
                  }}
                >
                  {m === 'login' ? 'Sign In' : 'Register'}
                </Badge>
              ))}
            </div>
          </CardHeader>

          <CardContent style={{ padding: 24 }}>
            {error && (
              <div style={{ color: 'var(--red)', marginBottom: 16, fontSize: 13, background: 'var(--red-bg)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertTriangle size={14} /> {error}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {mode === 'register' && (
                <div>
                  <Label style={{ color: 'var(--text3)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Full Name</Label>
                  <Input
                    placeholder="Jane Doe"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 10 }}
                  />
                </div>
              )}
              <div>
                <Label style={{ color: 'var(--text3)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Email Address</Label>
                <Input
                  type="email"
                  placeholder="hello@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 10 }}
                />
              </div>
              <div>
                <Label style={{ color: 'var(--text3)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6, display: 'block' }}>Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 10 }}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter style={{ padding: '0 24px 24px', flexDirection: 'column', gap: 12, alignItems: 'stretch' }}>
            <Button
              onClick={submit}
              disabled={busy || !email || !password || (mode === 'register' && !name)}
              style={{
                width: '100%', background: 'var(--green)', color: '#0e0f14',
                fontWeight: 700, borderRadius: 10, height: 44, fontSize: 14,
                border: 'none', cursor: busy ? 'not-allowed' : 'pointer', opacity: busy ? 0.7 : 1
              }}
            >
              {busy ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
            <Separator style={{ background: 'var(--border)' }} />
            <div style={{ fontSize: 13, color: 'var(--text3)', textAlign: 'center' }}>
              {mode === 'login'
                ? <>New to TakaTrack?{' '}
                    <button style={{ background: 'none', border: 'none', color: 'var(--green)', fontWeight: 600, cursor: 'pointer', fontSize: 13 }} onClick={() => setMode('register')}>Create account</button>
                  </>
                : <>Already have an account?{' '}
                    <button style={{ background: 'none', border: 'none', color: 'var(--green)', fontWeight: 600, cursor: 'pointer', fontSize: 13 }} onClick={() => setMode('login')}>Sign in</button>
                  </>}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

/* ─── TOPBAR ────────────────────────────────────────────────── */
const Topbar = ({ user, onLogout, onAdd, balance }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="topbar">
      <div style={{ flex: 1 }} />

      {/* Balance pill */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'var(--green-bg)', border: '1px solid rgba(52,211,153,0.2)',
        borderRadius: 20, padding: '5px 14px'
      }}>
        <Wallet size={12} style={{ color: 'var(--green)' }} />
        <span className="font-mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>{fmt(balance)}</span>
      </div>

      {/* Add transaction button */}
      <Button
        onClick={onAdd}
        style={{
          background: 'var(--green)', color: '#0e0f14',
          fontWeight: 700, borderRadius: 10, height: 36,
          fontSize: 13, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px'
        }}
      >
        <Plus size={14} /> Add
      </Button>

      {/* Theme toggle */}
      <ThemeToggle />

      {/* User dropdown */}
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #22d3a0, #6c8ef8)',
              border: 'none', cursor: 'pointer', color: '#0e0f14',
              fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 12, minWidth: 200, padding: 6 }} align="end">
            <DropdownMenuLabel style={{ color: 'var(--text3)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '8px 12px' }}>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator style={{ background: 'var(--border)', margin: '4px 0' }} />
            <div style={{ padding: '8px 12px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{user.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>{user.email}</div>
            </div>
            <DropdownMenuSeparator style={{ background: 'var(--border)', margin: '4px 0' }} />
            <DropdownMenuItem
              onClick={toggleTheme}
              style={{ padding: '9px 12px', borderRadius: 8, cursor: 'pointer', color: 'var(--text2)', fontSize: 13, display: 'flex', gap: 8 }}
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </DropdownMenuItem>
            <DropdownMenuSeparator style={{ background: 'var(--border)', margin: '4px 0' }} />
            <DropdownMenuItem
              onClick={onLogout}
              style={{ padding: '9px 12px', borderRadius: 8, cursor: 'pointer', color: 'var(--red)', fontSize: 13 }}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

/* ─── SIDEBAR ───────────────────────────────────────────────── */
const Sidebar = ({ balance, user, onLogout }) => {
  const loc = useLocation()
  const { theme } = useTheme()
  const links = [
    { to: '/',             label: 'Dashboard',     icon: <Home size={16} /> },
    { to: '/transactions', label: 'Transactions',  icon: <AlignLeft size={16} /> },
    { to: '/budget',       label: 'Budget',        icon: <Target size={16} /> },
    { to: '/savings',      label: 'Savings Goals', icon: <PiggyBank size={16} /> },
    { to: '/reports',      label: 'Reports',       icon: <BarChart2 size={16} /> },
  ]

  return (
    <aside className="app-sidebar" style={{
      width: 240, flexShrink: 0,
      height: '100vh', position: 'sticky', top: 0,
      display: 'flex', flexDirection: 'column',
      padding: '24px 16px',
    }}>
      <div style={{ marginBottom: 24, padding: '0 6px' }}>
        <AppLogo />
      </div>

      {/* Balance card */}
      <Card style={{
        background: 'var(--surface2)', border: '1px solid var(--border)',
        borderRadius: 14, marginBottom: 20
      }}>
        <CardContent style={{ padding: '14px 16px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 6 }}>Net Balance</div>
          <div className="font-mono" style={{ fontSize: 20, fontWeight: 700, color: balance >= 0 ? 'var(--green)' : 'var(--red)' }}>
            {fmt(balance)}
          </div>
          <div style={{ marginTop: 8 }}>
            <Badge style={{
              background: balance >= 0 ? 'var(--green-bg)' : 'var(--red-bg)',
              color: balance >= 0 ? 'var(--green)' : 'var(--red)',
              border: 'none', fontSize: 10, fontWeight: 700
            }}>
              {balance >= 0 ? '↑ Net positive' : '↓ Overspent'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Separator style={{ background: 'var(--border)', marginBottom: 12 }} />

      <nav className="sidebar-nav" style={{ flex: 1 }}>
        {links.map(l => (
          <Link key={l.to} to={l.to} className={`nav-link ${loc.pathname === l.to ? 'active' : ''}`}>
            {l.icon}
            <span>{l.label}</span>
            {loc.pathname === l.to && <ChevronRight size={13} style={{ marginLeft: 'auto' }} />}
          </Link>
        ))}
      </nav>

      <Separator style={{ background: 'var(--border)', marginTop: 12, marginBottom: 12 }} />

      <div style={{ padding: '0 6px' }}>
        <div style={{ fontSize: 10, color: 'var(--text3)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
          {new Date().toLocaleDateString('en-BD', { month: 'long', year: 'numeric' })}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text3)' }}>Dhaka, Bangladesh</div>
      </div>
    </aside>
  )
}

/* ─── ADD TRANSACTION SHEET ─────────────────────────────────── */
const AddTxSheet = ({ open, onClose, onAdd }) => {
  const [type, setType]     = useState('expense')
  const [amount, setAmount] = useState('')
  const [cat, setCat]       = useState('')
  const [note, setNote]     = useState('')
  const [date, setDate]     = useState(today())
  const cats = type === 'expense' ? EXPENSE_CATS : INCOME_CATS

  const submit = () => {
    if (!amount || !cat) return
    onAdd({ id: Date.now(), type, amount: parseFloat(amount), cat, note, date })
    setAmount(''); setCat(''); setNote(''); setDate(today())
    onClose()
  }

  return (
    <Sheet open={open} onOpenChange={v => !v && onClose()}>
      <SheetContent style={{ background: 'var(--surface)', border: 'none', borderLeft: '1px solid var(--border2)', color: 'var(--text)', width: 420, maxWidth: '100vw' }}>
        <SheetHeader style={{ marginBottom: 24 }}>
          <SheetTitle style={{ color: 'var(--text)', fontSize: 20 }} className="font-display">Add Transaction</SheetTitle>
          <SheetDescription style={{ color: 'var(--text3)' }}>Record a new income or expense entry</SheetDescription>
        </SheetHeader>

        {/* Type toggle */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24, background: 'var(--surface2)', padding: 4, borderRadius: 12 }}>
          {['expense', 'income'].map(t => (
            <button key={t} onClick={() => { setType(t); setCat('') }} style={{
              flex: 1, padding: '10px', borderRadius: 9, border: 'none', cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700,
              background: type === t ? (t === 'expense' ? 'var(--red)' : 'var(--green)') : 'transparent',
              color: type === t ? '#0e0f14' : 'var(--text3)', transition: 'all 0.2s'
            }}>
              {t === 'expense' ? '− Expense' : '+ Income'}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <Label style={{ color: 'var(--text3)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Amount (৳)</Label>
            <Input
              type="number" placeholder="0" value={amount}
              onChange={e => setAmount(e.target.value)}
              style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 10, fontSize: 22, fontWeight: 700, height: 54, fontFamily: 'JetBrains Mono, monospace' }}
            />
          </div>

          <div>
            <Label style={{ color: 'var(--text3)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Category</Label>
            <Select value={cat} onValueChange={setCat}>
              <SelectTrigger style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: cat ? 'var(--text)' : 'var(--text3)', borderRadius: 10, height: 42 }}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 12, color: 'var(--text)' }}>
                {cats.map(c => (
                  <SelectItem key={c} value={c} style={{ color: 'var(--text)', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: CAT_COLORS[c] }}>{CAT_ICONS[c]}</span> {c}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label style={{ color: 'var(--text3)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Note (optional)</Label>
            <Input
              placeholder="What was this for?"
              value={note} onChange={e => setNote(e.target.value)}
              style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 10, height: 42 }}
            />
          </div>

          <div>
            <Label style={{ color: 'var(--text3)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Date</Label>
            <Input
              type="date" value={date} onChange={e => setDate(e.target.value)}
              style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 10, height: 42 }}
            />
          </div>
        </div>

        <SheetFooter style={{ marginTop: 28, flexDirection: 'column', gap: 10 }}>
          <Button
            onClick={submit}
            disabled={!amount || !cat}
            style={{
              width: '100%', background: type === 'expense' ? 'var(--red)' : 'var(--green)',
              color: '#0e0f14', fontWeight: 700, borderRadius: 10, height: 46,
              fontSize: 14, border: 'none', cursor: !amount || !cat ? 'not-allowed' : 'pointer',
              opacity: !amount || !cat ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center'
            }}
          >
            <Save size={15} />
            Save {type === 'expense' ? 'Expense' : 'Income'}
          </Button>
          <SheetClose asChild>
            <Button variant="outline" style={{ width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text2)', borderRadius: 10, height: 40 }}>
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

/* ─── MINI BAR CHART ────────────────────────────────────────── */
const MiniBar = ({ data, color }) => {
  const max = Math.max(...data.map(d => d.v), 1)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48 }}>
      {data.map((d, i) => (
        <div key={i} className="tooltip" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
          <div style={{
            width: '100%', borderRadius: '3px 3px 0 0', background: color,
            height: `${Math.max(4, (d.v / max) * 100)}%`,
            opacity: i === data.length - 1 ? 1 : 0.4,
            transition: 'height 0.5s cubic-bezier(0.16,1,0.3,1)'
          }} />
          <span className="tooltip-content">{d.label}: {fmt(d.v)}</span>
        </div>
      ))}
    </div>
  )
}

/* ─── DONUT CHART ───────────────────────────────────────────── */
const DonutChart = ({ segments, size = 110 }) => {
  const total = segments.reduce((s, x) => s + x.value, 0)
  if (total === 0) return null
  let offset = 0
  const cx = size / 2, cy = size / 2, r = size * 0.38, stroke = size * 0.13
  const circ = 2 * Math.PI * r
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--surface3)" strokeWidth={stroke} />
      {segments.map((seg, i) => {
        const pct = seg.value / total
        const dash = pct * circ, gap = circ - dash
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={seg.color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset * circ}
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.16,1,0.3,1)' }}
          />
        )
        offset += pct; return el
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize={size * 0.12} fontWeight="700" fill="var(--text)" fontFamily="JetBrains Mono, monospace">{segments.length}</text>
      <text x={cx} y={cy + 11} textAnchor="middle" fontSize={size * 0.09} fill="var(--text3)" fontFamily="DM Sans, sans-serif">cats</text>
    </svg>
  )
}

/* ─── DASHBOARD ─────────────────────────────────────────────── */
const Dashboard = ({ txs, onAdd }) => {
  const totalIncome  = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const totalExpense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const balance      = totalIncome - totalExpense
  const savingsRate  = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1) : 0

  const weeks   = ['W1', 'W2', 'W3', 'W4']
  const weekData = weeks.map((label, i) => ({
    label, v: txs.filter(t => t.type === 'expense').reduce((s, t) => {
      const d = new Date(t.date).getDate()
      return d >= i * 7 + 1 && d <= (i + 1) * 7 ? s + t.amount : s
    }, 0)
  }))

  const expByCat = EXPENSE_CATS.map(c => ({
    cat: c, value: txs.filter(t => t.type === 'expense' && t.cat === c).reduce((s, t) => s + t.amount, 0), color: CAT_COLORS[c]
  })).filter(x => x.value > 0)

  const recent = [...txs].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'

  return (
    <div style={{ flex: 1, padding: '24px 28px', overflowY: 'auto' }}>
      {/* Header */}
      <div className="section-heading fade-up" style={{ alignItems: 'flex-start' }}>
        <div>
          <h1 className="font-display" style={{ fontSize: 28, color: 'var(--text)' }}>{greeting} 👋</h1>
          <p style={{ color: 'var(--text2)', marginTop: 4 }}>
            {new Date().toLocaleDateString('en-BD', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button onClick={onAdd} style={{ background: 'var(--green)', color: '#0e0f14', fontWeight: 700, borderRadius: 10, height: 38, fontSize: 13, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, padding: '0 16px' }}>
            <Plus size={14} /> Add Transaction
          </Button>
        </div>
      </div>

      {/* Hero overview card */}
      <Card className="hero-card fade-up-1" style={{ marginBottom: 20, borderRadius: 18, overflow: 'hidden' }}>
        <CardContent style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Net Balance</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div className="font-mono" style={{ fontSize: 36, fontWeight: 700, color: 'var(--text)' }}>{fmt(balance)}</div>
                <Badge style={{ background: 'var(--green-bg)', color: 'var(--green)', border: 'none', fontSize: 12, fontWeight: 700, padding: '6px 12px', borderRadius: 20 }}>
                  {savingsRate}% saving rate
                </Badge>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: 'min(400px, 100%)' }}>
              {[
                { label: 'Monthly Income',  value: fmt(totalIncome),  color: 'var(--green)' },
                { label: 'Monthly Expense', value: fmt(totalExpense), color: 'var(--red)' }
              ].map(s => (
                <div key={s.label} style={{ padding: '16px 18px', background: 'var(--surface2)', borderRadius: 14, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 6 }}>{s.label}</div>
                  <div className="font-mono" style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stat cards */}
      <div className="card-grid" style={{ marginBottom: 20 }}>
        {[
          { label: 'Total Balance',  value: fmt(balance),      sub: balance >= 0 ? '↑ Net positive' : '↓ Overspent',  color: balance >= 0 ? 'var(--green)' : 'var(--red)', icon: <Wallet size={18} />, badgeColor: balance >= 0 ? '#green' : 'red' },
          { label: 'Income',         value: fmt(totalIncome),  sub: `${txs.filter(t=>t.type==='income').length} transactions`,  color: 'var(--green)', icon: <ArrowUpRight size={18} /> },
          { label: 'Expenses',       value: fmt(totalExpense), sub: `${txs.filter(t=>t.type==='expense').length} transactions`, color: 'var(--red)',   icon: <ArrowDownRight size={18} /> },
          { label: 'Savings Rate',   value: `${savingsRate}%`, sub: 'of income saved', color: 'var(--blue)', icon: <PiggyBank size={18} /> },
        ].map((s, i) => (
          <Card key={s.label} className={`fade-up-${i}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            <CardContent style={{ padding: '20px 22px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)' }}>{s.label}</span>
                <div style={{ padding: 7, borderRadius: 8, background: s.color + '20', color: s.color }}>{s.icon}</div>
              </div>
              <div className="font-mono" style={{ fontSize: 22, fontWeight: 700, color: s.color, marginBottom: 6 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>{s.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
        <Card className="fade-up-1" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16 }}>
          <CardHeader style={{ padding: '20px 22px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <CardTitle style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Weekly Spending</CardTitle>
                <CardDescription style={{ color: 'var(--text3)', fontSize: 11 }}>This month's breakdown</CardDescription>
              </div>
              <Badge style={{ background: 'var(--red-bg)', color: 'var(--red)', border: 'none', fontSize: 10, fontWeight: 700 }}>Expense</Badge>
            </div>
          </CardHeader>
          <CardContent style={{ padding: '16px 22px 20px' }}>
            <MiniBar data={weekData} color="var(--red)" />
            <div style={{ display: 'flex', gap: 0, marginTop: 8 }}>
              {weekData.map((d, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: 'var(--text3)' }}>{d.label}</div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="fade-up-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16 }}>
          <CardHeader style={{ padding: '20px 22px 0' }}>
            <CardTitle style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Expense by Category</CardTitle>
            <CardDescription style={{ color: 'var(--text3)', fontSize: 11 }}>Distribution this month</CardDescription>
          </CardHeader>
          <CardContent style={{ padding: '16px 22px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <DonutChart segments={expByCat} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
                {expByCat.slice(0, 5).map(s => (
                  <div key={s.cat} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
                      <span style={{ fontSize: 12, color: 'var(--text2)' }}>{s.cat}</span>
                    </div>
                    <span className="font-mono" style={{ fontSize: 11, color: 'var(--text3)' }}>{fmt(s.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent transactions */}
      <Card className="fade-up-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16 }}>
        <CardHeader style={{ padding: '20px 22px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <CardTitle style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Recent Transactions</CardTitle>
              <CardDescription style={{ color: 'var(--text3)', fontSize: 11 }}>Latest 5 entries</CardDescription>
            </div>
            <Link to="/transactions" style={{ fontSize: 12, color: 'var(--green)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
              View all <ChevronRight size={13} />
            </Link>
          </div>
        </CardHeader>
        <CardContent style={{ padding: '12px 22px 20px' }}>
          {recent.map(t => (
            <div key={t.id} className="tx-row">
              <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: t.type === 'income' ? 'var(--green-bg)' : `${CAT_COLORS[t.cat]}20`, color: t.type === 'income' ? 'var(--green)' : CAT_COLORS[t.cat], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {CAT_ICONS[t.cat] || <MoreHorizontal size={14} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.note || t.cat}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Badge style={{ background: `${CAT_COLORS[t.cat]}20`, color: CAT_COLORS[t.cat], border: 'none', fontSize: 10, fontWeight: 700, padding: '2px 8px' }}>{t.cat}</Badge>
                  <span style={{ fontSize: 11, color: 'var(--text3)' }}>{t.date}</span>
                </div>
              </div>
              <div className={`font-mono ${t.type === 'income' ? 'amount-positive' : 'amount-negative'}`} style={{ fontSize: 14, fontWeight: 700 }}>
                {t.type === 'income' ? '+' : '−'}{fmt(t.amount)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

/* ─── TRANSACTIONS PAGE ─────────────────────────────────────── */
const Transactions = ({ txs, onAdd, onDelete }) => {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = txs
    .filter(t => filter === 'all' || t.type === filter)
    .filter(t => !search || t.note?.toLowerCase().includes(search.toLowerCase()) || t.cat.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const totalIncome  = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const totalExpense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)

  return (
    <div style={{ flex: 1, padding: '24px 28px', overflowY: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }} className="fade-up">
        <div>
          <h1 className="font-display" style={{ fontSize: 26, color: 'var(--text)', marginBottom: 4 }}>Transactions</h1>
          <p style={{ color: 'var(--text2)', fontSize: 13 }}>{txs.length} total entries</p>
        </div>
        <Button onClick={onAdd} style={{ background: 'var(--green)', color: '#0e0f14', fontWeight: 700, borderRadius: 10, height: 38, fontSize: 13, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, padding: '0 16px' }}>
          <Plus size={14} /> Add
        </Button>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'Total Income',  value: fmt(totalIncome),  color: 'var(--green)', bg: 'var(--green-bg)' },
          { label: 'Total Expense', value: fmt(totalExpense), color: 'var(--red)',   bg: 'var(--red-bg)' },
          { label: 'Net Balance',   value: fmt(totalIncome - totalExpense), color: totalIncome >= totalExpense ? 'var(--green)' : 'var(--red)', bg: 'var(--surface2)' },
        ].map(s => (
          <Card key={s.label} className="fade-up-1" style={{ background: s.bg, border: '1px solid var(--border)', borderRadius: 14 }}>
            <CardContent style={{ padding: '14px 18px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 6 }}>{s.label}</div>
              <div className="font-mono" style={{ fontSize: 19, fontWeight: 700, color: s.color }}>{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="fade-up-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, marginBottom: 14 }}>
        <CardContent style={{ padding: '14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', gap: 6, background: 'var(--surface2)', padding: 4, borderRadius: 10 }}>
              {['all', 'income', 'expense'].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: '6px 14px', borderRadius: 7, border: 'none', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 700,
                  background: filter === f ? (f === 'expense' ? 'var(--red)' : f === 'income' ? 'var(--green)' : 'var(--surface3)') : 'transparent',
                  color: filter === f ? (f === 'all' ? 'var(--text)' : '#0e0f14') : 'var(--text2)',
                  transition: 'all 0.15s', textTransform: 'capitalize'
                }}>{f}</button>
              ))}
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
              <Input
                placeholder="Search transactions…"
                value={search} onChange={e => setSearch(e.target.value)}
                style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 10, paddingLeft: 36, height: 38 }}
              />
              <Search size={13} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
            </div>
            <Badge style={{ background: 'var(--surface2)', color: 'var(--text3)', border: '1px solid var(--border)', fontWeight: 600, fontSize: 11 }}>
              {filtered.length} results
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* List */}
      <Card className="fade-up-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16 }}>
        <CardContent style={{ padding: '6px 18px' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text3)', fontSize: 13 }}>No transactions found.</div>
          ) : filtered.map(t => (
            <div key={t.id} className="tx-row">
              <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: t.type === 'income' ? 'var(--green-bg)' : `${CAT_COLORS[t.cat]}20`, color: t.type === 'income' ? 'var(--green)' : CAT_COLORS[t.cat], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {CAT_ICONS[t.cat]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text)' }}>{t.note || t.cat}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--text3)' }}>
                  <Badge style={{ background: `${CAT_COLORS[t.cat]}20`, color: CAT_COLORS[t.cat], border: 'none', fontSize: 10, fontWeight: 700, padding: '2px 8px' }}>{t.cat}</Badge>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={10} />{t.date}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className={`font-mono ${t.type === 'income' ? 'amount-positive' : 'amount-negative'}`} style={{ fontSize: 14.5, fontWeight: 700 }}>
                  {t.type === 'income' ? '+' : '−'}{fmt(t.amount)}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'capitalize' }}>{t.type}</div>
              </div>
              <button
                onClick={() => onDelete(t.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 7, borderRadius: 7, color: 'var(--text3)', display: 'flex', marginLeft: 4, transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.background = 'var(--red-bg)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.background = 'none' }}
              ><Trash2 size={13} /></button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

/* ─── BUDGET PAGE ───────────────────────────────────────────── */
const Budget = ({ txs, budgets, onAddBudget, onDeleteBudget }) => {
  const [showAdd, setShowAdd] = useState(false)
  const [cat, setCat]       = useState('')
  const [limit, setLimit]   = useState('')
  const [period, setPeriod] = useState('Monthly')

  const addBudget = async () => {
    if (!cat || !limit) return
    await onAddBudget({ cat, limit: parseFloat(limit), period })
    setCat(''); setLimit(''); setShowAdd(false)
  }

  return (
    <div style={{ flex: 1, padding: '24px 28px', overflowY: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }} className="fade-up">
        <div>
          <h1 className="font-display" style={{ fontSize: 26, color: 'var(--text)', marginBottom: 4 }}>Budget Limits</h1>
          <p style={{ color: 'var(--text2)', fontSize: 13 }}>Set spending limits per category</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} style={{ background: 'var(--green)', color: '#0e0f14', fontWeight: 700, borderRadius: 10, height: 38, fontSize: 13, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, padding: '0 16px' }}>
          <Plus size={14} /> New Budget
        </Button>
      </div>

      {showAdd && (
        <Card className="scale-in" style={{ background: 'var(--surface)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: 16, marginBottom: 20 }}>
          <CardHeader style={{ padding: '20px 22px 0' }}>
            <CardTitle style={{ fontSize: 13, color: 'var(--green)', fontWeight: 700 }}>New Budget Rule</CardTitle>
          </CardHeader>
          <CardContent style={{ padding: '16px 22px 22px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 12, alignItems: 'flex-end' }}>
              <div>
                <Label style={{ color: 'var(--text3)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Category</Label>
                <Select value={cat} onValueChange={setCat}>
                  <SelectTrigger style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: cat ? 'var(--text)' : 'var(--text3)', borderRadius: 10, height: 40 }}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 12, color: 'var(--text)' }}>
                    {EXPENSE_CATS.map(c => <SelectItem key={c} value={c} style={{ color: 'var(--text)' }}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label style={{ color: 'var(--text3)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Limit (৳)</Label>
                <Input type="number" value={limit} onChange={e => setLimit(e.target.value)} placeholder="0"
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 10, height: 40, fontFamily: 'JetBrains Mono, monospace' }} />
              </div>
              <div>
                <Label style={{ color: 'var(--text3)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Period</Label>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 10, height: 40 }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 12, color: 'var(--text)' }}>
                    {['Monthly', 'Weekly'].map(p => <SelectItem key={p} value={p} style={{ color: 'var(--text)' }}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addBudget} style={{ background: 'var(--green)', color: '#0e0f14', border: 'none', cursor: 'pointer', height: 40, borderRadius: 10, fontWeight: 700, padding: '0 16px' }}>
                <Save size={14} />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {budgets.map((b, i) => {
          const spent = txs.filter(t => t.type === 'expense' && t.cat === b.cat).reduce((s, t) => s + t.amount, 0)
          const pct   = Math.min((spent / b.limit) * 100, 100)
          const over  = spent > b.limit
          const color = over ? 'var(--red)' : pct > 75 ? 'var(--amber)' : 'var(--green)'
          return (
            <Card key={b.id} className={`fade-up-${Math.min(i+1,4)}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${color}`, borderRadius: 16, overflow: 'hidden' }}>
              <CardContent style={{ padding: '20px 22px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: `${CAT_COLORS[b.cat]}20`, color: CAT_COLORS[b.cat], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {CAT_ICONS[b.cat]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{b.cat}</div>
                      <Badge style={{ background: 'var(--surface2)', color: 'var(--text3)', border: 'none', fontSize: 9, fontWeight: 700, marginTop: 2 }}>{b.period}</Badge>
                    </div>
                  </div>
                  <button onClick={() => onDeleteBudget(b.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 7, borderRadius: 7, color: 'var(--text3)', display: 'flex' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.background = 'var(--red-bg)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.background = 'none' }}
                  ><Trash2 size={13} /></button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 12 }}>
                  <span style={{ color: 'var(--text3)' }}>Spent</span>
                  <span>
                    <span className="font-mono" style={{ color, fontWeight: 700 }}>{fmt(spent)}</span>
                    <span style={{ color: 'var(--text3)' }}> / </span>
                    <span className="font-mono" style={{ color: 'var(--text2)' }}>{fmt(b.limit)}</span>
                  </span>
                </div>

                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11 }}>
                  <span style={{ color: 'var(--text3)' }}>{pct.toFixed(0)}% used</span>
                  {over
                    ? <Badge style={{ background: 'var(--red-bg)', color: 'var(--red)', border: 'none', fontSize: 10, display: 'flex', alignItems: 'center', gap: 4 }}><AlertTriangle size={9} /> {fmt(spent - b.limit)} over</Badge>
                    : <span style={{ color: 'var(--green)', fontWeight: 600 }}>{fmt(b.limit - spent)} left</span>}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {budgets.length === 0 && (
        <Card style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16 }}>
          <CardContent style={{ padding: '56px', textAlign: 'center' }}>
            <Target size={36} style={{ color: 'var(--text3)', margin: '0 auto 12px', display: 'block' }} />
            <CardTitle style={{ fontSize: 15, color: 'var(--text)', marginBottom: 6 }}>No budgets yet</CardTitle>
            <CardDescription>Set spending limits to stay on track</CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

/* ─── SAVINGS GOALS ─────────────────────────────────────────── */
const Savings = ({ goals, onAddGoal, onDeleteGoal, onUpdateGoal }) => {
  const [showAdd, setShowAdd] = useState(false)
  const [name, setName]       = useState('')
  const [target, setTarget]   = useState('')
  const [saved, setSaved]     = useState('')
  const [deadline, setDeadline] = useState('')
  const colors = ['#22d3a0', '#6c8ef6', '#f5a623', '#f4607a', '#a78bfa', '#60a5fa']
  const [colIdx, setColIdx]   = useState(0)

  const addGoal = async () => {
    if (!name || !target) return
    await onAddGoal({ name, target: parseFloat(target), saved: parseFloat(saved || 0), color: colors[colIdx % colors.length], deadline })
    setName(''); setTarget(''); setSaved(''); setDeadline(''); setShowAdd(false)
  }

  return (
    <div style={{ flex: 1, padding: '24px 28px', overflowY: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }} className="fade-up">
        <div>
          <h1 className="font-display" style={{ fontSize: 26, color: 'var(--text)', marginBottom: 4 }}>Savings Goals</h1>
          <p style={{ color: 'var(--text2)', fontSize: 13 }}>Track progress towards each goal</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} style={{ background: 'var(--green)', color: '#0e0f14', fontWeight: 700, borderRadius: 10, height: 38, fontSize: 13, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, padding: '0 16px' }}>
          <Plus size={14} /> New Goal
        </Button>
      </div>

      {showAdd && (
        <Card className="scale-in" style={{ background: 'var(--surface)', border: '1px solid rgba(52,211,153,0.25)', borderRadius: 16, marginBottom: 20 }}>
          <CardHeader style={{ padding: '20px 22px 0' }}>
            <CardTitle style={{ fontSize: 13, color: 'var(--green)', fontWeight: 700 }}>Create New Goal</CardTitle>
          </CardHeader>
          <CardContent style={{ padding: '16px 22px 22px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 12, alignItems: 'flex-end', marginBottom: 14 }}>
              <div>
                <Label style={{ color: 'var(--text3)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Goal Name</Label>
                <Input placeholder="e.g. Emergency Fund" value={name} onChange={e => setName(e.target.value)}
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 10, height: 40 }} />
              </div>
              <div>
                <Label style={{ color: 'var(--text3)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Target (৳)</Label>
                <Input type="number" placeholder="0" value={target} onChange={e => setTarget(e.target.value)}
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 10, height: 40, fontFamily: 'JetBrains Mono' }} />
              </div>
              <div>
                <Label style={{ color: 'var(--text3)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Saved (৳)</Label>
                <Input type="number" placeholder="0" value={saved} onChange={e => setSaved(e.target.value)}
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 10, height: 40, fontFamily: 'JetBrains Mono' }} />
              </div>
              <div>
                <Label style={{ color: 'var(--text3)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Deadline</Label>
                <Input type="date" value={deadline} onChange={e => setDeadline(e.target.value)}
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 10, height: 40 }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 600 }}>Color:</span>
              {colors.map((c, i) => (
                <button key={c} onClick={() => setColIdx(i)} style={{ width: 22, height: 22, borderRadius: '50%', background: c, border: 'none', cursor: 'pointer', outline: colIdx === i ? `2.5px solid ${c}` : 'none', outlineOffset: 2, transition: 'all 0.15s' }} />
              ))}
              <Button onClick={addGoal} style={{ marginLeft: 'auto', background: 'var(--green)', color: '#0e0f14', border: 'none', cursor: 'pointer', height: 36, borderRadius: 10, fontWeight: 700, padding: '0 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 7 }}>
                <Save size={13} /> Create Goal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {goals.map((g, i) => {
          const pct       = (g.saved / g.target) * 100
          const done      = pct >= 100
          const remaining = g.target - g.saved
          const daysLeft  = g.deadline ? Math.ceil((new Date(g.deadline) - new Date()) / 86400000) : null

          return (
            <Card key={g.id} className={`fade-up-${Math.min(i+1,4)}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: `3px solid ${g.color}`, borderRadius: 16, overflow: 'hidden' }}>
              <CardContent style={{ padding: '22px', position: 'relative' }}>
                {done && <div style={{ position: 'absolute', top: 12, right: 12 }}><CheckCircle2 size={20} color={g.color} /></div>}

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: 'var(--text)' }}>{g.name}</div>
                    {g.deadline && (
                      <Badge style={{ background: daysLeft !== null && daysLeft < 30 ? 'var(--amber-bg)' : 'var(--surface2)', color: daysLeft !== null && daysLeft < 30 ? 'var(--amber)' : 'var(--text3)', border: 'none', fontSize: 10, display: 'flex', alignItems: 'center', gap: 4, width: 'fit-content' }}>
                        <Calendar size={9} />
                        {daysLeft !== null ? (daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed') : g.deadline}
                      </Badge>
                    )}
                  </div>
                  <button onClick={() => onDeleteGoal(g.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 7, borderRadius: 7, color: 'var(--text3)', display: 'flex' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.background = 'var(--red-bg)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.background = 'none' }}
                  ><Trash2 size={13} /></button>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span className="font-mono" style={{ fontWeight: 700, color: g.color, fontSize: 18 }}>{fmt(g.saved)}</span>
                    <span className="font-mono" style={{ color: 'var(--text3)', alignSelf: 'flex-end', fontSize: 12 }}>/ {fmt(g.target)}</span>
                  </div>
                  <div className="progress-track" style={{ height: 8 }}>
                    <div className="progress-fill" style={{ width: `${Math.min(pct, 100)}%`, background: done ? g.color : `linear-gradient(90deg, ${g.color}88, ${g.color})` }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11 }}>
                    <span style={{ color: g.color, fontWeight: 700 }}>{pct.toFixed(1)}%</span>
                    {!done && <span style={{ color: 'var(--text3)' }}>{fmt(remaining)} to go</span>}
                    {done && <span style={{ color: g.color, fontWeight: 700 }}>🎉 Goal reached!</span>}
                  </div>
                </div>

                {!done && (
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[1000, 5000, 10000].map(amt => (
                      <button key={amt} onClick={() => onUpdateGoal(g.id, amt)} style={{
                        flex: 1, padding: '7px 0', background: `${g.color}15`, color: g.color,
                        border: `1px solid ${g.color}30`, borderRadius: 8, fontSize: 11, fontWeight: 700,
                        cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', transition: 'all 0.15s'
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = `${g.color}30`}
                        onMouseLeave={e => e.currentTarget.style.background = `${g.color}15`}
                      >+{amt/1000}k</button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

/* ─── REPORTS PAGE ──────────────────────────────────────────── */
const Reports = ({ txs }) => {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const now    = new Date()

  const last6 = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
    const m = d.getMonth(), y = d.getFullYear()
    const inc = txs.filter(t => t.type === 'income'  && new Date(t.date).getMonth() === m && new Date(t.date).getFullYear() === y).reduce((s, t) => s + t.amount, 0)
    const exp = txs.filter(t => t.type === 'expense' && new Date(t.date).getMonth() === m && new Date(t.date).getFullYear() === y).reduce((s, t) => s + t.amount, 0)
    return { label: months[m], inc, exp, net: inc - exp }
  })

  const maxVal = Math.max(...last6.map(d => Math.max(d.inc, d.exp)), 1)

  const catTotals = EXPENSE_CATS.map(c => ({
    cat: c, amount: txs.filter(t => t.type === 'expense' && t.cat === c).reduce((s, t) => s + t.amount, 0), color: CAT_COLORS[c]
  })).sort((a, b) => b.amount - a.amount).filter(x => x.amount > 0)

  const totalExp = catTotals.reduce((s, c) => s + c.amount, 0)

  return (
    <div style={{ flex: 1, padding: '24px 28px', overflowY: 'auto' }}>
      <div className="fade-up" style={{ marginBottom: 28 }}>
        <h1 className="font-display" style={{ fontSize: 26, color: 'var(--text)', marginBottom: 4 }}>Reports & Analytics</h1>
        <p style={{ color: 'var(--text2)', fontSize: 13 }}>Visual breakdown of your financial activity</p>
      </div>

      {/* Income vs Expense Chart */}
      <Card className="fade-up-1" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, marginBottom: 18 }}>
        <CardHeader style={{ padding: '22px 22px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <CardTitle style={{ fontSize: 14, color: 'var(--text)', fontWeight: 700 }}>Income vs Expenses</CardTitle>
              <CardDescription style={{ color: 'var(--text3)', fontSize: 11 }}>Last 6 months</CardDescription>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 11 }}>
              {[['var(--green)', 'Income'], ['var(--red)', 'Expense']].map(([c, l]) => (
                <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, color: c }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: c }} />{l}
                </span>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent style={{ padding: '18px 22px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 140 }}>
            {last6.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', width: '100%', height: '100%', justifyContent: 'center' }}>
                  {[['var(--green)', d.inc], ['var(--red)', d.exp]].map(([color, val], j) => (
                    <div key={j} className="tooltip" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                      <div style={{ width: '100%', background: color, borderRadius: '3px 3px 0 0', height: `${(val / maxVal) * 100}%`, minHeight: val > 0 ? 4 : 0, opacity: 0.85, transition: 'height 0.6s cubic-bezier(0.16,1,0.3,1)' }} />
                      <span className="tooltip-content">{fmt(val)}</span>
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: 10, color: 'var(--text3)', fontWeight: 600 }}>{d.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {/* Category breakdown */}
        <Card className="fade-up-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16 }}>
          <CardHeader style={{ padding: '22px 22px 0' }}>
            <CardTitle style={{ fontSize: 14, color: 'var(--text)', fontWeight: 700 }}>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent style={{ padding: '16px 22px 22px' }}>
            {catTotals.length === 0 ? (
              <div style={{ color: 'var(--text3)', fontSize: 13, textAlign: 'center', padding: '24px 0' }}>No expense data</div>
            ) : catTotals.map(c => (
              <div key={c.cat} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: `${c.color}20`, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{CAT_ICONS[c.cat]}</div>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text)' }}>{c.cat}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="font-mono" style={{ fontSize: 13, fontWeight: 700, color: c.color }}>{fmt(c.amount)}</div>
                    <Badge style={{ background: `${c.color}15`, color: c.color, border: 'none', fontSize: 9, fontWeight: 700 }}>{((c.amount / totalExp) * 100).toFixed(1)}%</Badge>
                  </div>
                </div>
                <div className="progress-track" style={{ height: 5 }}>
                  <div className="progress-fill" style={{ width: `${(c.amount / totalExp) * 100}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Summary stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'Avg Monthly Income',  value: fmt(last6.reduce((s,d) => s+d.inc, 0) / 6), color: 'var(--green)', icon: <ArrowUpRight size={16} /> },
            { label: 'Avg Monthly Expense', value: fmt(last6.reduce((s,d) => s+d.exp, 0) / 6), color: 'var(--red)',   icon: <ArrowDownRight size={16} /> },
            { label: 'Best Saving Month',   value: last6.reduce((b,d) => d.net > b.net ? d : b, last6[0])?.label || '—', color: 'var(--blue)', icon: <TrendingUp size={16} /> },
            { label: 'Total Transactions',  value: txs.length, color: 'var(--purple)', icon: <Activity size={16} /> },
          ].map((s, i) => (
            <Card key={s.label} className={`fade-up-${i+2}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 }}>
              <CardContent style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: s.color + '20', color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 3 }}>{s.label}</div>
                  <div className="font-mono" style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── APP ───────────────────────────────────────────────────── */
export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('takaTrack_theme') || 'dark')
  const [txs, setTxs]       = useState([])
  const [budgets, setBudgets] = useState([])
  const [goals, setGoals]   = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)
  const [authError, setAuthError] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [token, setToken]   = useState(() => localStorage.getItem('takaTrack_token') || '')
  const [user, setUser]     = useState(() => {
    try { const s = localStorage.getItem('takaTrack_user'); return s ? JSON.parse(s) : null }
    catch { return null }
  })

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('takaTrack_theme', next)
      return next
    })
  }

  // Apply theme to root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const syncAuth = (nextToken, nextUser) => {
    setToken(nextToken); setUser(nextUser)
    if (nextToken) localStorage.setItem('takaTrack_token', nextToken)
    else localStorage.removeItem('takaTrack_token')
    if (nextUser) localStorage.setItem('takaTrack_user', JSON.stringify(nextUser))
    else localStorage.removeItem('takaTrack_user')
  }

  const logout = () => { syncAuth('', null); setTxs([]); setBudgets([]); setGoals([]) }

  const apiFetch = async (path, options = {}, customToken = null) => {
    const authToken = customToken || token
    const response = await fetch(path, {
      headers: { 'Content-Type': 'application/json', ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}), ...(options.headers || {}) },
      ...options,
    })
    if (!response.ok) {
      const body = await response.json().catch(() => null)
      throw new Error(body?.error || body?.message || response.statusText || 'Server error')
    }
    if (response.status === 204) return null
    return response.json()
  }

  const handleLogin = async (email, password) => {
    setAuthError(null)
    try {
      const data = await apiFetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) })
      syncAuth(data.token, data.user); await loadData(data.token); return true
    } catch (err) { setAuthError(err.message || 'Login failed'); return false }
  }

  const handleRegister = async (name, email, password) => {
    setAuthError(null)
    try {
      const data = await apiFetch('/api/register', { method: 'POST', body: JSON.stringify({ name, email, password }) })
      syncAuth(data.token, data.user); await loadData(data.token); return true
    } catch (err) { setAuthError(err.message || 'Registration failed'); return false }
  }

  const verifySession = async () => {
    if (!token) { setAuthChecked(true); setLoading(false); return }
    try {
      setLoading(true); const data = await apiFetch('/api/me')
      if (data?.user) syncAuth(token, data.user)
    } catch (err) {
      if (err.message?.toLowerCase().includes('unauthorized') || err.message?.toLowerCase().includes('invalid token')) {
        logout(); setAuthError('Session expired. Please sign in again.')
      } else { setError(err.message || 'Unable to verify session') }
    } finally { setAuthChecked(true); setLoading(false) }
  }

  const loadData = async (customToken = null) => {
    const authToken = customToken || token
    if (!user || !authToken) { setLoading(false); return }
    try {
      setLoading(true)
      const [txsData, budgetsData, goalsData] = await Promise.all([
        apiFetch('/api/transactions', {}, authToken),
        apiFetch('/api/budgets', {}, authToken),
        apiFetch('/api/goals', {}, authToken),
      ])
      setTxs(txsData); setBudgets(budgetsData); setGoals(goalsData)
    } catch (err) {
      if (err.message?.toLowerCase().includes('unauthorized')) { logout(); setAuthError('Session expired.') }
      else setError(err.message || 'Unable to load data')
    } finally { setLoading(false) }
  }

  useEffect(() => { verifySession() }, [token])
  useEffect(() => { if (!authChecked) return; if (user && token) loadData() }, [authChecked, token, user])

  const addTx = async tx => {
    try { const created = await apiFetch('/api/transactions', { method: 'POST', body: JSON.stringify(tx) }); setTxs(prev => [created, ...prev]) }
    catch { /* fallback: add locally */ setTxs(prev => [tx, ...prev]) }
  }
  const deleteTx = async id => {
    try { await apiFetch(`/api/transactions/${id}`, { method: 'DELETE' }) } catch {}
    setTxs(prev => prev.filter(t => t.id !== id))
  }
  const addBudget = async budget => {
    try { const created = await apiFetch('/api/budgets', { method: 'POST', body: JSON.stringify(budget) }); setBudgets(prev => [created, ...prev]) }
    catch { setBudgets(prev => [{ ...budget, id: Date.now() }, ...prev]) }
  }
  const deleteBudget = async id => {
    try { await apiFetch(`/api/budgets/${id}`, { method: 'DELETE' }) } catch {}
    setBudgets(prev => prev.filter(b => b.id !== id))
  }
  const addGoal = async goal => {
    try { const created = await apiFetch('/api/goals', { method: 'POST', body: JSON.stringify(goal) }); setGoals(prev => [created, ...prev]) }
    catch { setGoals(prev => [{ ...goal, id: Date.now() }, ...prev]) }
  }
  const deleteGoal = async id => {
    try { await apiFetch(`/api/goals/${id}`, { method: 'DELETE' }) } catch {}
    setGoals(prev => prev.filter(g => g.id !== id))
  }
  const updateGoal = async (id, inc) => {
    try { const updated = await apiFetch(`/api/goals/${id}`, { method: 'PUT', body: JSON.stringify({ inc }) }); setGoals(prev => prev.map(g => g.id === id ? updated : g)) }
    catch { setGoals(prev => prev.map(g => g.id === id ? { ...g, saved: g.saved + inc } : g)) }
  }

  const balance = txs.reduce((s, t) => t.type === 'income' ? s + t.amount : s - t.amount, 0)

  // For demo: seed default data if no API
  useEffect(() => {
    if (authChecked && user && txs.length === 0 && !loading) {
      setTxs(DEFAULT_TXS); setBudgets(DEFAULT_BUDGETS); setGoals(DEFAULT_SAVINGS)
    }
  }, [authChecked, user, loading])

  if (loading && !authChecked) {
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div data-theme={theme} style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg)', color: 'var(--text)' }}>
          <FontLoader theme={theme} />
          <div style={{ textAlign: 'center' }}>
            <AppLogo />
            <div style={{ fontSize: 14, color: 'var(--text2)', marginTop: 16 }}>Verifying your session…</div>
          </div>
        </div>
      </ThemeContext.Provider>
    )
  }

  if (error) {
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div data-theme={theme} style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg)', color: 'var(--red)' }}>
          <FontLoader theme={theme} />
          <div style={{ textAlign: 'center', maxWidth: 420 }}>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Unable to load data</div>
            <div style={{ color: 'var(--text2)', marginBottom: 16 }}>{error}</div>
            <button className="btn btn-primary" onClick={loadData}>Retry</button>
          </div>
        </div>
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div data-theme={theme}>
        <FontLoader theme={theme} />
        <Router>
          <Routes>
            <Route
              path="/login"
              element={user ? <Navigate to="/" replace /> : <AuthPage onLogin={handleLogin} onRegister={handleRegister} error={authError} />}
            />
            <Route
              path="/*"
              element={user ? (
                <div className="page-shell" style={{ display: 'flex', minHeight: '100vh' }}>
                  <Sidebar balance={balance} user={user} onLogout={logout} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <Topbar user={user} onLogout={logout} onAdd={() => setShowAdd(true)} balance={balance} />
                    <main style={{ flex: 1, overflowY: 'auto' }}>
                      <Routes>
                        <Route path="/"             element={<Dashboard txs={txs} onAdd={() => setShowAdd(true)} />} />
                        <Route path="/transactions" element={<Transactions txs={txs} onAdd={() => setShowAdd(true)} onDelete={deleteTx} />} />
                        <Route path="/budget"       element={<Budget txs={txs} budgets={budgets} onAddBudget={addBudget} onDeleteBudget={deleteBudget} />} />
                        <Route path="/savings"      element={<Savings goals={goals} onAddGoal={addGoal} onDeleteGoal={deleteGoal} onUpdateGoal={updateGoal} />} />
                        <Route path="/reports"      element={<Reports txs={txs} />} />
                      </Routes>
                    </main>
                  </div>
                  {/* Sheet-based Add Transaction (replaces modal) */}
                  <AddTxSheet open={showAdd} onClose={() => setShowAdd(false)} onAdd={addTx} />
                </div>
              ) : (
                <Navigate to="/login" replace />
              )}
            />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  )
}