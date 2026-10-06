import { useSearchParams } from 'next/navigation';

import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useSuperadminDashboardDateRangeSuffix } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_hooks/useSuperadminDashboardDateRangeSuffix';



vi.mock('next/navigation', () => ({ useSearchParams: vi.fn() }));

describe('useSuperadminDashboardDateRangeSuffix', () => {
  beforeEach(() => vi.clearAllMocks());
  it('formats a preset range and preserves custom date boundaries', () => {
    vi.mocked(useSearchParams).mockReturnValue({ get: (key: string) => key === 'range' ? '30d' : null } as ReturnType<typeof useSearchParams>);
    const { result: preset } = renderHook(() => useSuperadminDashboardDateRangeSuffix());
    expect(preset.current).toBe(' LAST 30 DAYS');

    vi.mocked(useSearchParams).mockReturnValue({ get: (key: string) => ({ range: 'custom', startDate: '2026-10-01', endDate: '2026-10-05' } as Record<string, string | null>)[key] ?? null } as ReturnType<typeof useSearchParams>);
    const { result: custom } = renderHook(() => useSuperadminDashboardDateRangeSuffix(false));
    expect(custom.current).toBe(' from 2026-10-01 to 2026-10-05');
  });
});
