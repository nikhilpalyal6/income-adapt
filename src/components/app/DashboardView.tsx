import { useFinanceStore } from '../../store/useFinanceStore';
import { Wallet, TrendingUp, CreditCard, Landmark, Activity, ArrowRight, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  const store = useFinanceStore();
  const totalIncome = store.getTotalIncome();
  const totalExpenses = store.getTotalExpenses();
  const stableBudget = store.getStableMonthlyBudget();
  const score = store.getFinancialScore();
  const insights = store.getInsights();
  const incomeData = store.getMonthlyIncomeData();

  const balance = totalIncome - totalExpenses;
  const scoreLabel = score >= 70 ? 'Good' : score >= 40 ? 'Average' : 'Poor';
  const scoreColor = score >= 70 ? 'oklch(0.6 0.19 145)' : score >= 40 ? 'oklch(0.75 0.18 75)' : 'oklch(0.58 0.22 25)';

  const cards = [
    { icon: Wallet, label: 'Total Balance', value: `₹${balance.toLocaleString('en-IN')}`, color: 'oklch(0.55 0.17 160)' },
    { icon: TrendingUp, label: 'Stable Budget', value: `₹${stableBudget.toLocaleString('en-IN')}/mo`, color: 'oklch(0.65 0.15 220)' },
    { icon: CreditCard, label: 'Total Expenses', value: `₹${totalExpenses.toLocaleString('en-IN')}`, color: 'oklch(0.72 0.18 80)' },
    { icon: Landmark, label: 'Tax Saved', value: `₹${store.taxSavings.toLocaleString('en-IN')}`, color: 'oklch(0.6 0.2 300)' },
  ];

  const quickActions = [
    { label: 'Add Income', view: 'income' },
    { label: 'Add Expense', view: 'expenses' },
    { label: 'Create Invoice', view: 'invoices' },
    { label: 'View Score', view: 'score' },
  ];

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl p-5 bg-card border border-border"
          >
            <card.icon className="w-5 h-5 mb-2" style={{ color: card.color }} />
            <p className="text-xs text-muted-foreground">{card.label}</p>
            <p className="text-xl font-bold font-heading text-card-foreground mt-1">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Score + Insights */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="rounded-xl p-6 bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Financial Health</h3>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(0.92 0.01 240)" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke={scoreColor} strokeWidth="8" strokeDasharray={`${score * 2.64} 264`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold font-heading text-foreground">{score}</span>
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold font-heading" style={{ color: scoreColor }}>{scoreLabel}</p>
              <p className="text-sm text-muted-foreground mt-1">Based on savings, spending & income consistency</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="rounded-xl p-6 bg-card border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-4">Smart Insights</h3>
          <div className="space-y-3">
            {insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span className="text-muted-foreground">{insight}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Income Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="rounded-xl p-6 bg-card border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Income</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={incomeData}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="oklch(0.5 0.03 260)" />
            <YAxis tick={{ fontSize: 12 }} stroke="oklch(0.5 0.03 260)" />
            <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
            <Bar dataKey="amount" fill="oklch(0.55 0.17 160)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => onNavigate(action.view)}
            className="rounded-xl p-4 bg-card border border-border hover:border-primary/30 transition-colors text-left group"
          >
            <span className="text-sm font-medium text-foreground">{action.label}</span>
            <ArrowRight className="w-3.5 h-3.5 text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );
}
