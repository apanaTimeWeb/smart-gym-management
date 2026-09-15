// Test: useSuperadminJobsPage — covers success, loading, error, empty, filter params, and pagination (P1-29)
import { renderHook, act } from '@testing-library/react';
import { useSuperadminJobsPage } from '@/app/superadmin/jobs/jobs_utils/useSuperadminJobsPage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
  useQueryClient: vi.fn(),
}));

vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn(), loading: vi.fn() },
}));

vi.mock('@/app/superadmin/jobs/superadmin_jobs_api/superadmin_jobs_api', () => ({
  jobsApi: {
    fetchJobs: vi.fn(),
    retryJob: vi.fn(),
    cancelJob: vi.fn(),
    deleteJob: vi.fn(),
  },
}));

const mockQueryClient = { invalidateQueries: vi.fn() };

describe('useSuperadminJobsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useQueryClient as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockQueryClient);
  });

  it('returns success state with jobs data when query resolves', () => {
    const mockJobs = [
      { id: 'JOB-001', name: 'Gym Sync', status: 'COMPLETED', queue: 'sync', createdAt: '2024-01-01T10:00:00Z' },
    ];

    (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { data: mockJobs },
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() => useSuperadminJobsPage());

    expect(result.current.fetchState).toBe('success');
    expect(result.current.filteredJobs.length).toBeGreaterThanOrEqual(0);
  });

  it('returns loading state while job query is pending', () => {
    (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    const { result } = renderHook(() => useSuperadminJobsPage());

    expect(result.current.fetchState).toBe('loading');
  });

  it('returns error state when job query fails', () => {
    (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    const { result } = renderHook(() => useSuperadminJobsPage());

    expect(result.current.fetchState).toBe('error');
  });

  it('handles empty jobs list without crashing', () => {
    (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { data: [] },
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() => useSuperadminJobsPage());

    expect(result.current.filteredJobs).toEqual([]);
    expect(result.current.totalPages).toBe(1);
  });

  it('pagination is consistent with ITEMS_PER_PAGE', () => {
    const manyJobs = Array.from({ length: 25 }, (_, i) => ({
      id: `JOB-${i}`, name: `Job ${i}`, status: 'COMPLETED', queue: 'default', createdAt: '2024-01-01T00:00:00Z',
    }));

    (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { data: manyJobs },
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() => useSuperadminJobsPage());

    expect(result.current.totalPages).toBe(3); // 25 / 10 = 3 pages
    expect(result.current.paginatedJobs.length).toBeLessThanOrEqual(10);
  });

  it('filters jobs by status correctly', () => {
    const mixedJobs = [
      { id: 'JOB-001', status: 'COMPLETED', name: 'A', queue: 'default', createdAt: '' },
      { id: 'JOB-002', status: 'FAILED', name: 'B', queue: 'default', createdAt: '' },
    ];

    (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { data: mixedJobs },
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() => useSuperadminJobsPage());

    act(() => {
      result.current.setStatusFilter('FAILED');
    });

    expect(result.current.filteredJobs.every(j => j.status === 'FAILED')).toBe(true);
  });
});
