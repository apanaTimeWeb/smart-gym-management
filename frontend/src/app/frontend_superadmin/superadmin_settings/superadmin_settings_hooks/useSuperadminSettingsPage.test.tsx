import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { settingsApi } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_api/SuperadminSettingsApi';
import { useSuperadminSettingsPage } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_hooks/useSuperadminSettingsPage';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_settings/superadmin_settings_api/SuperadminSettingsApi', () => ({ settingsApi: { fetchSettings: vi.fn() } }));
vi.mock('@/app/frontend_superadmin/superadmin_settings/superadmin_settings_hooks/useSuperadminSettingsUpdateMutation', () => ({
  useSuperadminSettingsUpdateMutation: () => ({ updateSetting: vi.fn(), isUpdating: false, updateError: null, variables: undefined }),
}));

describe('useSuperadminSettingsPage', () => {
  it('loads settings through TanStack Query and exposes the dedicated update contract', async () => {
    vi.mocked(settingsApi.fetchSettings).mockResolvedValue({ success: true, message: 'Loaded', data: { theme: 'dark' } } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminSettingsPage(), { wrapper });
    await waitFor(() => expect(result.current.query.isPending).toBe(false));
    expect(settingsApi.fetchSettings).toHaveBeenCalledTimes(1);
    expect(result.current.query.data?.data).toEqual({ theme: 'dark' });
    expect(result.current.updateSetting).toEqual(expect.any(Function));
  });
});
