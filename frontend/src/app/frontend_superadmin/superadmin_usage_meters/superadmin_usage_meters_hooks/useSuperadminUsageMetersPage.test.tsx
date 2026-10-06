import { usageMetersApi } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_api/SuperadminUsageMetersApi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminUsageMetersPage } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_hooks/useSuperadminUsageMetersPage';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_api/SuperadminUsageMetersApi', () => ({ usageMetersApi: vi.fn() }));
describe('useSuperadminUsageMetersPage', () => {
  it('executes the hook query contract and reaches a successful query state', async () => {
    vi.mocked(usageMetersApi).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminUsageMetersPage(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.isError).toBe(false);
  });
});
