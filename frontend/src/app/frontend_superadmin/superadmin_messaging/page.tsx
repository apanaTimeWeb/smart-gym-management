// RESPONSIBILITY: Renders the page component and its associated UI logic.
import { Suspense } from 'react';

import SuperadminLayoutRoleProviders from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutRoleProviders';
import SuperadminLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton';
import SuperadminMessagingMain from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_components/SuperadminMessagingMain';

/**
 * @description Renders the page component and its associated UI logic.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function MessagingPage() {
    return (<SuperadminLayoutRoleProviders><Suspense fallback={<SuperadminLayoutPageSuspenseSkeleton />}>
      <SuperadminMessagingMain />
    </Suspense></SuperadminLayoutRoleProviders>);
}
