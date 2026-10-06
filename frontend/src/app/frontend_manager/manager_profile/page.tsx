// RESPONSIBILITY: Renders the manager_profile route boundary (ManagerProfilePage) and delegates feature behavior to module-owned components/hooks; it does not own transport logic.
import { Suspense } from 'react';
import ManagerProfileLoading from '@/app/frontend_manager/manager_profile/loading';
import ManagerProfileMain from '@/app/frontend_manager/manager_profile/manager_profile_components/manager_profile_main/ManagerProfileMain';
import type { Metadata } from 'next';


export const metadata: Metadata = { title: 'My Profile | Manager | GymSmart' };

/** @description Route-level ManagerProfilePage for the Manager frontend module. */
export default function ManagerProfilePage() {
  return (
    <Suspense fallback={<ManagerProfileLoading />}>
      <ManagerProfileMain />
    </Suspense>
  );
}
