import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminPlansApi } from '@/app/frontend_admin/admin_plans/admin_plans_api/AdminPlansApi';
import { useAdminPlansMutations } from '@/app/frontend_admin/admin_plans/admin_plans_hooks/useAdminPlansMutations';

vi.mock('@/app/frontend_admin/admin_plans/admin_plans_api/AdminPlansApi', () => ({
  AdminPlansApi: {
    createPlan: vi.fn().mockResolvedValue({ message: 'ok' }),
    updatePlan: vi.fn().mockResolvedValue({ message: 'ok' }),
    deletePlan: vi.fn().mockResolvedValue({ message: 'ok' })
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminPlansMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('executes the mutation through the module API boundary', async () => {
    const { result } = renderHook(() => useAdminPlansMutations(), { wrapper });
    await act(async () => { await result.current.createMutation.mutateAsync({ id: 'id-1', staffId: 'staff-1', planId: 'plan-1', permission: 'view', enabled: true, payload: {}, data: {}, planName: 'Pro', intentId: 'intent-1', idempotencyKey: 'idem-1' } as never); });
    await waitFor(() => expect(AdminPlansApi.createPlan).toHaveBeenCalled());
  });
});
