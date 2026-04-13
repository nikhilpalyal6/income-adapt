import { motion } from 'framer-motion';
import { TrendingDown, Calculator, AlertTriangle } from 'lucide-react';

const problems = [
  { icon: TrendingDown, title: 'Irregular Income', desc: 'One month you earn 80K, next month 20K. Traditional budgeting just does not work.' },
  { icon: Calculator, title: 'No Tax Planning', desc: 'As a freelancer, no one deducts TDS for you. Tax season becomes a nightmare.' },
  { icon: AlertTriangle, title: 'Financial Instability', desc: 'Without a stable salary, planning for rent, EMIs, or savings feels impossible.' },
];

export function ProblemSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">The Problem</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold font-heading text-foreground">
            Freelancing is great. Managing money isn't.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl p-8 bg-card border border-border hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'oklch(0.58 0.22 25 / 10%)' }}>
                <p.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-xl font-bold font-heading text-card-foreground">{p.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
