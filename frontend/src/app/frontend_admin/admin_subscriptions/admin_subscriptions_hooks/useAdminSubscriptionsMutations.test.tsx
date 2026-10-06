import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminSubscriptionsApi } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_api/AdminSubscriptionsApi';
import { useAdminSubscriptionsMutations } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_hooks/useAdminSubscriptionsMutations';

vi.mock('@/app/frontend_admin/admin_subscriptions/admin_subscriptions_api/AdminSubscriptionsApi', () => ({
  AdminSubscriptionsApi: {
    upgradePlan: vi.fn().mockResolvedValue({ message: 'ok' }),
    toggleAutoRenew: vi.fn().mockResolvedValue({ message: 'ok' }),
    setDefaultPaymentMethod: vi.fn().mockResolvedValue({ message: 'ok' }),
    removePaymentMethod: vi.fn().mockResolvedValue({ message: 'ok' })
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminSubscriptionsMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('executes the mutation through the module API boundary', async () => {
    const { result } = renderHook(() => useAdminSubscriptionsMutations(), { wrapper });
    await act(async () => { await result.current.upgradeMutation.mutateAsync({ id: 'id-1', staffId: 'staff-1', planId: 'plan-1', permission: 'view', enabled: true, payload: {}, data: {}, planName: 'Pro', intentId: 'intent-1', idempotencyKey: 'idem-1' } as never); });
    await waitFor(() => expect(AdminSubscriptionsApi.upgradePlan).toHaveBeenCalled());
  });
});
