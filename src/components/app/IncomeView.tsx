import { useState } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function IncomeView() {
  const { incomes, addIncome, getMonthlyIncomeData, getPredictedIncome, getStableMonthlyBudget } = useFinanceStore();
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState<'Freelance' | 'Internship' | 'Other'>('Freelance');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    addIncome({ amount: Number(amount), source, date, description });
    setAmount(''); setDescription(''); setShowForm(false);
  };

  const predicted = getPredictedIncome();
  const stableBudget = getStableMonthlyBudget();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-heading text-foreground">Income</h2>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium gradient-primary" style={{ color: 'oklch(0.99 0.002 160)' }}>
          <Plus className="w-4 h-4" /> Add Income
        </button>
      </div>

      {showForm && (
        <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="rounded-xl p-6 bg-card border border-border space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Amount (₹)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground" placeholder="25000" required />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Source</label>
              <select value={source} onChange={(e) => setSource(e.target.value as typeof source)} className="w-full mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground">
                <option>Freelance</option><option>Internship</option><option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Description</label>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground" placeholder="Project name" />
            </div>
          </div>
          <button type="submit" className="rounded-lg px-6 py-2 text-sm font-medium gradient-primary" style={{ color: 'oklch(0.99 0.002 160)' }}>Save Income</button>
        </motion.form>
      )}

      {/* Stats */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl p-5 bg-card border border-border">
          <TrendingUp className="w-5 h-5 text-primary mb-2" />
          <p className="text-xs text-muted-foreground">Predicted Next Month</p>
          <p className="text-xl font-bold font-heading text-foreground">₹{predicted.toLocaleString('en-IN')}</p>
        </div>
        <div className="rounded-xl p-5 bg-card border border-border">
          <TrendingUp className="w-5 h-5 mb-2" style={{ color: 'oklch(0.65 0.15 220)' }} />
          <p className="text-xs text-muted-foreground">Stable Monthly Budget</p>
          <p className="text-xl font-bold font-heading text-foreground">₹{stableBudget.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-xl p-6 bg-card border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">Income Trend</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={getMonthlyIncomeData()}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="oklch(0.5 0.03 260)" />
            <YAxis tick={{ fontSize: 12 }} stroke="oklch(0.5 0.03 260)" />
            <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
            <Bar dataKey="amount" fill="oklch(0.55 0.17 160)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* History */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Income History</h3>
        </div>
        <div className="divide-y divide-border">
          {incomes.slice(0, 10).map((income) => (
            <div key={income.id} className="px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{income.description || income.source}</p>
                <p className="text-xs text-muted-foreground">{income.source} &middot; {new Date(income.date).toLocaleDateString('en-IN')}</p>
              </div>
              <span className="text-sm font-semibold text-foreground">+₹{income.amount.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
