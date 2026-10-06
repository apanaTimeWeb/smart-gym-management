import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { plansApi } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_api/SuperadminPlansApi';
import { useSuperadminPlansPlanMutations } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_hooks/useSuperadminPlansPlanMutations';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_plans/superadmin_plans_api/SuperadminPlansApi', () => ({ plansApi: { createPlan: vi.fn(), updatePlan: vi.fn() } }));

describe('useSuperadminPlansPlanMutations', () => {
  it('creates a plan through the API and releases the mutation back to idle after success', async () => {
    vi.mocked(plansApi.createPlan).mockResolvedValue({ success: true, message: 'Created', data: { id: 'plan-1' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlansPlanMutations(), { wrapper });
    await result.current.createPlan({ name: 'Starter' } as never);
    expect(plansApi.createPlan).toHaveBeenCalledWith({ name: 'Starter' }, expect.any(String));
    expect(result.current.isCreating).toBe(false);
  });
});
