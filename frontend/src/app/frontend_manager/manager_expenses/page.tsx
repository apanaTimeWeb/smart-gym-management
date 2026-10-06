// RESPONSIBILITY: Renders the manager_expenses route boundary (ExpensesPage) and delegates feature behavior to module-owned components/hooks; it does not own transport logic.
import { Suspense } from 'react';
import ManagerExpensesLoading from '@/app/frontend_manager/manager_expenses/loading';
import ManagerExpensesMain from '@/app/frontend_manager/manager_expenses/manager_expenses_components/manager_expenses_main/ManagerExpensesMain';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Expenses | GymSmart Manager',
  description: 'Manage gym operational expenses and inventory.' };

/** @description Route-level ExpensesPage for the Manager frontend module. */
export default function ExpensesPage() {
  return (
    <Suspense fallback={<ManagerExpensesLoading />}>
      <ManagerExpensesMain />
    </Suspense>
  );
}
