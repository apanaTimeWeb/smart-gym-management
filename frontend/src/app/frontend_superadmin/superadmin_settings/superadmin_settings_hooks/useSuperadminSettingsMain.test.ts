import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminSettingsMain } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_hooks/useSuperadminSettingsMain';



const updateSetting = vi.fn();
vi.mock('@/app/frontend_superadmin/superadmin_settings/superadmin_settings_hooks/useSuperadminSettingsPage', () => ({
  useSuperadminSettingsPage: () => ({
    query: { data: { data: [{ id: 'one', category: 'billing', value: 'A' }, { id: 'two', category: 'billing', value: 'B' }, { id: 'three', category: 'general', value: 'C' }] } },
    updateSetting,
  }),
}));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminSettingsMain', () => {
  it('groups settings by category and clears a saved draft', async () => {
    updateSetting.mockResolvedValue({ success: true, message: 'Saved', data: {} });
    const { result } = renderHook(() => useSuperadminSettingsMain());
    expect(result.current.groupedSettings.billing).toHaveLength(2);
    expect(result.current.groupedSettings.general).toHaveLength(1);
    act(() => result.current.setEditedValues({ one: 'Updated' }));
    await act(async () => { await result.current.handleSave('one'); });
    expect(updateSetting).toHaveBeenCalledWith({ id: 'one', value: 'Updated' });
    expect(result.current.editedValues).toEqual({});
  });
});
