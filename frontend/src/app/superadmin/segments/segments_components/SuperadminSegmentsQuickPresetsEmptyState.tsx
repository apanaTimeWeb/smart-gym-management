// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin quick presets list.
'use client';
import SuperadminEmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminEmptyState';
export default function SuperadminSegmentsQuickPresetsEmptyState() {
    return <SuperadminEmptyState title="Quick presets" description="Add a preset when a common tenant question should be answerable in one click."/>;
}
