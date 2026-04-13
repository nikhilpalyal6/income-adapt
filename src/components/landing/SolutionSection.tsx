import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, PiggyBank, Lightbulb } from 'lucide-react';

const solutions = [
  { icon: BarChart3, title: 'Income Smoothing', desc: 'We calculate your stable monthly budget from irregular earnings, so you always know what you can safely spend.' },
  { icon: PiggyBank, title: 'Auto Tax Saving', desc: '20% of every income automatically goes to your tax wallet. No surprises during tax season.' },
  { icon: Lightbulb, title: 'Smart Insights', desc: 'Get alerts when you overspend, track your financial health score, and see predictions.' },
];

export function SolutionSection() {
  return (
    <section className="py-24 px-6" style={{ background: 'oklch(0.97 0.01 160 / 30%)' }}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Our Solution</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold font-heading text-foreground">
            A finance system that <span className="text-gradient">works like you do</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl p-8 bg-card border border-border group hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5">
                <s.icon className="w-6 h-6" style={{ color: 'oklch(0.99 0.002 160)' }} />
              </div>
              <h3 className="text-xl font-bold font-heading text-card-foreground">{s.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
