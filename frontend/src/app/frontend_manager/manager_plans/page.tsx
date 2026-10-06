// RESPONSIBILITY: Renders the manager_plans route boundary (ManagerPlansPage) and delegates feature behavior to module-owned components/hooks; it does not own transport logic.
import { Suspense } from 'react';
import ManagerPlansLoading from '@/app/frontend_manager/manager_plans/loading';
import ManagerPlansMain from '@/app/frontend_manager/manager_plans/manager_plans_components/manager_plans_main/ManagerPlansMain';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Membership Plans | Manager — GymSmart',
  description: 'View and manage available gym membership plans.' };

/** @description Route-level ManagerPlansPage for the Manager frontend module. */
export default function ManagerPlansPage() {
  return (
    <Suspense fallback={<ManagerPlansLoading />}>
      <ManagerPlansMain />
    </Suspense>
  );
}
