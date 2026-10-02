import { fetchPlansBusinessControls } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_api/SuperadminPlansBusinessControlsApi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminPlansV1 } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_hooks/useSuperadminPlansV1';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_plans/superadmin_plans_api/SuperadminPlansBusinessControlsApi', () => ({ fetchPlansBusinessControls: vi.fn() }));
describe('useSuperadminPlansV1', () => {
  it('executes the hook query contract and reaches a successful query state', async () => {
    vi.mocked(fetchPlansBusinessControls).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlansV1(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.isError).toBe(false);
  });
});
