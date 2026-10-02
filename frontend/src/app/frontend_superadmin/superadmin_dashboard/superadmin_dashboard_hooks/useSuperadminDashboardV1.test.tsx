import { superadminDashboardApi } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_api/SuperadminDashboardApi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminDashboardV1 } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_hooks/useSuperadminDashboardV1';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_api/SuperadminDashboardApi', () => ({ superadminDashboardApi: vi.fn() }));
describe('useSuperadminDashboardV1', () => {
  it('executes the hook query contract and reaches a successful query state', async () => {
    vi.mocked(superadminDashboardApi).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminDashboardV1(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.isError).toBe(false);
  });
});
