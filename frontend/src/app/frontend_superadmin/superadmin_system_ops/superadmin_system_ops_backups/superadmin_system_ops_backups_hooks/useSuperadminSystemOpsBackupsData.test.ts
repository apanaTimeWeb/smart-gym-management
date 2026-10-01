// DATA FLOW: API / URL state / module client state → useQuery → superadmin_system_ops_backups view components.
import { useQuery } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { resetSuperadminBackupsMockState } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_mocks/superadmin_system_ops_backups_mocks_handlers/SuperadminSystemOpsBackupsMockHandlers';
import { useSuperadminSystemOpsBackupsData } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_hooks/useSuperadminSystemOpsBackupsData';

vi.mock('@tanstack/react-query', () => ({
    useQuery: vi.fn(),
}));
vi.mock('@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi', () => ({
    backupsApi: {
        fetchBackups: vi.fn(),
        fetchBackupDownloadUrl: vi.fn(),
    },
}));
beforeEach(() => {
  resetSuperadminBackupsMockState();
});

describe('useSuperadminSystemOpsBackupsData', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('returns success state with data when query resolves', () => {
        const mockBackups = [
            { id: 'BACKUP-001', tenantName: 'Gym Alpha', databaseName: 'gym_alpha_db', status: SUPERADMIN_BACKUPS_STATUS_CODES.SUCCESS, createdAt: '2024-01-01T10:00:00Z' },
        ];
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: mockBackups,
            isPending: false,
            isError: false,
            error: null,
        });
        const { result } = renderHook(() => useSuperadminSystemOpsBackupsData());
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
        const { result } = renderHook(() => useSuperadminSystemOpsBackupsData());
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
        const { result } = renderHook(() => useSuperadminSystemOpsBackupsData());
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
        const { result } = renderHook(() => useSuperadminSystemOpsBackupsData());
        expect(result.current.isPending).toBe(false);
        expect(result.current.data).toEqual([]);
    });
    it('uses the correct static query key for cache isolation', () => {
        (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            data: null,
            isPending: false,
            isError: false,
        });
        renderHook(() => useSuperadminSystemOpsBackupsData());
        expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
            queryKey: expect.arrayContaining(['superadmin_system_ops_backups', 'backups']),
        }));
    });
});
