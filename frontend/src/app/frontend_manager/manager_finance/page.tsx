// RESPONSIBILITY: Renders the manager_finance route boundary (ManagerFinancePage) and delegates feature behavior to module-owned components/hooks; it does not own transport logic.
import { Suspense } from 'react';
import ManagerFinanceLoading from '@/app/frontend_manager/manager_finance/loading';
import ManagerFinanceMain from '@/app/frontend_manager/manager_finance/manager_finance_components/manager_finance_main/ManagerFinanceMain';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Finance | Manager — GymSmart',
  description: 'Manage branch payments, revenue, and financial overview.' };

/** @description Route-level ManagerFinancePage for the Manager frontend module. */
export default function ManagerFinancePage() {
  return (
    <Suspense fallback={<ManagerFinanceLoading />}>
      <ManagerFinanceMain />
    </Suspense>
  );
}
