import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useManagerDashboardUrlState } from '@/app/manager/dashboard/dashboard_hooks/ManagerUseManagerDashboardUrlState';


const replace = vi.fn();
let currentParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ replace })),
  usePathname: vi.fn(() => '/manager/dashboard'),
  useSearchParams: vi.fn(() => currentParams),
}));

describe('useManagerDashboardUrlState', () => {
  it('reads canonical range/date state from the URL', () => {
    currentParams = new URLSearchParams('range=custom&startDate=2026-09-01&endDate=2026-09-19');
    const { result } = renderHook(() => useManagerDashboardUrlState());

    expect(result.current.range).toBe('custom');
    expect(result.current.startDate).toBe('2026-09-01');
    expect(result.current.endDate).toBe('2026-09-19');
  });

  it('writes preset range and clears custom dates when leaving custom mode', () => {
    currentParams = new URLSearchParams('range=custom&startDate=2026-09-01&endDate=2026-09-19');
    const { result } = renderHook(() => useManagerDashboardUrlState());

    act(() => result.current.setRange('monthly'));

    expect(replace).toHaveBeenCalledWith('/manager/dashboard?range=monthly', { scroll: false });
  });

  it('writes custom range with both URL date boundaries', () => {
    currentParams = new URLSearchParams();
    const { result } = renderHook(() => useManagerDashboardUrlState());

    act(() => result.current.setCustomDateRange('2026-09-01', '2026-09-19'));

    expect(replace).toHaveBeenCalledWith('/manager/dashboard?range=custom&startDate=2026-09-01&endDate=2026-09-19', { scroll: false });
  });
});
