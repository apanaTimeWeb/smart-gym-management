import { Suspense } from 'react';
// RESPONSIBILITY: Server Component — entry point for the Plans module. Renders ManagerPlansMain which handles all client-side data fetching.
import type { Metadata } from 'next';
import ManagerPlansMain from '@/app/manager/plans/plans_components/ManagerPlansMain/ManagerPlansMain';

export const metadata: Metadata = {
  title: 'Membership Plans | Manager — GymSmart',
  description: 'View and manage available gym membership plans.',
};

export default function ManagerPlansPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <ManagerPlansMain />
    </Suspense>
  );
}
