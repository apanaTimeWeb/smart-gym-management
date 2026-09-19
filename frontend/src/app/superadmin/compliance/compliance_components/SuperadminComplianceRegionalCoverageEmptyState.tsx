// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin regional coverage list.
'use client';
import EmptyState from '@/components/ui/EmptyState';
export default function SuperadminComplianceRegionalCoverageEmptyState() {
    return <EmptyState title="Regional coverage" description="Regional registration records will appear when tax coverage is configured."/>;
}
