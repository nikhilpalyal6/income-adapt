import { motion } from 'framer-motion';
import { Users, IndianRupee, Star, Zap } from 'lucide-react';

const stats = [
  { icon: IndianRupee, value: '₹50L+', label: 'Income Managed' },
  { icon: Users, value: '100+', label: 'Users Tested' },
  { icon: Star, value: '4.8/5', label: 'User Rating' },
  { icon: Zap, value: '<2s', label: 'Load Time' },
];

export function TrustSection() {
  return (
    <section className="py-24 px-6" style={{ background: 'oklch(0.97 0.01 160 / 30%)' }}>
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Trusted by Freelancers</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold font-heading text-foreground">
            Built for Gen-Z freelancers in India
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            From graphic designers to software developers, our users trust us to manage their finances.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-6 bg-card border border-border"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold font-heading text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
