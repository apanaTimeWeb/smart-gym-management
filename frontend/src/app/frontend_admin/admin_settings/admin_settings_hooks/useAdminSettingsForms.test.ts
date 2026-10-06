import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminSettingsGeneralForm } from '@/app/frontend_admin/admin_settings/admin_settings_hooks/useAdminSettingsForms';

const mutate = vi.fn();
vi.mock('@/app/frontend_admin/admin_settings/admin_settings_hooks/useAdminSettingsMutation', () => ({ useAdminSettingsMutation: () => ({ mutate }) }));
vi.mock('@/app/frontend_admin/admin_settings/admin_settings_hooks/useAdminSettingsUnsavedChangesGuard', () => ({ useAdminSettingsUnsavedChangesGuard: vi.fn() }));

describe('useAdminSettingsForms', () => {
  it('submits the validated section data with a stable idempotency payload', () => {
    const initial = { timezone: 'Asia/Kolkata', language: 'en', dateFormat: 'DD/MM/YYYY', sessionTimeoutMinutes: 60, dataRetentionMonths: 24, autoBackup: false, backupFrequency: 'daily', maintenanceMode: false, twoFactorAuth: false };
    const { result } = renderHook(() => useAdminSettingsGeneralForm(initial));
    act(() => result.current.submitForm(initial));
    expect(mutate).toHaveBeenCalledWith(expect.objectContaining({ data: initial, idempotencyKey: expect.any(String) }), expect.objectContaining({ onSuccess: expect.any(Function) }));
  });
});
