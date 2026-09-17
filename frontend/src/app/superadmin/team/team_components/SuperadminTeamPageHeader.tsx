// RESPONSIBILITY: Renders the Superadmin team page header section.
'use client';
import type { SuperadminTeamSectionProps } from '@/app/superadmin/team/team_types/SuperadminTeamTypes';
export default function SuperadminTeamPageHeader({ data }: SuperadminTeamSectionProps) {
    return (<div>
  <h1 className="text-2xl font-bold text-foreground">
    Platform Team
  </h1>
  <p className="mt-1 text-sm text-secondary">
    Internal access, operator roles, active accounts, and Superadmin alert preferences.
  </p>
    </div>);
}
