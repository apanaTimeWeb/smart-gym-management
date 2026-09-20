import { describe, expect, it } from 'vitest';
import { useSuperadminTeamAlertPreferences } from '@/app/superadmin/team/team_utils/useSuperadminTeamAlertPreferences.ts';

describe('useSuperadminTeamAlertPreferences', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminTeamAlertPreferences).toBe('function');
  });
});
