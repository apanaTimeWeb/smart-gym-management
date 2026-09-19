// RESPONSIBILITY: Renders the Superadmin broadcasts V1 Channel results, Reusable templates view.
'use client';
import { CheckCircle2 } from 'lucide-react';
import { formatNumber } from '@/lib/formatters';
import ApexBarChart from '@/components/ui/ApexBarChart';
import Panel from '@/components/ui/Panel';
import type { SuperadminBroadcastsV1SectionProps } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastsV1Types.ts';
export default function SuperadminBroadcastsV1ChannelResultsAndTemplateSection({ data }: SuperadminBroadcastsV1SectionProps) {
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <Panel title="Channel results" description="Delivery plus engagement for recent Superadmin campaigns.">
    <div className="h-72">
      <ApexBarChart categories={data.channels.map((x) => x.name)} series={[{ name: 'Delivered', data: data.channels.map((x) => x.delivered) }, { name: 'Opened', data: data.channels.map((x) => x.opened) }]} valueFormatter={(v) => formatNumber(v)}/>
    </div>
  </Panel>
  <Panel title="Reusable templates" description="Use approved templates instead of rewriting sensitive communication every time.">
    <div className="space-y-2">
      {data.templates.map((t) => <div key={t} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
        <span className="truncate text-sm text-primary">
          {t}
        </span>
        <CheckCircle2 size={18} className="text-success"/>
      </div>)}
    </div>
  </Panel>
    </div>;
}
