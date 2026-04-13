import { create } from 'zustand';

export interface IncomeEntry {
  id: string;
  amount: number;
  source: 'Freelance' | 'Internship' | 'Other';
  date: string;
  description: string;
}

export interface ExpenseEntry {
  id: string;
  amount: number;
  category: 'Food' | 'Travel' | 'Rent' | 'Subscriptions' | 'Other';
  date: string;
  description: string;
}

export interface Invoice {
  id: string;
  clientName: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending';
  createdAt: string;
}

interface FinanceState {
  incomes: IncomeEntry[];
  expenses: ExpenseEntry[];
  invoices: Invoice[];
  taxSavings: number;
  addIncome: (income: Omit<IncomeEntry, 'id'>) => void;
  addExpense: (expense: Omit<ExpenseEntry, 'id'>) => void;
  addInvoice: (invoice: Omit<Invoice, 'id' | 'createdAt'>) => void;
  updateInvoiceStatus: (id: string, status: 'Paid' | 'Pending') => void;
  getStableMonthlyBudget: () => number;
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getFinancialScore: () => number;
  getPredictedIncome: () => number;
  getInsights: () => string[];
  getCategoryBreakdown: () => { name: string; value: number }[];
  getMonthlyIncomeData: () => { month: string; amount: number }[];
  getMonthlyExpenseData: () => { month: string; amount: number }[];
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const now = new Date();
const month = (offset: number) => {
  const d = new Date(now);
  d.setMonth(d.getMonth() - offset);
  return d.toISOString().slice(0, 10);
};

const mockIncomes: IncomeEntry[] = [
  { id: generateId(), amount: 45000, source: 'Freelance', date: month(0), description: 'Web dev project' },
  { id: generateId(), amount: 12000, source: 'Freelance', date: month(0), description: 'Logo design' },
  { id: generateId(), amount: 55000, source: 'Freelance', date: month(1), description: 'App development' },
  { id: generateId(), amount: 8000, source: 'Other', date: month(1), description: 'Workshop income' },
  { id: generateId(), amount: 35000, source: 'Freelance', date: month(2), description: 'UI/UX project' },
  { id: generateId(), amount: 15000, source: 'Internship', date: month(2), description: 'Part-time internship' },
  { id: generateId(), amount: 62000, source: 'Freelance', date: month(3), description: 'E-commerce project' },
  { id: generateId(), amount: 28000, source: 'Freelance', date: month(4), description: 'Landing pages' },
  { id: generateId(), amount: 40000, source: 'Freelance', date: month(5), description: 'Mobile app UI' },
];

const mockExpenses: ExpenseEntry[] = [
  { id: generateId(), amount: 8500, category: 'Food', date: month(0), description: 'Monthly groceries' },
  { id: generateId(), amount: 3200, category: 'Food', date: month(0), description: 'Eating out' },
  { id: generateId(), amount: 12000, category: 'Rent', date: month(0), description: 'Room rent' },
  { id: generateId(), amount: 2500, category: 'Subscriptions', date: month(0), description: 'Software tools' },
  { id: generateId(), amount: 1800, category: 'Travel', date: month(0), description: 'Metro pass' },
  { id: generateId(), amount: 7000, category: 'Food', date: month(1), description: 'Groceries' },
  { id: generateId(), amount: 12000, category: 'Rent', date: month(1), description: 'Room rent' },
  { id: generateId(), amount: 4500, category: 'Travel', date: month(1), description: 'Trip' },
  { id: generateId(), amount: 2500, category: 'Subscriptions', date: month(1), description: 'Tools' },
  { id: generateId(), amount: 6000, category: 'Food', date: month(2), description: 'Groceries' },
  { id: generateId(), amount: 12000, category: 'Rent', date: month(2), description: 'Room rent' },
  { id: generateId(), amount: 1500, category: 'Other', date: month(2), description: 'Miscellaneous' },
];

const mockInvoices: Invoice[] = [
  { id: generateId(), clientName: 'TechStart Solutions', amount: 45000, dueDate: month(-1), status: 'Pending', createdAt: month(0) },
  { id: generateId(), clientName: 'DesignCo', amount: 12000, dueDate: month(0), status: 'Paid', createdAt: month(0) },
  { id: generateId(), clientName: 'StartupXYZ', amount: 55000, dueDate: month(1), status: 'Paid', createdAt: month(1) },
  { id: generateId(), clientName: 'FreelanceHub', amount: 8000, dueDate: month(-0.5), status: 'Pending', createdAt: month(0) },
];

export const useFinanceStore = create<FinanceState>((set, get) => ({
  incomes: mockIncomes,
  expenses: mockExpenses,
  invoices: mockInvoices,
  taxSavings: mockIncomes.reduce((sum, i) => sum + i.amount * 0.2, 0),

  addIncome: (income) => set((state) => {
    const newIncome = { ...income, id: generateId() };
    const taxAdd = income.amount * 0.2;
    return {
      incomes: [newIncome, ...state.incomes],
      taxSavings: state.taxSavings + taxAdd,
    };
  }),

  addExpense: (expense) => set((state) => ({
    expenses: [{ ...expense, id: generateId() }, ...state.expenses],
  })),

  addInvoice: (invoice) => set((state) => ({
    invoices: [{ ...invoice, id: generateId(), createdAt: new Date().toISOString().slice(0, 10) }, ...state.invoices],
  })),

  updateInvoiceStatus: (id, status) => set((state) => ({
    invoices: state.invoices.map((inv) => inv.id === id ? { ...inv, status } : inv),
  })),

  getTotalIncome: () => get().incomes.reduce((sum, i) => sum + i.amount, 0),
  getTotalExpenses: () => get().expenses.reduce((sum, e) => sum + e.amount, 0),

  getStableMonthlyBudget: () => {
    const incomes = get().incomes;
    const now = new Date();
    const threeMonthsAgo = new Date(now);
    threeMonthsAgo.setMonth(now.getMonth() - 3);
    const recent = incomes.filter((i) => new Date(i.date) >= threeMonthsAgo);
    const monthlyTotals = new Map<string, number>();
    recent.forEach((i) => {
      const key = i.date.slice(0, 7);
      monthlyTotals.set(key, (monthlyTotals.get(key) || 0) + i.amount);
    });
    const values = Array.from(monthlyTotals.values());
    return values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
  },

  getPredictedIncome: () => {
    const budget = get().getStableMonthlyBudget();
    return Math.round(budget * (0.9 + Math.random() * 0.2));
  },

  getFinancialScore: () => {
    const totalIncome = get().getTotalIncome();
    const totalExpenses = get().getTotalExpenses();
    const savingsRatio = totalIncome > 0 ? (totalIncome - totalExpenses) / totalIncome : 0;
    const incomes = get().incomes;
    const monthlyTotals = new Map<string, number>();
    incomes.forEach((i) => {
      const key = i.date.slice(0, 7);
      monthlyTotals.set(key, (monthlyTotals.get(key) || 0) + i.amount);
    });
    const values = Array.from(monthlyTotals.values());
    const avg = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    const variance = values.length > 0 ? values.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / values.length : 0;
    const cv = avg > 0 ? Math.sqrt(variance) / avg : 1;
    const consistencyScore = Math.max(0, 1 - cv);
    const expenseRatio = totalIncome > 0 ? totalExpenses / totalIncome : 1;
    const spendingScore = Math.max(0, 1 - expenseRatio);
    const raw = (savingsRatio * 40 + consistencyScore * 30 + spendingScore * 30);
    return Math.min(100, Math.max(0, Math.round(raw * 100)));
  },

  getInsights: () => {
    const insights: string[] = [];
    const incomes = get().incomes;
    const expenses = get().expenses;
    const now = new Date();
    const thisMonth = now.toISOString().slice(0, 7);
    const lastMonth = new Date(now);
    lastMonth.setMonth(now.getMonth() - 1);
    const lastMonthKey = lastMonth.toISOString().slice(0, 7);

    const thisMonthIncome = incomes.filter(i => i.date.startsWith(thisMonth)).reduce((s, i) => s + i.amount, 0);
    const lastMonthIncome = incomes.filter(i => i.date.startsWith(lastMonthKey)).reduce((s, i) => s + i.amount, 0);
    if (lastMonthIncome > 0 && thisMonthIncome < lastMonthIncome * 0.8) {
      const drop = Math.round((1 - thisMonthIncome / lastMonthIncome) * 100);
      insights.push(`Your income dropped ${drop}% this month`);
    }

    const categoryTotals = new Map<string, number>();
    expenses.filter(e => e.date.startsWith(thisMonth)).forEach(e => {
      categoryTotals.set(e.category, (categoryTotals.get(e.category) || 0) + e.amount);
    });
    const budget = get().getStableMonthlyBudget();
    categoryTotals.forEach((total, cat) => {
      if (total > budget * 0.25) {
        insights.push(`You are overspending on ${cat}`);
      }
    });

    const score = get().getFinancialScore();
    if (score >= 70) insights.push('Your financial health is looking great!');
    else if (score >= 40) insights.push('Your finances need some attention');
    else insights.push('Your financial health needs improvement');

    const pendingInvoices = get().invoices.filter(i => i.status === 'Pending');
    if (pendingInvoices.length > 0) {
      const overdueCount = pendingInvoices.filter(i => new Date(i.dueDate) < now).length;
      if (overdueCount > 0) insights.push(`${overdueCount} invoice(s) are overdue`);
    }

    return insights;
  },

  getCategoryBreakdown: () => {
    const map = new Map<string, number>();
    get().expenses.forEach((e) => {
      map.set(e.category, (map.get(e.category) || 0) + e.amount);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  },

  getMonthlyIncomeData: () => {
    const map = new Map<string, number>();
    get().incomes.forEach((i) => {
      const key = i.date.slice(0, 7);
      map.set(key, (map.get(key) || 0) + i.amount);
    });
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, amount]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-IN', { month: 'short' }),
        amount,
      }));
  },

  getMonthlyExpenseData: () => {
    const map = new Map<string, number>();
    get().expenses.forEach((e) => {
      const key = e.date.slice(0, 7);
      map.set(key, (map.get(key) || 0) + e.amount);
    });
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, amount]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-IN', { month: 'short' }),
        amount,
      }));
  },
}));
