// RESPONSIBILITY: Orchestrates Superadmin segments data, create/edit modal state, and application of saved filters.
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SuperadminSegmentsPageHeader from '@/app/superadmin/segments/segments_components/SuperadminSegmentsPageHeader';
import SuperadminSegmentsQuickPresetsPanel from '@/app/superadmin/segments/segments_components/SuperadminSegmentsQuickPresetsPanel';
import SuperadminSegmentsSavedGroupsPanel from '@/app/superadmin/segments/segments_components/SuperadminSegmentsSavedGroupsPanel';
import SuperadminSegmentsSummaryCards from '@/app/superadmin/segments/segments_components/SuperadminSegmentsSummaryCards';
import SuperadminSegmentEditorModal from '@/app/superadmin/segments/segments_components/SuperadminSegmentEditorModal';
import { useSuperadminSegmentsPage } from '@/app/superadmin/segments/segments_utils/useSuperadminSegmentsPage';
import { SuperadminSegmentsUrlConfig } from '@/app/superadmin/segments/superadmin_segments_url_config';
import type { SuperadminSegment } from '@/app/superadmin/segments/segments_types/SuperadminSegmentsTypes';
export default function SuperadminSegmentsClient() {
    const { data, isPending, isError, refetch } = useSuperadminSegmentsPage();
    const router = useRouter();
    const [editingSegment, setEditingSegment] = useState<SuperadminSegment | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    if (isPending) return <div className="space-y-4" aria-busy="true"><div className="h-32 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/><div className="h-96 rounded-xl bg-skeleton-base motion-safe:animate-pulse"/></div>;
    if (isError || !data) return <div className="rounded-xl border border-danger/30 bg-danger-bg p-5" role="alert"><p className="font-semibold text-danger">Segments data could not be loaded.</p><button type="button" onClick={()=>refetch()} className="mt-3 rounded-md border border-border px-3 py-2 text-sm text-primary">Retry</button></div>;
    const selectedData = data;
    const refresh = () => { void refetch(); setEditingSegment(null); setIsCreateOpen(false); };
    const handleApply = (segment: SuperadminSegment) => { router.push(`${SuperadminSegmentsUrlConfig.PAGES.GYMS}?segmentId=${encodeURIComponent(segment.id)}`); };
    return <div className="space-y-6"><SuperadminSegmentsPageHeader data={selectedData} onCreate={()=>setIsCreateOpen(true)}/><SuperadminSegmentsSummaryCards data={selectedData}/><SuperadminSegmentsSavedGroupsPanel data={selectedData} onEdit={setEditingSegment} onApply={handleApply}/><SuperadminSegmentsQuickPresetsPanel data={selectedData}/>{(isCreateOpen || editingSegment) ? <SuperadminSegmentEditorModal segment={editingSegment} onClose={()=>{setEditingSegment(null);setIsCreateOpen(false)}} onSaved={refresh}/> : null}</div>;
}
