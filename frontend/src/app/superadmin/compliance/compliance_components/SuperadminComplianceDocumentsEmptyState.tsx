// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin compliance documents list.
'use client';
import EmptyState from '@/components/ui/EmptyState';
export default function SuperadminComplianceDocumentsEmptyState() {
    return <EmptyState title="Compliance documents" description="Tenant registrations and document expiry details will appear here."/>;
}
