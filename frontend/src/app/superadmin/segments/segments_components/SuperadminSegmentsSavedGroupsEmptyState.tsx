// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin saved groups list.
'use client';
import SuperadminEmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminEmptyState';
export default function SuperadminSegmentsSavedGroupsEmptyState() {
    return <SuperadminEmptyState title="Saved groups" description="Save a useful tenant filter when you need to reuse the same audience."/>;
}
