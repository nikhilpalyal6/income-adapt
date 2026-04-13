import { motion } from 'framer-motion';
import { Wallet, TrendingUp, PieChart, Shield, FileText } from 'lucide-react';

export function DemoPreviewSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Demo Preview</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold font-heading text-foreground">
            See it in action
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-border overflow-hidden bg-card shadow-xl"
        >
          <div className="p-2 flex gap-1.5 border-b border-border">
            <div className="w-3 h-3 rounded-full" style={{ background: 'oklch(0.65 0.2 25)' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: 'oklch(0.8 0.18 85)' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: 'oklch(0.6 0.19 145)' }} />
          </div>

          <div className="p-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Wallet, label: 'Total Balance', value: '₹1,42,500', change: '+12%' },
              { icon: TrendingUp, label: 'Stable Budget', value: '₹52,333/mo', change: 'Calculated' },
              { icon: PieChart, label: 'Tax Saved', value: '₹60,000', change: '20% auto' },
              { icon: Shield, label: 'Health Score', value: '78/100', change: 'Good' },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-xl p-5 border border-border bg-background"
              >
                <card.icon className="w-5 h-5 text-primary mb-3" />
                <p className="text-xs text-muted-foreground">{card.label}</p>
                <p className="text-xl font-bold font-heading text-foreground mt-1">{card.value}</p>
                <span className="text-xs text-primary mt-1 inline-block">{card.change}</span>
              </motion.div>
            ))}
          </div>

          <div className="px-8 pb-8 grid lg:grid-cols-2 gap-4">
            <div className="rounded-xl p-5 border border-border bg-background">
              <h4 className="text-sm font-semibold text-foreground mb-4">Income Trend</h4>
              <div className="flex items-end gap-2 h-32">
                {[35, 55, 45, 80, 60, 75].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex-1 rounded-t-md gradient-primary"
                  />
                ))}
              </div>
            </div>
            <div className="rounded-xl p-5 border border-border bg-background">
              <h4 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h4>
              <div className="space-y-3">
                {[
                  { icon: FileText, text: 'Invoice from TechStart — ₹45,000', status: 'Pending' },
                  { icon: Wallet, text: 'Freelance payment received — ₹12,000', status: 'Done' },
                  { icon: PieChart, text: 'Tax wallet auto-saved — ₹9,000', status: 'Auto' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-sm">
                    <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-foreground flex-1 truncate">{item.text}</span>
                    <span className="text-xs text-primary">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
