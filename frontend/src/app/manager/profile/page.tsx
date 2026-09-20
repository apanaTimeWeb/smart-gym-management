// RESPONSIBILITY: Server Component entry point for /manager/profile. Rule 8 compliant — no .
import { Suspense } from 'react';
import ManagerProfileLoading from '@/app/manager/profile/loading';
import ManagerProfileMain from '@/app/manager/profile/profile_components/ManagerProfileMain/ManagerProfileMain';
import type { Metadata } from 'next';


export const metadata: Metadata = { title: 'My Profile | Manager | GymSmart' };

export default function ManagerProfilePage() {
  return (
    <Suspense fallback={<ManagerProfileLoading />}>
      <ManagerProfileMain />
    </Suspense>
  );
}
