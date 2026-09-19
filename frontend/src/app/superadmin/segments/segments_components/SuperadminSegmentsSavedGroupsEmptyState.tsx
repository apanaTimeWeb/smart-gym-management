// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin saved groups list.
'use client';
import EmptyState from '@/components/ui/EmptyState';
export default function SuperadminSegmentsSavedGroupsEmptyState() {
    return <EmptyState title="Saved groups" description="Save a useful tenant filter when you need to reuse the same audience."/>;
}
