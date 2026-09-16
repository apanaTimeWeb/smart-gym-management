import { Suspense } from 'react';
// RESPONSIBILITY: Server Component — entry point for the Finance module. Renders ManagerFinanceMain which handles all client-side data fetching.
import type { Metadata } from 'next';
import ManagerFinanceMain from '@/app/manager/finance/finance_components/ManagerFinanceMain/ManagerFinanceMain';

export const metadata: Metadata = {
  title: 'Finance | Manager — GymSmart',
  description: 'Manage branch payments, revenue, and financial overview.',
};

export default function ManagerFinancePage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <ManagerFinanceMain />
    </Suspense>
  );
}
