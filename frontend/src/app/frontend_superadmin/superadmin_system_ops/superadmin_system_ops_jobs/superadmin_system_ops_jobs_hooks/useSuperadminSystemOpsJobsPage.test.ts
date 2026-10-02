import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { jobsApi } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi';
import { SUPERADMIN_JOBS_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_constants/SuperadminSystemOpsJobsConstants';
import { SUPERADMIN_JOBS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_constants/SuperadminSystemOpsJobsQueryKeys';
import { useSuperadminSystemOpsJobsPage } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_hooks/useSuperadminSystemOpsJobsPage';



const setParamMock = vi.fn();
let currentParams: Record<string, string> = {};

vi.mock('@/hooks/useUrlState', () => ({
    useUrlState: vi.fn(() => ({
        getParam: (key: string, fallback: string) => currentParams[key] ?? fallback,
        setParam: (key: string, value: string) => {
            currentParams[key] = value;
            setParamMock(key, value);
        },
    })),
}));

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(() => ({ replace: vi.fn(), push: vi.fn() })),
    usePathname: vi.fn(() => '/superadmin/system-ops/jobs'),
    useSearchParams: vi.fn(() => new URLSearchParams()),
}));

vi.mock('@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi', () => ({
    jobsApi: {
        fetchJobs: vi.fn(),
        retryJob: vi.fn(),
        cancelJob: vi.fn(),
        deleteJob: vi.fn(),
    },
}));

vi.mock('@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_hooks/useSuperadminSystemOpsJobsMutations', () => ({
    useSuperadminSystemOpsJobsMutations: vi.fn(() => ({
        isMutating: false,
        retryJob: vi.fn(),
        cancelJob: vi.fn(),
        deleteJob: vi.fn(),
    })),
}));

vi.mock('@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_hooks/useSuperadminSystemOpsJobsSelection', () => ({
    useSuperadminSystemOpsJobsSelection: vi.fn(() => ({
        selectedJobIds: [],
        setSelectedJobIds: vi.fn(),
        inspectJob: null,
        setInspectJob: vi.fn(),
        toggleSelection: vi.fn(),
        toggleAll: vi.fn(),
    })),
}));

function createWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return function Wrapper({ children }: { children: React.ReactNode }) {
        return createElement(QueryClientProvider, { client: queryClient }, children);
    };
}

const jobsResponse = {
    success: true,
    message: 'Jobs loaded',
    data: [
        { id: 'JOB-001', name: 'Sync', status: SUPERADMIN_JOBS_STATUS_CODES.COMPLETED, queue: 'default', createdAt: '2026-01-01T00:00:00Z' },
        { id: 'JOB-002', name: 'Failure', status: SUPERADMIN_JOBS_STATUS_CODES.FAILED, queue: 'default', createdAt: '2026-01-01T00:00:00Z' },
    ],
    meta: { total: 2 },
};

describe('useSuperadminSystemOpsJobsPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        currentParams = {};
        vi.mocked(jobsApi.fetchJobs).mockResolvedValue(jobsResponse as never);
    });

    it('loads jobs through the real QueryClient path and computes metrics', async () => {
        const { result } = renderHook(() => useSuperadminSystemOpsJobsPage(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isPending).toBe(false));

        expect(jobsApi.fetchJobs).toHaveBeenCalledWith({ page: '1', limit: '10' });
        expect(result.current.filteredJobs).toHaveLength(2);
        expect(result.current.metrics.completed24h).toBe(1);
        expect(result.current.metrics.failed24h).toBe(1);
        expect(result.current.totalPages).toBe(1);
    });

    it('propagates server-side status filtering into URL state and the next request', async () => {
        const { result, rerender } = renderHook(() => useSuperadminSystemOpsJobsPage(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isPending).toBe(false));

        act(() => result.current.setStatusFilter(SUPERADMIN_JOBS_STATUS_CODES.FAILED));

        expect(setParamMock).toHaveBeenCalledWith('statusFilter', SUPERADMIN_JOBS_STATUS_CODES.FAILED);
        expect(setParamMock).toHaveBeenCalledWith('page', '1');

        rerender();
        await waitFor(() => expect(jobsApi.fetchJobs).toHaveBeenCalledWith({
            page: '1',
            limit: '10',
            status: SUPERADMIN_JOBS_STATUS_CODES.FAILED,
        }));
    });

    it('propagates queue filtering into the API request', async () => {
        const { result, rerender } = renderHook(() => useSuperadminSystemOpsJobsPage(), { wrapper: createWrapper() });
        await waitFor(() => expect(result.current.isPending).toBe(false));

        act(() => result.current.setQueueFilter('critical'));
        expect(setParamMock).toHaveBeenCalledWith('queueFilter', 'critical');

        rerender();
        await waitFor(() => expect(jobsApi.fetchJobs).toHaveBeenCalledWith({
            page: '1',
            limit: '10',
            queue: 'critical',
        }));
    });

    it('surfaces query errors instead of fabricating an empty-success state', async () => {
        vi.mocked(jobsApi.fetchJobs).mockRejectedValueOnce(new Error('jobs-api-failed'));
        const { result } = renderHook(() => useSuperadminSystemOpsJobsPage(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.filteredJobs).toEqual([]);
    });

    it('keeps the query key resource shape stable for server-side filters', async () => {
        const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
        const Wrapper = ({ children }: { children: React.ReactNode }) => createElement(QueryClientProvider, { client: queryClient }, children);
        const { result } = renderHook(() => useSuperadminSystemOpsJobsPage(), { wrapper: Wrapper });
        await waitFor(() => expect(result.current.isPending).toBe(false));

        expect(SUPERADMIN_JOBS_QUERY_KEYS.list({ page: '1', limit: '10' })).toEqual([
            'superadmin_system_ops_jobs',
            'list',
            { page: '1', limit: '10' },
        ]);
    });
});
