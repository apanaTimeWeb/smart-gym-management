import { describe, expect, it } from 'vitest';

import { getSuperadminTeamStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_constants/SuperadminTeamStatusBadgeConfig';



describe('getSuperadminTeamStatusBadgeClasses', () => {
  it('maps the documented status to semantic design tokens', () => {
    expect(getSuperadminTeamStatusBadgeClasses('ACTIVE')).toContain('bg-success-bg');
  });
  it('falls back safely for an unknown status', () => {
    expect(getSuperadminTeamStatusBadgeClasses('UNKNOWN_STATUS')).toContain('bg-input');
  });
});
