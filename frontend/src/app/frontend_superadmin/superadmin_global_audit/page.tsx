// RESPONSIBILITY: Server component entry point for the Superadmin Global Audit module.
import { Suspense } from 'react';

import SuperadminGlobalAuditMain from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_components/SuperadminGlobalAuditMain';

import type { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Global Audit Logs | Superadmin Dashboard',
    description: 'Immutable security ledger for system-wide infrastructure and billing events.',
};
/**
 * @description Server component entry point for the Superadmin Global Audit module.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminGlobalAuditPage() {
    return (<main className="w-full h-full bg-page min-h-screen">
      <SuperadminGlobalAuditMain />
    </main>);
}
