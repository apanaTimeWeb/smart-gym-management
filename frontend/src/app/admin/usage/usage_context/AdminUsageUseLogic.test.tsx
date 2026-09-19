import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAdminUsageLogic } from '@/app/admin/usage/usage_context/useAdminUsageLogic';
import { adminUsageApi } from '@/app/admin/usage/usage_api/AdminUsageApi';
import { useAdminConfirm } from '@/app/admin/admin_layout/AdminFeedback/useAdminConfirm';
import { useAdminToastStore } from '@/app/admin/admin_layout/admin_store/useAdminToastStore';
import type { AdminUsageData } from '@/app/admin/usage/usage_types/AdminUsageTypes';

vi.mock('@/app/admin/usage/usage_api/AdminUsageApi', () => ({
  adminUsageApi: {
    fetchMyUsage: vi.fn(),
    requestUpgrade: vi.fn(),
  },
}));

vi.mock('@/app/admin/admin_layout/AdminFeedback/useAdminConfirm', () => ({
  useAdminConfirm: vi.fn(),
}));

vi.mock('@/app/admin/admin_layout/admin_store/useAdminToastStore', () => ({
  useAdminToastStore: vi.fn(),
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
    vi.mocked(adminUsageApi.fetchMyUsage).mockResolvedValue({ success: true, message: 'ok', data: usageData });
    vi.mocked(useAdminConfirm).mockReturnValue({ confirm });
    vi.mocked(useAdminToastStore).mockReturnValue({ toast: null, showToast, hideToast: vi.fn() });
    confirm.mockResolvedValue(true);
    vi.mocked(adminUsageApi.requestUpgrade).mockResolvedValue({
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
    expect(adminUsageApi.requestUpgrade).toHaveBeenCalledWith('Pro');
    expect(showToast).toHaveBeenCalledWith('Upgrade request sent.', 'success');
    expect(result.current.pendingUpgradePlan).toBeNull();
  });

  it('does not submit when confirmation is declined', async () => {
    confirm.mockResolvedValueOnce(false);
    const { result } = renderHook(() => useAdminUsageLogic(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.data?.planName).toBe('Growth'));

    await act(async () => {
      await result.current.requestUpgrade('Pro');
    });

    expect(adminUsageApi.requestUpgrade).not.toHaveBeenCalled();
    expect(showToast).not.toHaveBeenCalled();
  });

  it('surfaces API failure through the Admin toast', async () => {
    vi.mocked(adminUsageApi.requestUpgrade).mockRejectedValueOnce(new Error('Upgrade service unavailable.'));
    const { result } = renderHook(() => useAdminUsageLogic(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.data?.planName).toBe('Growth'));

    await act(async () => {
      await result.current.requestUpgrade('Pro');
    });

    expect(showToast).toHaveBeenCalledWith('Upgrade service unavailable.', 'error');
    expect(result.current.pendingUpgradePlan).toBeNull();
  });
});
