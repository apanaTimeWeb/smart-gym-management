import { resetSuperadminBackupsMockState } from '@/app/superadmin/backups/backups_mocks/handlers/SuperadminBackupsMockHandlers';
// Test: useSuperadminBackupsData — covers success, loading, error, and empty states (P1-29)
import { renderHook } from '@testing-library/react';
import { useSuperadminBackupsData } from '@/app/superadmin/backups/backups_utils/useSuperadminBackupsData';
import { useQuery } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
vi.mock('@tanstack/react-query', () => ({
    useQuery: vi.fn(),
}));
vi.mock('@/app/superadmin/backups/backups_api/SuperadminBackupsApi', () => ({
    backupsApi: {
        fetchBackups: vi.fn(),
        fetchBackupDownloadUrl: vi.fn(),
    },
}));
beforeEach(() => {
  resetSuperadminBackupsMockState();
});

describe('useSuperadminBackupsData', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('returns success state with data when query resolves', () => {
        const mockBackups = [
            { id: 'BACKUP-001', tenantName: 'Gym Alpha', databaseName: 'gym_alpha_db', status: 'SUCCESS', createdAt: '2024-01-01T10:00:00Z' },
        ];
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: mockBackups,
            isPending: false,
            isError: false,
            error: null,
        });
        const { result } = renderHook(() => useSuperadminBackupsData());
        expect(result.current.isPending).toBe(false);
        expect(result.current.data).toEqual(mockBackups);
        expect(result.current.error).toBeNull();
    });
    it('returns loading state while query is pending', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: undefined,
            isPending: true,
            isError: false,
            error: null,
        });
        const { result } = renderHook(() => useSuperadminBackupsData());
        expect(result.current.isPending).toBe(true);
        expect(result.current.data).toBeUndefined();
    });
    it('returns error state when query fails', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: undefined,
            isPending: false,
            isError: true,
            error: new Error('Network error'),
        });
        const { result } = renderHook(() => useSuperadminBackupsData());
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).not.toBeNull();
    });
    it('returns empty array without crashing when backup list is empty', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: [],
            isPending: false,
            isError: false,
            error: null,
        });
        const { result } = renderHook(() => useSuperadminBackupsData());
        expect(result.current.isPending).toBe(false);
        expect(result.current.data).toEqual([]);
    });
    it('uses the correct static query key for cache isolation', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: null,
            isPending: false,
            isError: false,
        });
        renderHook(() => useSuperadminBackupsData());
        expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
            queryKey: expect.arrayContaining(['superadmin', 'backups']),
        }));
    });
});
