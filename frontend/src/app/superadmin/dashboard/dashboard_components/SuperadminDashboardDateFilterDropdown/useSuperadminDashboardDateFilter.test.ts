import { renderHook, act } from '@testing-library/react';
import { useSuperadminDashboardDateFilter } from '@/app/superadmin/dashboard/dashboard_components/SuperadminDashboardDateFilterDropdown/useSuperadminDashboardDateFilter';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { vi, describe, it, expect, beforeEach } from 'vitest';
vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
    useRouter: vi.fn(() => ({ replace: vi.fn() })),
    usePathname: vi.fn(() => ''),
    useSearchParams: vi.fn(() => ({ get: vi.fn(), set: vi.fn() })),
    usePathname: vi.fn(),
}));
describe('useSuperadminDashboardDateFilter', () => {
    const replaceMock = vi.fn();
    beforeEach(() => {
        vi.clearAllMocks();
        (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ replace: replaceMock });
        (usePathname as unknown as ReturnType<typeof vi.fn>).mockReturnValue('/superadmin/dashboard');
    });
    it('should initialize with this_month by default', () => {
        (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            get: vi.fn().mockReturnValue(null),
            toString: () => '',
        });
        const { result } = renderHook(() => useSuperadminDashboardDateFilter());
        expect(result.current.value).toBe('this_month');
        expect(result.current.customStart).toBe('');
        expect(result.current.customEnd).toBe('');
    });
    it('should update URL when handling preset change', () => {
        const searchParamsMock = new URLSearchParams('');
        (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            get: vi.fn().mockReturnValue('this_month'),
            toString: () => searchParamsMock.toString(),
        });
        const { result } = renderHook(() => useSuperadminDashboardDateFilter());
        act(() => {
            result.current.handlePresetChange('last_month');
        });
        expect(replaceMock).toHaveBeenCalled();
        const urlCalled = replaceMock.mock.calls[0][0];
        expect(urlCalled).toContain('range=last_month');
        expect(urlCalled).toContain('startDate=');
        expect(urlCalled).toContain('endDate=');
    });
    it('should clear dates when preset is custom and then handleCustomDateChange is called', () => {
        const searchParamsMock = new URLSearchParams('range=custom');
        (useSearchParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            get: vi.fn((key) => {
                if (key === 'range')
                    return 'custom';
                return null;
            }),
            toString: () => searchParamsMock.toString(),
        });
        const { result } = renderHook(() => useSuperadminDashboardDateFilter());
        act(() => {
            result.current.handleCustomDateChange('start', '2024-01-01');
        });
        expect(replaceMock).toHaveBeenCalled();
        const urlCalled = replaceMock.mock.calls[0][0];
        expect(urlCalled).toContain('range=custom');
        expect(urlCalled).toContain('startDate=2024-01-01');
    });
});
