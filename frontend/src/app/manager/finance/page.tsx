// RESPONSIBILITY: Server Component — entry point for the Finance module. Renders ManagerFinanceMain which handles all client-side data fetching.
import { Suspense } from 'react';
import ManagerFinanceMain from '@/app/manager/finance/finance_components/ManagerFinanceMain/ManagerFinanceMain';
import ManagerFinanceLoading from '@/app/manager/finance/loading';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Finance | Manager — GymSmart',
  description: 'Manage branch payments, revenue, and financial overview.' };

export default function ManagerFinancePage() {
  return (
    <Suspense fallback={<ManagerFinanceLoading />}>
      <ManagerFinanceMain />
    </Suspense>
  );
}
