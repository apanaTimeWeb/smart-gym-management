// Test: useSuperadminBackupsData — covers success, loading, error, and empty states (P1-29)
import { renderHook } from '@testing-library/react';
import { useSuperadminBackupsData } from '@/app/superadmin/backups/backups_utils/useSuperadminBackupsData';
import { useQuery } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

vi.mock('@/app/superadmin/backups/superadmin_backups_api/superadmin_backups_api', () => ({
  backupsApi: {
    fetchBackups: vi.fn(),
    fetchBackupDownloadUrl: vi.fn(),
  },
}));

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
      isLoading: false,
      isError: false,
      error: null,
    });

    const { result } = renderHook(() => useSuperadminBackupsData());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockBackups);
    expect(result.current.error).toBeNull();
  });

  it('returns loading state while query is pending', () => {
    (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    const { result } = renderHook(() => useSuperadminBackupsData());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('returns error state when query fails', () => {
    (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Network error'),
    });

    const { result } = renderHook(() => useSuperadminBackupsData());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).not.toBeNull();
  });

  it('returns empty array without crashing when backup list is empty', () => {
    (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    });

    const { result } = renderHook(() => useSuperadminBackupsData());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual([]);
  });

  it('uses the correct static query key for cache isolation', () => {
    (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    renderHook(() => useSuperadminBackupsData());

    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
      queryKey: ['superadmin', 'backups'],
    }));
  });
});
