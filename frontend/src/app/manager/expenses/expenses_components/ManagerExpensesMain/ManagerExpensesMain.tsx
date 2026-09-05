// RESPONSIBILITY: Main container for the Expenses module. Owns the ExpensesProvider and assembles Header, Toolbar, KPIs, Table, and Modal.
'use client';

import { Suspense } from 'react';
import { ExpensesProvider } from '@/app/manager/expenses/expenses_context/ManagerExpensesContext';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import ManagerExpensesToolbar from '@/app/manager/expenses/expenses_components/ManagerExpensesToolbar/ManagerExpensesToolbar';
import ManagerExpensesKPIs from '@/app/manager/expenses/expenses_components/ManagerExpensesKPIs/ManagerExpensesKPIs';
import ManagerExpensesTable from '@/app/manager/expenses/expenses_components/ManagerExpensesTable/ManagerExpensesTable';
import ManagerExpensesModal from '@/app/manager/expenses/expenses_components/ManagerExpensesModal/ManagerExpensesModal';
import { useManagerExpensesStore } from '@/app/manager/expenses/expenses_store/useManagerExpensesStore';

// DATA FLOW: ExpensesProvider → useManagerExpensesStore (Zustand) → ManagerExpensesTable/KPIs/Toolbar

function ExpensesContent() {
  const fetchState = useManagerExpensesStore(s => s.fetchState);

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
        <Suspense fallback={<div className="h-20 bg-skeleton-base motion-safe:animate-pulse rounded-xl" />}>
          <ManagerExpensesToolbar />
        </Suspense>

        <Suspense fallback={<div className="h-32 bg-skeleton-base motion-safe:animate-pulse rounded-xl" />}>
          <ManagerExpensesKPIs />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-skeleton-base motion-safe:animate-pulse rounded-xl" />}>
          <ManagerExpensesTable />
        </Suspense>

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
