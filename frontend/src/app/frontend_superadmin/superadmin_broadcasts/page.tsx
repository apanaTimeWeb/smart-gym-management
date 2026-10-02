// RESPONSIBILITY: Pure Server Component for the broadcasts page. Renders the interactive client component.
import { Suspense } from 'react';

import SuperadminBroadcastsMain from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_components/SuperadminBroadcastsMain';
import SuperadminPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton';


/**
 * @description Pure Server Component for the broadcasts page. Renders the interactive client component.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminBroadcastsMain />
    </Suspense>);
}
