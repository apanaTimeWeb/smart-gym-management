import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Server Component entry point for /superadmin/franchises.
import type { Metadata } from 'next';
import SuperadminFranchisesClient from '@/app/superadmin/franchises/franchises_components/SuperadminFranchisesClient';
export const metadata: Metadata = { title: 'Franchises | Superadmin | GymSmart' };
import SuperadminFranchisesV1Client from '@/app/superadmin/franchises/franchises_components/SuperadminFranchisesV1Client';
export default function SuperadminFranchisesPage() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminFranchisesClient />
      <SuperadminFranchisesV1Client />
    </Suspense>);
}
