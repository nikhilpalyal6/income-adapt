import { useState } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Plus, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const COLORS = ['oklch(0.55 0.17 160)', 'oklch(0.65 0.15 220)', 'oklch(0.72 0.18 80)', 'oklch(0.6 0.2 300)', 'oklch(0.7 0.15 30)'];

export function ExpenseView() {
  const { expenses, addExpense, getCategoryBreakdown, getMonthlyExpenseData, getStableMonthlyBudget } = useFinanceStore();
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<'Food' | 'Travel' | 'Rent' | 'Subscriptions' | 'Other'>('Food');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    addExpense({ amount: Number(amount), category, date, description });
    setAmount(''); setDescription(''); setShowForm(false);
  };

  const categoryData = getCategoryBreakdown();
  const budget = getStableMonthlyBudget();

  // Find overspending categories
  const overSpending = categoryData.filter(c => c.value > budget * 0.25);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-heading text-foreground">Expenses</h2>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium gradient-primary" style={{ color: 'oklch(0.99 0.002 160)' }}>
          <Plus className="w-4 h-4" /> Add Expense
        </button>
      </div>

      {showForm && (
        <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="rounded-xl p-6 bg-card border border-border space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Amount (₹)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground" required />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as typeof category)} className="w-full mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground">
                <option>Food</option><option>Travel</option><option>Rent</option><option>Subscriptions</option><option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Description</label>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground" />
            </div>
          </div>
          <button type="submit" className="rounded-lg px-6 py-2 text-sm font-medium gradient-primary" style={{ color: 'oklch(0.99 0.002 160)' }}>Save Expense</button>
        </motion.form>
      )}

      {/* Overspending alerts */}
      {overSpending.length > 0 && (
        <div className="rounded-xl p-4 border border-border" style={{ background: 'oklch(0.75 0.18 75 / 10%)' }}>
          {overSpending.map(c => (
            <div key={c.name} className="flex items-center gap-2 text-sm" style={{ color: 'oklch(0.55 0.15 75)' }}>
              <AlertTriangle className="w-4 h-4" />
              You are overspending on {c.name} (₹{c.value.toLocaleString('en-IN')})
            </div>
          ))}
        </div>
      )}

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl p-6 bg-card border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-4">Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={50}>
                {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {categoryData.map((c, i) => (
              <div key={c.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                {c.name}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-6 bg-card border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Expenses</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={getMonthlyExpenseData()}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="oklch(0.5 0.03 260)" />
              <YAxis tick={{ fontSize: 12 }} stroke="oklch(0.5 0.03 260)" />
              <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
              <Bar dataKey="amount" fill="oklch(0.72 0.18 80)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* History */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Expense History</h3>
        </div>
        <div className="divide-y divide-border">
          {expenses.slice(0, 10).map((expense) => (
            <div key={expense.id} className="px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{expense.description || expense.category}</p>
                <p className="text-xs text-muted-foreground">{expense.category} &middot; {new Date(expense.date).toLocaleDateString('en-IN')}</p>
              </div>
              <span className="text-sm font-semibold text-destructive">-₹{expense.amount.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
