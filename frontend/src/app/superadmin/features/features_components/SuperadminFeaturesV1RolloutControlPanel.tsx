// RESPONSIBILITY: Renders the Superadmin features V1 Rollout control view.
'use client';
import { formatNumber } from '@/lib/formatters';
import SuperadminPanel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPanel';
import type { SuperadminFeaturesV1SectionProps } from '@/app/superadmin/features/features_types/SuperadminFeaturesV1Types.ts';
export default function SuperadminFeaturesV1RolloutControlPanel({ data }: SuperadminFeaturesV1SectionProps) {
    return <SuperadminPanel title="Rollout control" description="Use percentage rollout, tenant targeting, scheduled changes, and visible health checks.">
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary">
          <th className="px-3 py-3">
            Feature
          </th>
          <th className="px-3 py-3">
            Rollout
          </th>
          <th className="px-3 py-3">
            Target
          </th>
          <th className="px-3 py-3">
            Status
          </th>
          <th className="px-3 py-3">
            Health
          </th>
        </tr>
      </thead>
      <tbody>
        {data.rollouts.map((r) => <tr key={r.feature} className="border-b border-border">
          <td className="px-3 py-3 font-medium text-primary">
            {r.feature}
          </td>
          <td className="px-3 py-3 text-primary">
            {r.rollout}
            %
          </td>
          <td className="px-3 py-3 text-secondary">
            {r.target}
          </td>
          <td className="px-3 py-3 text-secondary">
            {r.status}
          </td>
          <td className="px-3 py-3 text-success">
            {formatNumber(r.health)}
            %
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>
    </SuperadminPanel>;
}
