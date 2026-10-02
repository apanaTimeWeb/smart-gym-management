import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { settingsApi } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_api/SuperadminSettingsApi';
import { useSuperadminSettingsUpdateMutation } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_hooks/useSuperadminSettingsUpdateMutation';



vi.mock('@/app/frontend_superadmin/superadmin_settings/superadmin_settings_api/SuperadminSettingsApi', () => ({ settingsApi: { updateSetting: vi.fn() } }));

describe('useSuperadminSettingsUpdateMutation', () => {
  it('persists a setting through the feature API and exposes completion state', async () => {
    vi.mocked(settingsApi.updateSetting).mockResolvedValue({ success: true, message: 'Saved', data: { id: 'timezone', value: 'Asia/Kolkata' } } as never);
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: React.ReactNode }) => createElement(QueryClientProvider, { client: queryClient }, children);
    const { result } = renderHook(() => useSuperadminSettingsUpdateMutation(), { wrapper });
    await act(async () => { await result.current.updateSetting({ id: 'timezone', value: 'Asia/Kolkata' }); });
    expect(settingsApi.updateSetting).toHaveBeenCalledWith('timezone', { value: 'Asia/Kolkata' }, expect.any(String));
    expect(result.current.isUpdating).toBe(false);
  });
});
