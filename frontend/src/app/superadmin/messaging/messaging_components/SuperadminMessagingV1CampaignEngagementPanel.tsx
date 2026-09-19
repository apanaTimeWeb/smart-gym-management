// RESPONSIBILITY: Renders the Superadmin messaging V1 Campaign engagement view.
'use client';
import { formatNumber } from '@/lib/formatters';
import Panel from '@/components/ui/Panel';
import type { SuperadminMessagingV1SectionProps } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingV1Types.ts';
export default function SuperadminMessagingV1CampaignEngagementPanel({ data }: SuperadminMessagingV1SectionProps) {
    return <Panel title="Campaign engagement" description="Messages sent, delivered, opened, and answered.">
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary">
          <th className="px-3 py-3">
            Campaign
          </th>
          <th className="px-3 py-3">
            Sent
          </th>
          <th className="px-3 py-3">
            Delivered
          </th>
          <th className="px-3 py-3">
            Opened
          </th>
          <th className="px-3 py-3">
            Responded
          </th>
        </tr>
      </thead>
      <tbody>
        {data.campaigns.map((c) => <tr key={c.name} className="border-b border-border">
          <td className="px-3 py-3 max-w-56 truncate font-medium text-primary">
            {c.name}
          </td>
          <td className="px-3 py-3 text-secondary">
            {formatNumber(c.sent)}
          </td>
          <td className="px-3 py-3 text-secondary">
            {formatNumber(c.delivered)}
          </td>
          <td className="px-3 py-3 text-secondary">
            {formatNumber(c.opened)}
          </td>
          <td className="px-3 py-3 text-primary">
            {formatNumber(c.responded)}
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>
    </Panel>;
}
