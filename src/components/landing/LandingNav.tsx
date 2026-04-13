import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function LandingNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-foreground font-heading font-bold text-lg">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Wallet className="w-4 h-4" style={{ color: 'oklch(0.99 0.002 160)' }} />
          </div>
          FreelanceFin
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How It Works', 'About'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {item}
            </a>
          ))}
          <Link
            to="/dashboard"
            className="rounded-lg px-5 py-2 text-sm font-semibold gradient-primary transition-all hover:scale-105"
            style={{ color: 'oklch(0.99 0.002 160)' }}
          >
            Open App
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-6 pb-4 glass"
          >
            {['Features', 'How It Works', 'About'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} onClick={() => setOpen(false)} className="block py-2 text-sm text-muted-foreground">
                {item}
              </a>
            ))}
            <Link to="/dashboard" onClick={() => setOpen(false)} className="block mt-2 rounded-lg px-5 py-2 text-sm font-semibold gradient-primary text-center" style={{ color: 'oklch(0.99 0.002 160)' }}>
              Open App
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
