import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminUsageAlert } from '@/app/frontend_admin/admin_usage/admin_usage_components/admin_usage_alert/useAdminUsageAlert';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_usage/admin_usage_api/AdminUsageApi', () => ({ AdminUsageApi: { fetchMyUsage: vi.fn() } }));

describe('useAdminUsageAlert', () => {
  it('derives the highest usage ratio and alert visibility from server usage data', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: { data: { smsSent: 90, smsLimit: 100, databaseGb: 1, mediaGb: 2, storageLimitGb: 10, activeMembers: 20, memberLimit: 100, staffCount: 2, staffLimit: 10 } },
      isPending: false,
      isError: false,
    } as never);

    const { result } = renderHook(() => useAdminUsageAlert());
    expect(result.current.maxRatio).toBe(0.9);
    expect(result.current.shouldShow).toBe(true);
    expect(result.current.isLimitReached).toBe(false);
  });
});
