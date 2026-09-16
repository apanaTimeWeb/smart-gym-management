'use client';
// RESPONSIBILITY: Main container for the Expenses module. Owns the ExpensesProvider and assembles Header, Toolbar, KPIs, Table, and Modal.
import { Suspense, useState } from 'react';
import { ExpensesProvider, useExpensesContext } from '@/app/manager/expenses/expenses_context/ManagerExpensesContext';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import ManagerExpensesToolbar from '@/app/manager/expenses/expenses_components/ManagerExpensesToolbar/ManagerExpensesToolbar';
import ManagerExpensesKPIs from '@/app/manager/expenses/expenses_components/ManagerExpensesKPIs/ManagerExpensesKPIs';
import ManagerExpensesTable from '@/app/manager/expenses/expenses_components/ManagerExpensesTable/ManagerExpensesTable';
import ManagerExpensesModal from '@/app/manager/expenses/expenses_components/ManagerExpensesModal/ManagerExpensesModal';
import ManagerExpensesChart from '@/app/manager/expenses/expenses_components/ManagerExpensesMain/ManagerExpensesChart';

const EXPENSE_CATEGORIES = [
  'Equipment Maintenance',
  'Rent & Utilities',
  'Marketing',
  'Staff Salary',
  'Cleaning & Housekeeping',
  'Miscellaneous',
];

function ExpensesContent() {
  const { setShowModal } = useExpensesContext();
  const [activeTab, setActiveTab] = useState('View Expenses');

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader title="Expenses" subtitle="Track and manage operational costs" />
      <div className="p-4 sm:p-6 space-y-6 max-w-screen-2xl mx-auto w-full">
        
        <div className="flex flex-wrap gap-2 bg-card border border-border p-1 rounded-xl w-fit mb-4">
          {['Add Expense', 'View Expenses', 'Expense Report'].map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg motion-safe:transition-colors ${
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
          <div className="bg-card border border-border rounded-xl p-6 max-w-xl">
            <h3 className="text-lg font-bold text-foreground mb-2">Record New Expense</h3>
            <p className="text-sm text-secondary mb-5">Use the validated expense form to create a new operational cost.</p>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold"
            >
              Open Expense Form
            </button>
          </div>
        )}

        {activeTab === 'Expense Report' && (
          <div className="bg-card border border-border rounded-xl p-2 min-h-96">
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

