import { analyticsApi } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_api/SuperadminAnalyticsApi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminAnalyticsV1 } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_hooks/useSuperadminAnalyticsV1';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_api/SuperadminAnalyticsApi', () => ({ analyticsApi: vi.fn() }));
describe('useSuperadminAnalyticsV1', () => {
  it('executes the hook query contract and reaches a successful query state', async () => {
    vi.mocked(analyticsApi).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminAnalyticsV1(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.isError).toBe(false);
  });
});
