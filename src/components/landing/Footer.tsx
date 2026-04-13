import { Wallet } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border bg-card">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 font-heading font-bold text-foreground">
          <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
            <Wallet className="w-3.5 h-3.5" style={{ color: 'oklch(0.99 0.002 160)' }} />
          </div>
          FreelanceFin
        </div>
        <div className="flex gap-8 text-sm text-muted-foreground">
          <span>Features</span>
          <span>About</span>
          <span>Contact</span>
          <span>Privacy</span>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 FreelanceFin. All rights reserved.</p>
      </div>
    </footer>
  );
}
