// RESPONSIBILITY: Server Component that acts as the entry point for the Add Gym page.
import { Suspense } from 'react';

import SuperadminGymsAddGymForm from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_components/superadmin_gyms_add_gym_form/SuperadminGymsAddGymForm';
import SuperadminPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton';


/**
 * @description Server Component that acts as the entry point for the Add Gym page.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function AddGymPage() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminGymsAddGymForm />
    </Suspense>);
}
