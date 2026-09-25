import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useAdminBlacklistLogic } from '@/app/admin/blacklist/blacklist_context/useAdminBlacklistLogic';
import { useAdminConfirm } from '@/app/admin/admin_layout/AdminFeedback/useAdminConfirm';
import { blacklistApi } from '@/app/admin/blacklist/blacklist_api/AdminBlacklistApi';

vi.mock('@/app/admin/admin_layout/AdminFeedback/useAdminConfirm', () => ({ useAdminConfirm: vi.fn() }));
vi.mock('@/app/admin/blacklist/blacklist_api/AdminBlacklistApi', () => ({
  blacklistApi: {
    fetchBlacklist: vi.fn().mockResolvedValue({ data: [{ id: 'm1', memberId: 'M1', memberName: 'Test Member', memberPhone: '9000000000', memberEmail: 'test@example.com', reason: 'Test', blacklistedBy: 'Admin', blacklistedAt: '2026-09-18', scope: 'global', assignedGyms: ['all'], assignedGymNames: ['All Gyms'], isActive: true }] }),
    fetchKPIs: vi.fn().mockResolvedValue({ data: { total: 0, active: 0, recent: 0, resolved: 0 } }),
    toggleBlacklist: vi.fn().mockResolvedValue({ data: { id: 'm1', status: 'inactive' }, message: 'Updated' }),
    removeFromBlacklist: vi.fn(),
    propagateToAllBranches: vi.fn(),
  },
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/admin/blacklist',
  useSearchParams: () => new URLSearchParams(),
}));

function wrapper({ children }: { children: React.ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

import { waitFor } from '@testing-library/react';

describe('useAdminBlacklistLogic confirmation contract', () => {
  const confirm = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAdminConfirm).mockReturnValue({ confirm });
    confirm.mockResolvedValue(true);
  });

  it('requires confirmation before toggling blacklist status', async () => {
    const { result } = renderHook(() => useAdminBlacklistLogic(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    await act(async () => {
      await result.current.toggleBlacklist('m1');
    });
    expect(confirm).toHaveBeenCalledOnce();
    expect(blacklistApi.toggleBlacklist).toHaveBeenCalledWith('m1', expect.any(String));
  });

  it('does not toggle when confirmation is declined', async () => {
    confirm.mockResolvedValueOnce(false);
    const { result } = renderHook(() => useAdminBlacklistLogic(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    await act(async () => {
      await result.current.toggleBlacklist('m1');
    });
    expect(blacklistApi.toggleBlacklist).not.toHaveBeenCalled();
  });
});
