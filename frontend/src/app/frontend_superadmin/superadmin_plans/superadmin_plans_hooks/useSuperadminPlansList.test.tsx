import { plansApi } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_api/SuperadminPlansApi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminPlansList } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_hooks/useSuperadminPlansList';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_plans/superadmin_plans_api/SuperadminPlansApi', () => ({ plansApi: vi.fn() }));
describe('useSuperadminPlansList', () => {
  it('executes the hook query contract and reaches a successful query state', async () => {
    vi.mocked(plansApi).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlansList(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.isError).toBe(false);
  });
});
