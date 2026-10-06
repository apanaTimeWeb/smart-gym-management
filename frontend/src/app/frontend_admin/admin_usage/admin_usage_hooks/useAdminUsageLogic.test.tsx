// RESPONSIBILITY: Renders and orchestrates the useAdminUsageLogic.test UI for the Admin admin_usage feature; business/API access remains in module-owned hooks and API services.
// DATA FLOW: module API / client state → useAdminUsageLogic.test → consuming Admin feature component.
import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAdminUsageLogic } from '@/app/frontend_admin/admin_usage/admin_usage_hooks/useAdminUsageLogic';
import { AdminUsageApi } from '@/app/frontend_admin/admin_usage/admin_usage_api/AdminUsageApi';
import { useAdminLayoutConfirm } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm';
import { useAdminLayoutToastStore } from '@/app/frontend_admin/admin_layout/admin_layout_store/useAdminLayoutToastStore';
import type { AdminUsageData } from '@/app/frontend_admin/admin_usage/admin_usage_types/AdminUsageTypes';

vi.mock('@/app/frontend_admin/admin_usage/admin_usage_api/AdminUsageApi', () => ({
  AdminUsageApi: {
    fetchMyUsage: vi.fn(),
    requestUpgrade: vi.fn(),
  },
}));

vi.mock('@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm', () => ({
  useAdminLayoutConfirm: vi.fn(),
}));

vi.mock('@/app/frontend_admin/admin_layout/admin_layout_store/useAdminLayoutToastStore', () => ({
  useAdminLayoutToastStore: vi.fn(),
}));

const usageData: AdminUsageData = {
  tenantId: 't1',
  planName: 'Growth',
  planTier: 'Growth',
  billingCycleEnd: '2026-11-15T00:00:00Z',
  monthlyPrice: 4999,
  smsSent: 8500,
  smsLimit: 10000,
  databaseGb: 3.5,
  mediaGb: 15.2,
  storageLimitGb: 25,
  activeMembers: 12500,
  memberLimit: 15000,
  staffCount: 125,
  staffLimit: 200,
  branchCount: 4,
  branchLimit: 5,
  apiCallsToday: 45000,
  apiCallsLimit: 100000,
  usageHistory: [],
};

function createWrapper() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  };
}

describe('useAdminUsageLogic upgrade workflow', () => {
  const confirm = vi.fn();
  const showToast = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(AdminUsageApi.fetchMyUsage).mockResolvedValue({ success: true, message: 'ok', data: usageData });
    vi.mocked(useAdminLayoutConfirm).mockReturnValue({ confirm });
    vi.mocked(useAdminLayoutToastStore).mockReturnValue({ toast: null, showToast, hideToast: vi.fn() });
    confirm.mockResolvedValue(true);
    vi.mocked(AdminUsageApi.requestUpgrade).mockResolvedValue({
      success: true,
      message: 'Upgrade request sent.',
      data: { requestId: 'upgrade-1', planName: 'Pro', status: 'pending', requestedAt: '2026-09-18T00:00:00.000Z' },
    });
  });

  it('confirms, submits the selected plan, shows success, and clears pending state', async () => {
    const { result } = renderHook(() => useAdminUsageLogic(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.data?.planName).toBe('Growth'));

    await act(async () => {
      await result.current.requestUpgrade('Pro');
    });

    expect(confirm).toHaveBeenCalledOnce();
    expect(AdminUsageApi.requestUpgrade).toHaveBeenCalledWith('Pro', expect.any(String));
    expect(showToast).toHaveBeenCalledWith('Upgrade request sent.', 'success', 'usage-upgrade-success-Pro');
    expect(result.current.pendingUpgradePlan).toBeNull();
  });

  it('does not submit when confirmation is declined', async () => {
    confirm.mockResolvedValueOnce(false);
    const { result } = renderHook(() => useAdminUsageLogic(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.data?.planName).toBe('Growth'));

    await act(async () => {
      await result.current.requestUpgrade('Pro');
    });

    expect(AdminUsageApi.requestUpgrade).not.toHaveBeenCalled();
    expect(showToast).not.toHaveBeenCalled();
  });

  it('surfaces API failure through the Admin toast', async () => {
    vi.mocked(AdminUsageApi.requestUpgrade).mockRejectedValueOnce(new Error('Upgrade service unavailable.'));
    const { result } = renderHook(() => useAdminUsageLogic(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.data?.planName).toBe('Growth'));

    await act(async () => {
      await result.current.requestUpgrade('Pro');
    });

    expect(showToast).toHaveBeenCalledWith('Upgrade service unavailable.', 'error', 'usage-upgrade-error-Pro');
    expect(result.current.pendingUpgradePlan).toBeNull();
  });

  it('exports the module-owned hook for feature orchestration', () => {
    expect(typeof useAdminUsageLogic).toBe('function');
  });

});
