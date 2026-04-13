import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Wallet, TrendingUp, CreditCard, Landmark, FileText, Activity, Home, BarChart3, Menu, X } from 'lucide-react';
import { DashboardView } from '../components/app/DashboardView';
import { IncomeView } from '../components/app/IncomeView';
import { ExpenseView } from '../components/app/ExpenseView';
import { TaxWalletView } from '../components/app/TaxWalletView';
import { InvoiceView } from '../components/app/InvoiceView';
import { ScoreView } from '../components/app/ScoreView';

export const Route = createFileRoute('/dashboard')({
  head: () => ({
    meta: [
      { title: 'Dashboard - FreelanceFin' },
      { name: 'description', content: 'Manage your freelance finances, track income and expenses.' },
      { property: 'og:title', content: 'Dashboard - FreelanceFin' },
      { property: 'og:description', content: 'Manage your freelance finances.' },
    ],
  }),
  component: DashboardPage,
});

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'income', label: 'Income', icon: TrendingUp },
  { id: 'expenses', label: 'Expenses', icon: CreditCard },
  { id: 'tax', label: 'Tax Wallet', icon: Landmark },
  { id: 'invoices', label: 'Invoices', icon: FileText },
  { id: 'score', label: 'Score', icon: Activity },
] as const;

type ViewId = (typeof navItems)[number]['id'];

function DashboardPage() {
  const [view, setView] = useState<ViewId>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (view) {
      case 'dashboard': return <DashboardView onNavigate={(v) => setView(v as ViewId)} />;
      case 'income': return <IncomeView />;
      case 'expenses': return <ExpenseView />;
      case 'tax': return <TaxWalletView />;
      case 'invoices': return <InvoiceView />;
      case 'score': return <ScoreView />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center gap-2 border-b border-border">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Wallet className="w-4 h-4" style={{ color: 'oklch(0.99 0.002 160)' }} />
          </div>
          <span className="font-heading font-bold text-foreground">FreelanceFin</span>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setView(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                view === item.id ? 'bg-accent text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <BarChart3 className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-foreground/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <main className="flex-1 min-w-0">
        <header className="h-14 border-b border-border flex items-center px-4 lg:px-8 gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-heading font-semibold text-foreground capitalize">{view === 'tax' ? 'Tax Wallet' : view}</h1>
        </header>
        <div className="p-4 lg:p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
