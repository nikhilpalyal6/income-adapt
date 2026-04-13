import { useFinanceStore } from '../../store/useFinanceStore';
import { Landmark, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export function TaxWalletView() {
  const { taxSavings, getTotalIncome } = useFinanceStore();
  const totalIncome = getTotalIncome();
  const targetTax = totalIncome * 0.2;
  const progress = targetTax > 0 ? Math.min(100, (taxSavings / targetTax) * 100) : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold font-heading text-foreground">Tax Wallet</h2>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl p-8 bg-card border border-border text-center">
        <Landmark className="w-10 h-10 text-primary mx-auto mb-4" />
        <p className="text-xs text-muted-foreground">Total Tax Saved</p>
        <p className="text-4xl font-bold font-heading text-foreground mt-2">₹{taxSavings.toLocaleString('en-IN')}</p>
        <p className="text-sm text-muted-foreground mt-2">20% of every income is automatically saved</p>

        {/* Progress bar */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full rounded-full gradient-primary"
            />
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="rounded-xl p-6 bg-card border border-border">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">You are financially prepared for taxes</p>
            <p className="text-sm text-muted-foreground mt-1">
              With ₹{taxSavings.toLocaleString('en-IN')} saved, you are well on your way to covering your estimated tax obligations. Keep earning and we will keep saving automatically.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="rounded-xl p-6 bg-card border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">How it works</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>1. Every time you add income, 20% is automatically allocated to your tax wallet.</p>
          <p>2. This money is earmarked for your annual tax payment.</p>
          <p>3. No surprises during tax season — you are always prepared.</p>
        </div>
      </div>
    </div>
  );
}
