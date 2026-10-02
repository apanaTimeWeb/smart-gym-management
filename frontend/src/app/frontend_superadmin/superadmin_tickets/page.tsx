// RESPONSIBILITY: Pure Server Component for the tickets page. Renders the interactive client component.
import { Suspense } from 'react';

import SuperadminLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton';
import SuperadminLayoutRoleProviders from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutRoleProviders';
import SuperadminTicketsMain from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_components/SuperadminTicketsMain';



/**
 * @description Pure Server Component for the tickets page. Renders the interactive client component.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function Page() {
    return (<SuperadminLayoutRoleProviders><Suspense fallback={<SuperadminLayoutPageSuspenseSkeleton />}>
      <SuperadminTicketsMain />
    </Suspense></SuperadminLayoutRoleProviders>);
}
