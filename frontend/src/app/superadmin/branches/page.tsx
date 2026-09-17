import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Server Component entry point for /superadmin/branches.
import type { Metadata } from 'next';
import SuperadminBranchesClient from '@/app/superadmin/branches/branches_components/SuperadminBranchesClient';
export const metadata: Metadata = {
    title: 'Branches | Superadmin | GymSmart',
};
import SuperadminBranchesV1Client from '@/app/superadmin/branches/branches_components/SuperadminBranchesV1Client';
export default function SuperadminBranchesPage() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminBranchesClient />
      <SuperadminBranchesV1Client />
    </Suspense>);
}
