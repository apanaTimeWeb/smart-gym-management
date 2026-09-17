import { Suspense } from 'react';
// RESPONSIBILITY: Server component entry point for the Superadmin Global Audit module.
import type { Metadata } from 'next';
import SuperadminGlobalAuditClient from '@/app/superadmin/global-audit/global-audit_components/SuperadminGlobalAuditClient';
export const metadata: Metadata = {
    title: 'Global Audit Logs | Superadmin Dashboard',
    description: 'Immutable security ledger for system-wide infrastructure and billing events.',
};
import SuperadminGlobalAuditV1Client from '@/app/superadmin/global-audit/global-audit_components/SuperadminGlobalAuditV1Client';
export default function SuperadminGlobalAuditPage() {
    return (<main className="w-full h-full bg-background min-h-screen">
      <SuperadminGlobalAuditClient />
      <SuperadminGlobalAuditV1Client />
    </main>);
}
