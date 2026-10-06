import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { superadminReportsApi } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_api/SuperadminReportsApi';
import { useSuperadminReportsPage } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_hooks/useSuperadminReportsPage';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_reports/superadmin_reports_api/SuperadminReportsApi', () => ({ superadminReportsApi: { fetchRevenueData: vi.fn(), fetchCancellationsData: vi.fn(), fetchHealthData: vi.fn() } }));

describe('useSuperadminReportsPage', () => {
  it('keeps revenue, cancellation, and health requests on the same URL-derived parameters', async () => {
    const response = { success: true, message: 'ok', data: { value: 1 } };
    vi.mocked(superadminReportsApi.fetchRevenueData).mockResolvedValue(response as never);
    vi.mocked(superadminReportsApi.fetchCancellationsData).mockResolvedValue(response as never);
    vi.mocked(superadminReportsApi.fetchHealthData).mockResolvedValue(response as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const params = { from: '2026-01-01', to: '2026-01-31' };
    const { result } = renderHook(() => useSuperadminReportsPage(params), { wrapper });
    await waitFor(() => expect(result.current.health.isPending).toBe(false));
    expect(superadminReportsApi.fetchRevenueData).toHaveBeenCalledWith(params);
    expect(superadminReportsApi.fetchCancellationsData).toHaveBeenCalledWith(params);
    expect(superadminReportsApi.fetchHealthData).toHaveBeenCalledWith(params);
  });
});
