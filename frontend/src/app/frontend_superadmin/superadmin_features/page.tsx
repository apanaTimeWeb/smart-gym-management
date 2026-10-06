// RESPONSIBILITY: Pure Server Component for the features page. Renders the interactive client component.
import { Suspense } from 'react';

import SuperadminFeaturesMain from '@/app/frontend_superadmin/superadmin_features/superadmin_features_components/SuperadminFeaturesMain';
import SuperadminLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton';
import SuperadminLayoutRoleProviders from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutRoleProviders';



/**
 * @description Pure Server Component for the features page. Renders the interactive client component.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function Page() {
    return (<SuperadminLayoutRoleProviders><Suspense fallback={<SuperadminLayoutPageSuspenseSkeleton />}>
      <SuperadminFeaturesMain />
    </Suspense></SuperadminLayoutRoleProviders>);
}
