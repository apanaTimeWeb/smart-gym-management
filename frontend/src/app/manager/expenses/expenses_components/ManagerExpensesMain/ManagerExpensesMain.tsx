// RESPONSIBILITY: Main container for the Expenses module. Owns the ExpensesProvider and assembles Header, Toolbar, KPIs, Table, and Modal.
'use client';

import { Suspense, useState } from 'react';
import { Loader2, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { ExpensesProvider } from '@/app/manager/expenses/expenses_context/ManagerExpensesContext';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import ManagerExpensesToolbar from '@/app/manager/expenses/expenses_components/ManagerExpensesToolbar/ManagerExpensesToolbar';
import ManagerExpensesKPIs from '@/app/manager/expenses/expenses_components/ManagerExpensesKPIs/ManagerExpensesKPIs';
import ManagerExpensesTable from '@/app/manager/expenses/expenses_components/ManagerExpensesTable/ManagerExpensesTable';
import ManagerExpensesModal from '@/app/manager/expenses/expenses_components/ManagerExpensesModal/ManagerExpensesModal';
import ManagerExpensesChart from '@/app/manager/expenses/expenses_components/ManagerExpensesMain/ManagerExpensesChart';
import { useManagerExpensesStore } from '@/app/manager/expenses/expenses_store/useManagerExpensesStore';
import type { ExpenseStatus } from '@/app/manager/expenses/expenses_types/ManagerExpensesTypes';

// DATA FLOW: ExpensesProvider → useManagerExpensesStore (Zustand) → ManagerExpensesTable/KPIs/Toolbar

// ── Add Expense Form ─────────────────────────────────────────────────────────
// Fully functional form wired to useManagerExpensesStore.saveExpense().
// Rule 26: "Save Expense" button shows Loader2 while saving.
const EXPENSE_CATEGORIES = [
  'Equipment Maintenance',
  'Rent & Utilities',
  'Marketing',
  'Staff Salary',
  'Cleaning & Housekeeping',
  'Miscellaneous',
];

function AddExpenseForm({ onSaved }: { onSaved: () => void }) {
  const { saveExpense, saving } = useManagerExpensesStore();
  const [category, setCategory]       = useState(EXPENSE_CATEGORIES[0]);
  const [title, setTitle]             = useState('');
  const [amount, setAmount]           = useState('');
  const [date, setDate]               = useState('');
  const [status, setStatus]           = useState<ExpenseStatus>('PAID');
  const [notes, setNotes]             = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !amount || !date) {
      toast.error('Please fill in all required fields.');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error('Amount must be a positive number.');
      return;
    }
    try {
      await saveExpense({
        title: title.trim(),
        category,
        amount: parsedAmount,
        date,
        status,
        notes: notes.trim() || undefined,
        createdAt: new Date().toISOString(),
      });
      toast.success('Expense saved successfully!');
      // Reset form
      setTitle(''); setAmount(''); setDate(''); setNotes(''); setStatus('PAID');
      setCategory(EXPENSE_CATEGORIES[0]);
      onSaved();
    } catch {
      toast.error('Failed to save expense. Please try again.');
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 max-w-xl">
      <h3 className="text-lg font-bold text-foreground mb-5">Record New Expense</h3>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            Title <span className="text-danger">*</span>
          </label>
          <input
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Monthly Gym Rent"
            className="w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary motion-safe:transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Expense Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary motion-safe:transition-all"
          >
            {EXPENSE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              Amount (₹) <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              min="1"
              required
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary motion-safe:transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary motion-safe:transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Payment Status</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value as ExpenseStatus)}
            className="w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary motion-safe:transition-all"
          >
            <option value="PAID">Paid</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Notes (optional)</label>
          <textarea
            rows={3}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Any additional context..."
            className="w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary motion-safe:transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 motion-safe:transition-opacity disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {saving ? <Loader2 size={18} className="motion-safe:animate-spin" /> : <Save size={18} />}
          Save Expense
        </button>
      </form>
    </div>
  );
}

function ExpensesContent() {
  const fetchState = useManagerExpensesStore(s => s.fetchState);
  const [activeTab, setActiveTab] = useState('View Expenses');

  if (fetchState === 'error') {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-danger font-medium">Failed to load expenses. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader title="Expenses" subtitle="Track and manage operational costs" />
      <div className="p-4 sm:p-6 space-y-6 max-w-screen-2xl mx-auto w-full">
        
        <div className="flex flex-wrap gap-2 bg-card border border-border p-1 rounded-xl w-fit mb-4">
          {['Add Expense', 'View Expenses', 'Expense Report'].map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                activeTab === t ? 'bg-primary text-primary-foreground shadow' : 'text-secondary hover:text-foreground hover:bg-accent'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {activeTab === 'View Expenses' && (
          <>
            <Suspense fallback={<div className="h-20 bg-skeleton-base motion-safe:animate-pulse rounded-xl" />}>
              <ManagerExpensesToolbar />
            </Suspense>

            <Suspense fallback={<div className="h-32 bg-skeleton-base motion-safe:animate-pulse rounded-xl" />}>
              <ManagerExpensesKPIs />
            </Suspense>

            <Suspense fallback={<div className="h-96 bg-skeleton-base motion-safe:animate-pulse rounded-xl" />}>
              <ManagerExpensesTable />
            </Suspense>
          </>
        )}

        {activeTab === 'Add Expense' && (
          <AddExpenseForm onSaved={() => setActiveTab('View Expenses')} />
        )}

        {activeTab === 'Expense Report' && (
          <div className="bg-card border border-border rounded-xl p-2 min-h-[500px]">
            <ManagerExpensesChart />
          </div>
        )}

        <ManagerExpensesModal />
      </div>
    </div>
  );
}

export default function ManagerExpensesMain() {
  return (
    <ExpensesProvider>
      <ExpensesContent />
    </ExpensesProvider>
  );
}

