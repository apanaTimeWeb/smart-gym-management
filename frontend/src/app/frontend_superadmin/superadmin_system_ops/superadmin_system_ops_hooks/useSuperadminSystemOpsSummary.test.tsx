import { fetchSuperadminSystemOpsSummary } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_api/SuperadminSystemOpsApi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminSystemOpsSummary } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_hooks/useSuperadminSystemOpsSummary';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_api/SuperadminSystemOpsApi', () => ({ fetchSuperadminSystemOpsSummary: vi.fn() }));
describe('useSuperadminSystemOpsSummary', () => {
  it('executes the hook query contract and reaches a successful query state', async () => {
    vi.mocked(fetchSuperadminSystemOpsSummary).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSystemOpsSummary(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.isError).toBe(false);
  });
});
