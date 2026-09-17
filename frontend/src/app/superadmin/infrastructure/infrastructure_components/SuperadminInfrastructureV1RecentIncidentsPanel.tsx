// RESPONSIBILITY: Renders the Superadmin infrastructure V1 Recent incidents view.
'use client';
import { ShieldAlert } from 'lucide-react';
import { formatNumber, formatPercent1dp, formatDateTime } from '@/lib/formatters';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import type { SuperadminInfrastructureV1SectionProps } from '@/app/superadmin/infrastructure/infrastructure_types/SuperadminInfrastructureV1Types.ts';
import { getSuperadminStatusBadgeClasses } from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminStatusBadgeConfig';
export default function SuperadminInfrastructureV1RecentIncidentsPanel({ data }: SuperadminInfrastructureV1SectionProps) {
    return <SuperadminV1Panel title="Recent incidents" description="Application-level incidents stay visible even when server resources look normal.">
  <div className="space-y-3">
    {data.incidents.map((i) => <div key={i.title} className="flex gap-3 rounded-lg border border-border p-3">
      <ShieldAlert size={18} className="text-warning"/>
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">
          {i.title}
        </p>
        <p className="text-xs text-secondary">
          {i.impact}
          ·
          {formatDateTime(i.started)}
        </p>
      </div>
      <span className={`ml-auto rounded-full px-2 py-1 text-xs font-semibold ${getSuperadminStatusBadgeClasses(i.status)}`}>
        {i.status}
      </span>
    </div>)}
  </div>
    </SuperadminV1Panel>;
}
