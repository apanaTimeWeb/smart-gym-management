import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { superadminReportsExportApi } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_api/SuperadminReportsExportApi';
import { useSuperadminReportsExportMutation } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_hooks/useSuperadminReportsExportMutation';



vi.mock('@/app/frontend_superadmin/superadmin_reports/superadmin_reports_api/SuperadminReportsExportApi', () => ({ superadminReportsExportApi: { requestExport: vi.fn() } }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminReportsExportMutation', () => {
  it('uses one key for the export intent and clears it after success', async () => {
    vi.mocked(superadminReportsExportApi.requestExport).mockResolvedValue({ success: true, message: 'Export started' } as never);
    const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: React.ReactNode }) => createElement(QueryClientProvider, { client: queryClient }, children);
    const { result } = renderHook(() => useSuperadminReportsExportMutation(), { wrapper });
    await act(async () => { await result.current.requestExport(); });
    expect(superadminReportsExportApi.requestExport).toHaveBeenCalledWith(expect.any(String));
  });
});
