import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { superadminProfileDataExportApi } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_api/SuperadminProfileDataExportApi';
import { useSuperadminProfileDataExportMutation } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_hooks/useSuperadminProfileDataExportMutation';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_profile/superadmin_profile_api/SuperadminProfileDataExportApi', () => ({ superadminProfileDataExportApi: { requestFullDataExport: vi.fn() } }));
vi.mock('@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutSocketProvider', () => ({ useSuperadminSocketEvent: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminProfileDataExportMutation', () => {
  it('starts an export with the provided idempotency key and exposes started completion state', async () => {
    vi.mocked(superadminProfileDataExportApi.requestFullDataExport).mockResolvedValue({ success: true, message: 'Started', data: null } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminProfileDataExportMutation(), { wrapper });
    await result.current.requestExport();
    expect(superadminProfileDataExportApi.requestFullDataExport).toHaveBeenCalledWith(expect.any(String));
    expect(result.current.completionState).toBe('started');
  });
});
