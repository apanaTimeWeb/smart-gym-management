// RESPONSIBILITY: Renders the Superadmin segment page header and starts the create-segment workflow.
'use client';
import { Plus } from 'lucide-react';
import type { SuperadminSegmentsSectionProps } from '@/app/superadmin/segments/segments_types/SuperadminSegmentsTypes';
export default function SuperadminSegmentsPageHeader({ onCreate }: SuperadminSegmentsSectionProps) {
    return <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h1 className="text-2xl font-bold text-primary">Saved Tenant Segments</h1><p className="mt-1 text-sm text-secondary">Reusable tenant groups for operations, reports, messages, and retention.</p></div><button type="button" onClick={onCreate} className="inline-flex items-center gap-2 self-start rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95"><Plus size={18}/>New Segment</button></div>;
}
