// RESPONSIBILITY: Renders the Superadmin team members panel section.
'use client';
import { displayValue, formatDateTime } from '@/lib/formatters';
import SuperadminTeamMembersEmptyState from '@/app/superadmin/team/team_components/SuperadminTeamMembersEmptyState';
import SuperadminTooltip from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminTooltip';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import { getSuperadminStatusBadgeClasses } from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminStatusBadgeConfig';
import type { SuperadminTeamSectionProps } from '@/app/superadmin/team/team_types/SuperadminTeamTypes';
export default function SuperadminTeamMembersPanel({ data }: SuperadminTeamSectionProps) {
    return (<SuperadminV1Panel title="Team Members" description="Named access is auditable and safer than shared full-access accounts.">
  {data.users.length === 0 ? <SuperadminTeamMembersEmptyState /> : <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary">
          <th className="px-3 py-3">
            Name
          </th>
          <th className="px-3 py-3">
            Role
          </th>
          <th className="px-3 py-3">
            Extra sign-in
          </th>
          <th className="px-3 py-3">
            Last Sign In
          </th>
          <th className="px-3 py-3">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {data.users.map(user => (<tr key={user.id} className="border-b border-border">
            <td className="px-3 py-3">
              <SuperadminTooltip content={user.name}>
                <div className="max-w-56 truncate font-medium text-foreground">
                  {user.name}
                </div>
              </SuperadminTooltip>
              <SuperadminTooltip content={user.email}>
                <div className="max-w-56 truncate text-xs text-secondary">
                  {user.email}
                </div>
              </SuperadminTooltip>
            </td>
            <td className="px-3 py-3 text-foreground">
              {user.role}
            </td>
            <td className="px-3 py-3 text-secondary">
              {displayValue(user.mfa, '—')}
            </td>
            <td className="px-3 py-3 text-secondary">
              {displayValue(user.lastLogin ? formatDateTime(user.lastLogin) : null, '—')}
            </td>
            <td className="px-3 py-3">
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getSuperadminStatusBadgeClasses(user.status)}`}>
                {user.status}
              </span>
            </td>
          </tr>))}
      </tbody>
    </table>
  </div>}
    </SuperadminV1Panel>);
}
