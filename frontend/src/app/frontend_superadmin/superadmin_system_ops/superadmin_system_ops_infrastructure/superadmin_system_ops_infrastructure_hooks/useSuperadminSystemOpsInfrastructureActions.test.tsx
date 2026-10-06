import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { infrastructureApi } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi';
import { useSuperadminSystemOpsInfrastructureActions } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureActions';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi', () => ({ infrastructureApi: { flushGlobalCache: vi.fn(), flushTenantCache: vi.fn() } }));

describe('useSuperadminSystemOpsInfrastructureActions', () => {
  it('flushes the global cache through the feature API and preserves idle state after success', async () => {
    vi.mocked(infrastructureApi.flushGlobalCache).mockResolvedValue({ success: true, message: 'Flushed', data: null } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSystemOpsInfrastructureActions(), { wrapper });
    await result.current.flushGlobalCache('key-1');
    expect(infrastructureApi.flushGlobalCache).toHaveBeenCalledWith('key-1');
    expect(result.current.isFlushingGlobal).toBe(false);
  });
});
