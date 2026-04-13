import { useFinanceStore } from '../../store/useFinanceStore';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export function ScoreView() {
  const { getFinancialScore, getTotalIncome, getTotalExpenses } = useFinanceStore();
  const score = getFinancialScore();
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const savingsRatio = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100) : 0;

  const getStatus = (s: number) => {
    if (s >= 80) return { label: 'Excellent', color: 'oklch(0.55 0.17 160)' };
    if (s >= 60) return { label: 'Good', color: 'oklch(0.6 0.19 145)' };
    if (s >= 40) return { label: 'Average', color: 'oklch(0.75 0.18 75)' };
    return { label: 'Poor', color: 'oklch(0.58 0.22 25)' };
  };

  const status = getStatus(score);

  const metrics = [
    { label: 'Savings Ratio', value: `${Math.round(savingsRatio)}%`, desc: 'Percentage of income saved' },
    { label: 'Spending Control', value: totalExpenses < totalIncome * 0.7 ? 'Good' : 'Needs work', desc: 'How well you control expenses' },
    { label: 'Income Consistency', value: score >= 50 ? 'Stable' : 'Volatile', desc: 'How consistent your income is' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold font-heading text-foreground">Financial Health Score</h2>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl p-8 bg-card border border-border text-center">
        <div className="relative w-40 h-40 mx-auto">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(0.92 0.01 240)" strokeWidth="6" />
            <motion.circle
              cx="50" cy="50" r="42" fill="none"
              stroke={status.color}
              strokeWidth="6"
              strokeDasharray={`${score * 2.64} 264`}
              strokeLinecap="round"
              initial={{ strokeDasharray: '0 264' }}
              animate={{ strokeDasharray: `${score * 2.64} 264` }}
              transition={{ duration: 1.5, delay: 0.2 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold font-heading text-foreground">{score}</span>
            <span className="text-xs text-muted-foreground">out of 100</span>
          </div>
        </div>

        <p className="mt-4 text-2xl font-bold font-heading" style={{ color: status.color }}>{status.label}</p>
        <p className="text-sm text-muted-foreground mt-1">Based on savings, spending control & income consistency</p>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="rounded-xl p-5 bg-card border border-border"
          >
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className="text-lg font-bold font-heading text-foreground mt-1">{m.value}</p>
            <p className="text-xs text-muted-foreground mt-2">{m.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl p-6 bg-card border border-border">
        <div className="flex items-start gap-3">
          <Activity className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">How to improve your score</p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li>Maintain a consistent income stream</li>
              <li>Keep expenses below 70% of your income</li>
              <li>Save at least 20% each month</li>
              <li>Pay invoices on time and follow up on pending ones</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
