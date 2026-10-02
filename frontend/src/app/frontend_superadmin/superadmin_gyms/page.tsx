// RESPONSIBILITY: Server Component that acts as the entry point for the Tenants (Gyms) list page.
import { Suspense } from 'react';

import SuperadminGymsMain from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_components/SuperadminGymsMain';
import { SuperadminLayoutErrorBoundary } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_error_boundary/SuperadminLayoutErrorBoundary';

import type { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Gyms | Superadmin',
    description: 'Manage gyms.',
};
/**
 * @description Server Component that acts as the entry point for the Tenants (Gyms) list page.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function GymsPage() {
    // In the future, server-side fetching can happen here before passing data to SuperadminGymsMain
    return (<SuperadminLayoutErrorBoundary>
      <SuperadminGymsMain />
    </SuperadminLayoutErrorBoundary>);
}
