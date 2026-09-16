import { Suspense } from 'react';
// RESPONSIBILITY: Server Component entry point for /superadmin/franchises.
import type { Metadata } from 'next';
import SuperadminFranchisesClient from '@/app/superadmin/franchises/franchises_components/SuperadminFranchisesClient';

export const metadata: Metadata = { title: 'Franchises | Superadmin | GymSmart' };

export default function SuperadminFranchisesPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminFranchisesClient />
    </Suspense>
  );
}
