import { infrastructureApi } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminSystemOpsInfrastructureTenants } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureTenants';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi', () => ({ infrastructureApi: vi.fn() }));
describe('useSuperadminSystemOpsInfrastructureTenants', () => {
  it('executes the hook query contract and reaches a successful query state', async () => {
    vi.mocked(infrastructureApi).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSystemOpsInfrastructureTenants(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.isError).toBe(false);
  });
});
