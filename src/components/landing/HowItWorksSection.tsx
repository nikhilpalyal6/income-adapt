import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Add Your Income', desc: 'Log every freelance payment, project fee, or side hustle earning.' },
  { num: '02', title: 'We Stabilize Your Budget', desc: 'Our engine calculates a safe monthly budget from your irregular earnings.' },
  { num: '03', title: 'Track & Save for Taxes', desc: '20% auto-saved for taxes. Every expense tracked by category.' },
  { num: '04', title: 'Get Insights & Grow', desc: 'Your financial health score improves as you build better habits.' },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 px-6" style={{ background: 'oklch(0.14 0.03 260)' }}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'oklch(0.6 0.15 160)' }}>How It Works</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold font-heading" style={{ color: 'oklch(0.97 0.005 240)' }}>
            Four steps to financial stability
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex gap-5 rounded-2xl p-6"
              style={{ background: 'oklch(1 0 0 / 5%)', border: '1px solid oklch(1 0 0 / 8%)' }}
            >
              <span className="text-3xl font-bold font-heading text-gradient shrink-0">{step.num}</span>
              <div>
                <h3 className="text-lg font-bold font-heading" style={{ color: 'oklch(0.95 0.005 240)' }}>{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'oklch(0.65 0.02 240)' }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
