// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin quick presets list.
'use client';
import EmptyState from '@/components/ui/EmptyState';
export default function SuperadminSegmentsQuickPresetsEmptyState() {
    return <EmptyState title="Quick presets" description="Add a preset when a common tenant question should be answerable in one click."/>;
}
