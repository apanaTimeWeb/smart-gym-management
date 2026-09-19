// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin regional coverage list.
'use client';
import SuperadminEmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminEmptyState';
export default function SuperadminComplianceRegionalCoverageEmptyState() {
    return <SuperadminEmptyState title="Regional coverage" description="Regional registration records will appear when tax coverage is configured."/>;
}
