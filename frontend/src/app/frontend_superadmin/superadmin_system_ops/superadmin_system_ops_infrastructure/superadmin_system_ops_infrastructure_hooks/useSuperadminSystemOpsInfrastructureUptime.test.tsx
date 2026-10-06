import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { infrastructureApi } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi';
import { useSuperadminSystemOpsInfrastructureUptime } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureUptime';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi', () => ({ infrastructureApi: { fetchUptimeHistory: vi.fn() } }));

describe('useSuperadminSystemOpsInfrastructureUptime', () => {
  it('returns the validated uptime series through TanStack Query', async () => {
    vi.mocked(infrastructureApi.fetchUptimeHistory).mockResolvedValue({ success: true, message: 'Loaded', data: [{ timestamp: '2026-01-01T00:00:00Z', uptimePercent: 99.9 }] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminSystemOpsInfrastructureUptime(), { wrapper });
    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(result.current.data?.data).toHaveLength(1);
  });
});
