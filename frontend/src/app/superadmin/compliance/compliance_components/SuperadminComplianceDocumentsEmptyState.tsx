// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin compliance documents list.
'use client';
import SuperadminV1EmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1EmptyState';
export default function SuperadminComplianceDocumentsEmptyState() {
    return <SuperadminV1EmptyState title="Compliance documents" description="Tenant registrations and document expiry details will appear here."/>;
}
