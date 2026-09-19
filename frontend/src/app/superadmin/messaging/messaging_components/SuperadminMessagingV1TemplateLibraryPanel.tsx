// RESPONSIBILITY: Renders the Superadmin messaging V1 Template library view.
'use client';
import { formatNumber } from '@/lib/formatters';
import SuperadminPanel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPanel';
import { getSuperadminMessagingStatusBadgeClasses } from '@/app/superadmin/messaging/messaging_utils/SuperadminMessagingStatusBadgeConfig';
import type { SuperadminMessagingV1SectionProps } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingV1Types.ts';
export default function SuperadminMessagingV1TemplateLibraryPanel({ data }: SuperadminMessagingV1SectionProps) {
    return <SuperadminPanel title="Template library" description="Reusable messaging copy with an approval state and channel coverage.">
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary">
          <th className="px-3 py-3">
            Template
          </th>
          <th className="px-3 py-3">
            Channels
          </th>
          <th className="px-3 py-3">
            Uses
          </th>
          <th className="px-3 py-3">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {data.templates.map((t) => <tr key={t.name} className="border-b border-border">
          <td className="px-3 py-3 font-medium text-primary">
            {t.name}
          </td>
          <td className="px-3 py-3 text-secondary">
            {t.channel}
          </td>
          <td className="px-3 py-3 text-secondary">
            {formatNumber(t.uses)}
          </td>
          <td className="px-3 py-3">
            <span className={getSuperadminMessagingStatusBadgeClasses(t.status)}>
              {t.status}
            </span>
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>
    </SuperadminPanel>;
}
