import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Play, TrendingUp, Shield, Wallet } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-hero">
      {/* Animated bg elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10" style={{ background: 'oklch(0.55 0.17 160)' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-5" style={{ background: 'oklch(0.5 0.15 200)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5" style={{ background: 'oklch(0.55 0.17 160)' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-8"
              style={{ background: 'oklch(0.55 0.17 160 / 15%)', color: 'oklch(0.7 0.15 160)' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'oklch(0.6 0.19 145)' }} />
              Built for Gen-Z freelancers in India
            </motion.div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight" style={{ color: 'oklch(0.97 0.005 240)' }}>
              Finance That{' '}
              <span className="text-gradient">Adapts</span>
              {' '}to Your Freelance Life
            </h1>

            <p className="mt-6 text-lg leading-relaxed max-w-lg" style={{ color: 'oklch(0.7 0.02 240)' }}>
              Manage irregular income, save taxes automatically, and stay financially stable — all in one beautiful app.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold transition-all hover:scale-105 gradient-primary"
                style={{ color: 'oklch(0.99 0.002 160)' }}
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold transition-all hover:scale-105"
                style={{ background: 'oklch(1 0 0 / 10%)', color: 'oklch(0.9 0.01 240)', border: '1px solid oklch(1 0 0 / 15%)' }}
              >
                <Play className="w-4 h-4" /> View Demo
              </Link>
            </div>
          </motion.div>

          {/* Dashboard preview card */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateY: -5 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="rounded-2xl p-6 space-y-4" style={{ background: 'oklch(1 0 0 / 8%)', backdropFilter: 'blur(20px)', border: '1px solid oklch(1 0 0 / 12%)' }}>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium" style={{ color: 'oklch(0.7 0.02 240)' }}>Dashboard Preview</span>
                <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'oklch(0.6 0.19 145 / 20%)', color: 'oklch(0.7 0.15 145)' }}>Live</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Wallet, label: 'Balance', value: '₹1,42,500', color: 'oklch(0.55 0.17 160)' },
                  { icon: TrendingUp, label: 'Budget', value: '₹52,333', color: 'oklch(0.65 0.15 220)' },
                  { icon: Shield, label: 'Score', value: '78/100', color: 'oklch(0.72 0.18 80)' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl p-4" style={{ background: 'oklch(1 0 0 / 5%)' }}>
                    <item.icon className="w-5 h-5 mb-2" style={{ color: item.color }} />
                    <p className="text-xs" style={{ color: 'oklch(0.6 0.02 240)' }}>{item.label}</p>
                    <p className="text-lg font-bold font-heading" style={{ color: 'oklch(0.95 0.005 240)' }}>{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Mini chart mockup */}
              <div className="rounded-xl p-4" style={{ background: 'oklch(1 0 0 / 5%)' }}>
                <div className="flex items-end gap-1 h-20">
                  {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 72].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                      className="flex-1 rounded-sm"
                      style={{ background: `oklch(0.55 0.17 160 / ${0.4 + (h / 100) * 0.6})` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
