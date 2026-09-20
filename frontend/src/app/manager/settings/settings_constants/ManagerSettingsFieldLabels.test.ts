import { describe, expect, it } from 'vitest';
import { MANAGER_SETTINGS_GYM_FIELD_LABELS, MANAGER_SETTINGS_MEMBERSHIP_FIELD_LABELS } from '@/app/manager/settings/settings_constants/ManagerSettingsFieldLabels';


describe('ManagerSettingsFieldLabels', () => {
  it('defines a human-readable label for every editable gym field', () => {
    expect(MANAGER_SETTINGS_GYM_FIELD_LABELS.gymName).toBe('Gym Name');
    expect(Object.keys(MANAGER_SETTINGS_GYM_FIELD_LABELS)).toHaveLength(9);
  });
  it('defines labels for membership controls', () => {
    expect(MANAGER_SETTINGS_MEMBERSHIP_FIELD_LABELS.gracePeriodDays).toContain('Days');
    expect(MANAGER_SETTINGS_MEMBERSHIP_FIELD_LABELS.allowFreeze).toBe('Allow Membership Freeze');
  });
});
