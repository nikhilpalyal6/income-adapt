import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 px-6 gradient-hero">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold font-heading" style={{ color: 'oklch(0.97 0.005 240)' }}>
            Take control of your freelance finances{' '}
            <span className="text-gradient">today</span>
          </h2>
          <p className="mt-6 text-lg" style={{ color: 'oklch(0.7 0.02 240)' }}>
            Join hundreds of Indian freelancers who have already stabilized their income and saved for taxes automatically.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl px-10 py-4 text-base font-semibold transition-all hover:scale-105 gradient-primary"
              style={{ color: 'oklch(0.99 0.002 160)' }}
            >
              Get Started — It's Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
