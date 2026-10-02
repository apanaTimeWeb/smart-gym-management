import { fetchBroadcastAudienceInsights } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_api/SuperadminBroadcastsAudienceInsightsApi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminBroadcastsV1 } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_hooks/useSuperadminBroadcastsV1';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_api/SuperadminBroadcastsAudienceInsightsApi', () => ({ fetchBroadcastAudienceInsights: vi.fn() }));
describe('useSuperadminBroadcastsV1', () => {
  it('executes the hook query contract and reaches a successful query state', async () => {
    vi.mocked(fetchBroadcastAudienceInsights).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminBroadcastsV1(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.isError).toBe(false);
  });
});
