import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAdminSubscriptionsLogic } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_hooks/useAdminSubscriptionsLogic';

const confirm = vi.fn();
const upgradeMutation = { mutate: vi.fn(), isPending: false };
const autoRenewMutation = { mutate: vi.fn(), isPending: false };
const setDefaultPMMutation = { mutate: vi.fn(), isPending: false };
const removePMMutation = { mutate: vi.fn(), isPending: false };
const clearIntentKey = vi.fn();
const getIntentKey = vi.fn((id: string) => `idem:${id}`);

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm', () => ({ useAdminLayoutConfirm: () => ({ confirm }) }));
vi.mock('@/app/frontend_admin/admin_subscriptions/admin_subscriptions_store/useAdminSubscriptionsStore', () => ({ useAdminSubscriptionsStore: () => ({ showUpgradeConfirm: false, setShowUpgradeConfirm: vi.fn(), currentInvoicePage: 1, setCurrentInvoicePage: vi.fn() }) }));
vi.mock('@/app/frontend_admin/admin_subscriptions/admin_subscriptions_hooks/useAdminSubscriptionsQueries', () => ({
  useAdminSubscriptionsQueries: () => ({ subscription: { autoRenew: true }, plans: [], invoices: [], invoiceTotal: 0, invoiceTotalPages: 0, paymentMethods: [], kpis: {}, status: 'success', isPending: false }),
}));
vi.mock('@/app/frontend_admin/admin_subscriptions/admin_subscriptions_hooks/useAdminSubscriptionsMutations', () => ({
  useAdminSubscriptionsMutations: () => ({ upgradeMutation, autoRenewMutation, setDefaultPMMutation, removePMMutation, getIntentKey, clearIntentKey }),
}));

describe('useAdminSubscriptionsLogic', () => {
  beforeEach(() => {
    confirm.mockReset();
    upgradeMutation.mutate.mockReset();
    autoRenewMutation.mutate.mockReset();
    setDefaultPMMutation.mutate.mockReset();
    removePMMutation.mutate.mockReset();
    clearIntentKey.mockReset();
    confirm.mockResolvedValue(true);
  });

  it('requires confirmation and submits the upgrade mutation with the stable intent key', async () => {
    const { result } = renderHook(() => useAdminSubscriptionsLogic());
    await result.current.handleUpgrade('plan-pro', 'Pro');
    expect(confirm).toHaveBeenCalledWith(expect.objectContaining({ type: 'info' }));
    expect(upgradeMutation.mutate).toHaveBeenCalledWith({ planId: 'plan-pro', idempotencyKey: 'idem:upgrade-plan:plan-pro' });
  });

  it('does not mutate when destructive confirmation is declined', async () => {
    confirm.mockResolvedValue(false);
    const { result } = renderHook(() => useAdminSubscriptionsLogic());
    await result.current.handleRemovePaymentMethod('pm-1');
    expect(removePMMutation.mutate).not.toHaveBeenCalled();
    expect(clearIntentKey).toHaveBeenCalledWith('remove-payment-method:pm-1');
  });
});
