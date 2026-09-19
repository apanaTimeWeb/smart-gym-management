// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin compliance documents list.
'use client';
import SuperadminEmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminEmptyState';
export default function SuperadminComplianceDocumentsEmptyState() {
    return <SuperadminEmptyState title="Compliance documents" description="Tenant registrations and document expiry details will appear here."/>;
}
