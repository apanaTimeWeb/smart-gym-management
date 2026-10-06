// RESPONSIBILITY: Renders the manager_pt route boundary (ManagerPtPage) and delegates feature behavior to module-owned components/hooks; it does not own transport logic.
import { Suspense } from 'react';
import ManagerPtLoading from '@/app/frontend_manager/manager_pt/loading';
import ManagerPtMain from '@/app/frontend_manager/manager_pt/manager_pt_components/manager_pt_main/ManagerPtMain';
import type { Metadata } from 'next';


export const metadata: Metadata = { title: 'Personal Training | Manager | GymSmart' };

/** @description Route-level ManagerPtPage for the Manager frontend module. */
export default function ManagerPtPage() {
  return (
    <Suspense fallback={<ManagerPtLoading />}>
      <ManagerPtMain />
    </Suspense>
  );
}
