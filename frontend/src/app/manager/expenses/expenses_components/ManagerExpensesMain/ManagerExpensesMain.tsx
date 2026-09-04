// RESPONSIBILITY: Main container for the Expenses module view. Assembles Toolbar, KPIs, and Table.
'use client';

import { Suspense } from 'react';
import { useManagerExpensesStore } from '@/app/manager/expenses/expenses_store/useManagerExpensesStore';
import ManagerExpensesToolbar from '@/app/manager/expenses/expenses_components/ManagerExpensesToolbar/ManagerExpensesToolbar';
import ManagerExpensesKPIs from '@/app/manager/expenses/expenses_components/ManagerExpensesKPIs/ManagerExpensesKPIs';
import ManagerExpensesTable from '@/app/manager/expenses/expenses_components/ManagerExpensesTable/ManagerExpensesTable';
import ManagerExpensesModal from '@/app/manager/expenses/expenses_components/ManagerExpensesModal/ManagerExpensesModal';

export default function ManagerExpensesMain() {
  const fetchState = useManagerExpensesStore(s => s.fetchState);

  if (fetchState === 'error') {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-danger font-medium">Failed to load expenses. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
      <Suspense fallback={<div className="h-20 bg-input animate-pulse rounded-xl" />}>
        <ManagerExpensesToolbar />
      </Suspense>

      <Suspense fallback={<div className="h-32 bg-input animate-pulse rounded-xl" />}>
        <ManagerExpensesKPIs />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-input animate-pulse rounded-xl" />}>
        <ManagerExpensesTable />
      </Suspense>

      <ManagerExpensesModal />
    </div>
  );
}
