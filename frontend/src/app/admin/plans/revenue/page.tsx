import { Suspense } from 'react';
// RESPONSIBILITY: Entry point for the Admin Plan Revenue Dashboard route.
import AdminPlansRevenueMain from '@/app/admin/plans/plans_components/AdminPlansRevenue/AdminPlansRevenueMain';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plan Revenue | Admin',
  description: 'Membership Plan Revenue Attribution Dashboard',
};

export default function AdminPlanRevenuePage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <AdminPlansRevenueMain />
    </Suspense>
  );
}
