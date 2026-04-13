import { motion } from 'framer-motion';
import { TrendingUp, CreditCard, Landmark, FileText, Activity } from 'lucide-react';

const features = [
  { icon: TrendingUp, title: 'Income Prediction', desc: 'AI-powered forecasting based on your earning patterns' },
  { icon: CreditCard, title: 'Expense Tracking', desc: 'Category-wise breakdown with overspending alerts' },
  { icon: Landmark, title: 'Tax Wallet', desc: 'Automatic 20% allocation from every income for taxes' },
  { icon: FileText, title: 'Invoice Management', desc: 'Create, track, and get reminders for pending payments' },
  { icon: Activity, title: 'Financial Score', desc: 'Know your financial health at a glance (0-100)' },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Features</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold font-heading text-foreground">
            Everything you need, nothing you don't
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-6 bg-card border border-border hover:border-primary/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-accent">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold font-heading text-card-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
