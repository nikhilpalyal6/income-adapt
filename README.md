# FreelanceFin 💸 
**Finance That Adapts to Your Freelance Life**

![TanStack Start](https://img.shields.io/badge/TanStack%20Start-SSR-black) ![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Edge-Ready-F38020) ![React 19](https://img.shields.io/badge/React%2019-UI-61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6)

A modern, high-performance financial management platform engineered specifically for the dynamic nature of freelance and gig-economy work. Built for Gen-Z freelancers in India, FreelanceFin solves the volatility of freelance income through intelligent budget stabilization, real-time gamified health scores, and automated tax withholding.

![FreelanceFin Dashboard](/public/og-image.png)

*Engineered for Hackathon 2026 🏆*

---

## 🏗️ System Architecture & Technical Highlights

We built FreelanceFin to be incredibly fast, strictly typed, and edge-deployable out of the box.

### 1. Edge-First SSR Architecture
The application is powered by **TanStack Start**, allowing Server-Side Rendering (SSR) and API execution at the edge. The `wrangler.jsonc` configuration ensures seamless deployment to **Cloudflare Workers / Pages** with `nodejs_compat`. This minimizes latency, offering instantaneous interface loads globally.

### 2. End-to-End Type Safety
By utilizing **TanStack Router**, we achieve 100% type-safe and file-based routing. Route parameters, search queries, and loaders are automatically inferred, completely eliminating runtime navigation errors.

### 3. Local-First State & Gamification Engine
To ensure a snappy experience without constant server roundtrips, the application heavily utilizes **Zustand** for local state management (`useFinanceStore.ts`). 
The **Financial Health Score** algorithm dynamically evaluates:
- **Savings Ratio** (`(Income - Expenses) / Income`)
- **Spending Control** (Penalties applied if expenses > 70% of income)
- **Income Consistency** (Calculated based on rolling monthly standard deviations)
This drives the SVG-based circular visualizer, running client-side with 60FPS Framer Motion animations.

### 4. Headless & Accessible UI
The UI layer is composed of Radix UI primitives and Tailwind CSS (`@radix-ui/react-*`), ensuring absolute accessibility (WAI-ARIA compliance) without sacrificing deep customizability. 

---

## ✨ Core Features Designed for Freelancers

1. **Automated Tax Earmarking (Tax Wallet):** 
   TDS and self-assessment tax are a massive hassle for independent contractors. FreelanceFin automatically allocates 20% of every logged income into a virtual "Tax Wallet" with a real-time progress bar.

2. **Smart Invoicing Module:**
   A built-in system to create, manage, and track professional client invoices. Eliminates the need for third-party PDF generators.

3. **Dynamic Budget Stabilization:** 
   Our engine calculates a "Stable Monthly Budget" bridging the gap between high-earning months and dry spells to avoid the "feast or famine" trap.

4. **Contextual AI Insights:**
   The dashboard runs local checks on your spending thresholds and flags early warnings (e.g., "Expenses are higher than normal this month") directly in the UI.

---

## 🚀 Local Development & Deployment API

### Prerequisites
- Node.js (v18+)
- npm or bun

### Start the Engine

1. **Clone & Install**
   ```bash
   git clone https://github.com/nikhilpalyal6/income-adapt.git
   cd income-adapt-main
   npm i
   ```

2. **Run Local Development Server**
   ```bash
   npm run dev
   ```
   > Powered by Vite `v5` integrating `@lovable.dev/vite-tanstack-config` and Cloudflare dev plugins for an uncompromisingly fast HMR loop.

3. **Production Edge Build**
   ```bash
   npm run build
   ```
   Compiles exactly into the `.wrangler` / distribution folder via TanStack Server Entry. Deploy directly to Cloudflare using:
   ```bash
   npx wrangler deploy
   ```

---

## 📁 Source Topology

```text
income-adapt-main/
├── src/
│   ├── components/
│   │   ├── app/           # Intelligent domain components (Tax Wallet, Health Engine)
│   │   ├── landing/       # High-conversion micro-interactions & Hero
│   │   └── ui/            # Radix-backed primitive design system
│   ├── hooks/             # Reactive data subscriptions
│   ├── lib/               # Pure utility functions (utils.ts)
│   ├── routes/            # TanStack Routing Graph (__root.tsx, index.tsx)
│   └── store/             # Zustand global architecture
├── wrangler.jsonc         # Cloudflare Edge runtime configuration
├── vite.config.ts         # Lovable & TanStack build orchestration
└── package.json           # Registry
```

---

## 🧪 Future API Integrations 

Our roadmap includes moving from a purely local-first store to a synchronized backend by implementing:
1. **Setu / Finvu AA (Account Aggregator) API**: To automatically sync bank transactions into the Zustand store rather than relying on manual entity entry.
2. **OpenAI Structured Outputs API**: To parse messy PDF bank statements into strictly typed `Expense` objects. 
3. **Resend API**: To automate follow-up emails directly to clients for any overdue invoices logged in the "InvoiceView".

---
*Architected to Win.*
