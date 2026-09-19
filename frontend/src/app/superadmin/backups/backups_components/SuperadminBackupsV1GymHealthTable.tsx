// RESPONSIBILITY: Renders the Superadmin backups V1 Backup health by gym view.
'use client';
import { formatNumber, formatDateTime } from '@/lib/formatters';
import Panel from '@/components/ui/Panel';
import type { SuperadminBackupsV1SectionProps } from '@/app/superadmin/backups/backups_types/SuperadminBackupsV1Types.ts';
import { getSuperadminBackupsStatusBadgeClasses } from '@/app/superadmin/backups/backups_utils/SuperadminBackupsStatusBadgeConfig';
export default function SuperadminBackupsV1GymHealthTable({ data }: SuperadminBackupsV1SectionProps) {
    return <Panel title="Backup health by gym" description="Every sample includes age, size, and status so gaps are visible.">
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary">
          <th className="px-3 py-3">
            Gym
          </th>
          <th className="px-3 py-3">
            Last backup
          </th>
          <th className="px-3 py-3">
            Age
          </th>
          <th className="px-3 py-3">
            Size
          </th>
          <th className="px-3 py-3">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {data.tenants.map((t) => <tr key={t.gym} className="border-b border-border">
          <td className="px-3 py-3 font-medium text-primary">
            {t.gym}
          </td>
          <td className="px-3 py-3 text-secondary">
            {formatDateTime(t.lastBackup)}
          </td>
          <td className="px-3 py-3 text-secondary">
            {t.ageHours}
            hours
          </td>
          <td className="px-3 py-3 text-secondary">
            {t.size}
          </td>
          <td className={`px-3 py-3 ${getSuperadminBackupsStatusBadgeClasses(t.status)}`}>
            {t.status}
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>
    </Panel>;
}
