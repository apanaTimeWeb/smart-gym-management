// RESPONSIBILITY: Pure Server Component entry point for /superadmin/profile.
import { Suspense } from 'react';

import SuperadminLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton';
import SuperadminLayoutRoleProviders from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutRoleProviders';
import SuperadminProfileMain from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_components/superadmin_profile_main/SuperadminProfileMain';

import type { Metadata } from 'next';



export const metadata: Metadata = {
    title: 'My Profile | Superadmin | GymSmart',
    description: 'Manage your superadmin account settings and security.',
};
/**
 * @description Pure Server Component entry point for /superadmin/profile.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function SuperadminProfilePage() {
    return (<SuperadminLayoutRoleProviders><Suspense fallback={<SuperadminLayoutPageSuspenseSkeleton />}>
      <SuperadminProfileMain />
    </Suspense></SuperadminLayoutRoleProviders>);
}
