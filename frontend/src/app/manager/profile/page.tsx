import { Suspense } from 'react';
// RESPONSIBILITY: Server Component entry point for /manager/profile. Rule 8 compliant — no .
import type { Metadata } from 'next';
import ManagerProfileMain from '@/app/manager/profile/profile_components/ManagerProfileMain/ManagerProfileMain';

export const metadata: Metadata = { title: 'My Profile | Manager | GymSmart' };

export default function ManagerProfilePage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <ManagerProfileMain />
    </Suspense>
  );
}
