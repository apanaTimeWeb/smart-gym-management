import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminSubscriptionsStore } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_store/useAdminSubscriptionsStore';

describe('useAdminSubscriptionsStore', () => {
  beforeEach(() => useAdminSubscriptionsStore.setState({ activeTab: 'overview', showUpgradeConfirm: null, currentInvoicePage: 1 }));

  it('tracks the selected subscription view and pending upgrade confirmation', () => {
    const store = useAdminSubscriptionsStore.getState();
    store.setActiveTab('invoices');
    store.setShowUpgradeConfirm('plan-pro');
    expect(useAdminSubscriptionsStore.getState()).toMatchObject({ activeTab: 'invoices', showUpgradeConfirm: 'plan-pro' });
  });

  it('never allows the invoice page below one', () => {
    useAdminSubscriptionsStore.getState().setCurrentInvoicePage(0);
    expect(useAdminSubscriptionsStore.getState().currentInvoicePage).toBe(1);
    useAdminSubscriptionsStore.getState().setCurrentInvoicePage(4);
    expect(useAdminSubscriptionsStore.getState().currentInvoicePage).toBe(4);
  });
});
