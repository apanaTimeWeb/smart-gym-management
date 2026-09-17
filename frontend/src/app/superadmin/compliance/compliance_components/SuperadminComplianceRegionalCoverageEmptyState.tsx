// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin regional coverage list.
'use client';
import SuperadminV1EmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1EmptyState';
export default function SuperadminComplianceRegionalCoverageEmptyState() {
    return <SuperadminV1EmptyState title="Regional coverage" description="Regional registration records will appear when tax coverage is configured."/>;
}
