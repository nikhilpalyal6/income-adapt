import { useState } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export function InvoiceView() {
  const { invoices, addInvoice, updateInvoiceStatus } = useFinanceStore();
  const [showForm, setShowForm] = useState(false);
  const [clientName, setClientName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<'Paid' | 'Pending'>('Pending');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !amount || !dueDate) return;
    addInvoice({ clientName, amount: Number(amount), dueDate, status });
    setClientName(''); setAmount(''); setDueDate(''); setShowForm(false);
  };

  const now = new Date();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-heading text-foreground">Invoices</h2>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium gradient-primary" style={{ color: 'oklch(0.99 0.002 160)' }}>
          <Plus className="w-4 h-4" /> Create Invoice
        </button>
      </div>

      {showForm && (
        <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="rounded-xl p-6 bg-card border border-border space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Client Name</label>
              <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground" required />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Amount (₹)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground" required />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Due Date</label>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground" required />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="w-full mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground">
                <option>Pending</option><option>Paid</option>
              </select>
            </div>
          </div>
          <button type="submit" className="rounded-lg px-6 py-2 text-sm font-medium gradient-primary" style={{ color: 'oklch(0.99 0.002 160)' }}>Save Invoice</button>
        </motion.form>
      )}

      {/* Invoice list */}
      <div className="space-y-3">
        {invoices.map((inv) => {
          const overdue = inv.status === 'Pending' && new Date(inv.dueDate) < now;
          return (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl p-5 bg-card border border-border flex items-center justify-between flex-wrap gap-4"
            >
              <div className="flex items-center gap-4">
                {inv.status === 'Paid' ? (
                  <CheckCircle className="w-5 h-5 shrink-0" style={{ color: 'oklch(0.6 0.19 145)' }} />
                ) : overdue ? (
                  <AlertCircle className="w-5 h-5 shrink-0 text-destructive" />
                ) : (
                  <Clock className="w-5 h-5 shrink-0" style={{ color: 'oklch(0.75 0.18 75)' }} />
                )}
                <div>
                  <p className="text-sm font-medium text-foreground">{inv.clientName}</p>
                  <p className="text-xs text-muted-foreground">
                    Due: {new Date(inv.dueDate).toLocaleDateString('en-IN')}
                    {overdue && <span className="text-destructive ml-2 font-medium">Payment overdue</span>}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold font-heading text-foreground">₹{inv.amount.toLocaleString('en-IN')}</span>
                <button
                  onClick={() => updateInvoiceStatus(inv.id, inv.status === 'Paid' ? 'Pending' : 'Paid')}
                  className={`text-xs px-3 py-1 rounded-full font-medium ${inv.status === 'Paid' ? 'bg-accent text-primary' : 'bg-muted text-muted-foreground hover:bg-accent'}`}
                >
                  {inv.status}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
