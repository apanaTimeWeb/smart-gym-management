import { Suspense } from 'react';
// RESPONSIBILITY: Server Component entry point for /superadmin/branches.
import type { Metadata } from 'next';
import SuperadminBranchesClient from '@/app/superadmin/branches/branches_components/SuperadminBranchesClient';

export const metadata: Metadata = {
  title: 'Branches | Superadmin | GymSmart',
};

export default function SuperadminBranchesPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminBranchesClient />
    </Suspense>
  );
}
