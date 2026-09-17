// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin quick presets list.
'use client';
import SuperadminV1EmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1EmptyState';
export default function SuperadminSegmentsQuickPresetsEmptyState() {
    return <SuperadminV1EmptyState title="Quick presets" description="Add a preset when a common tenant question should be answerable in one click."/>;
}
