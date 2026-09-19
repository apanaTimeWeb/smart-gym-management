// RESPONSIBILITY: Renders the Superadmin segments quick presets panel section.
'use client';
import SuperadminSegmentsQuickPresetsEmptyState from '@/app/superadmin/segments/segments_components/SuperadminSegmentsQuickPresetsEmptyState';
import Panel from '@/components/ui/Panel';
import type { SuperadminSegmentsSectionProps } from '@/app/superadmin/segments/segments_types/SuperadminSegmentsTypes';
export default function SuperadminSegmentsQuickPresetsPanel({ data }: SuperadminSegmentsSectionProps) {
    return (<Panel title="Quick Presets" description="Start from common tenant questions, then save your own version.">
  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
    {data.presets.length === 0 ? <SuperadminSegmentsQuickPresetsEmptyState /> : data.presets.map(preset => (<div key={preset.name} className="rounded-lg border border-border p-3">
        <p className="font-medium text-primary">
          {preset.name}
        </p>
        <p className="mt-1 text-xs text-secondary">
          {preset.rule}
        </p>
      </div>))}
  </div>
    </Panel>);
}
