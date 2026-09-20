// RESPONSIBILITY: Server Component — entry point for the Expenses module. Fetches no initial data (expenses use client-side fetching via TanStack Query). Delegates rendering to ManagerExpensesMain which owns its own Provider.
import { Suspense } from 'react';
import ManagerExpensesMain from '@/app/manager/expenses/expenses_components/ManagerExpensesMain/ManagerExpensesMain';
import ManagerExpensesLoading from '@/app/manager/expenses/loading';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Expenses | GymSmart Manager',
  description: 'Manage gym operational expenses and inventory.' };

export default function ExpensesPage() {
  return (
    <Suspense fallback={<ManagerExpensesLoading />}>
      <ManagerExpensesMain />
    </Suspense>
  );
}
