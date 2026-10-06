import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { jobsApi } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi';
import { useSuperadminSystemOpsJobsMutations } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_hooks/useSuperadminSystemOpsJobsMutations';

import type { ReactNode } from 'react';



const confirm = vi.fn().mockResolvedValue(true);
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm }) }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock('@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs/superadmin_system_ops_jobs_api/SuperadminSystemOpsJobsApi', () => ({ jobsApi: { retryJob: vi.fn(), retryAllJobs: vi.fn(), cancelJob: vi.fn(), deleteJob: vi.fn(), clearCompletedJobs: vi.fn(), bulkRetryJobs: vi.fn(), bulkDeleteJobs: vi.fn() } }));

describe('useSuperadminSystemOpsJobsMutations', () => {
  it('reuses one intent key for repeated retry attempts of the same job', async () => {
    vi.mocked(jobsApi.retryJob).mockResolvedValue({ success: true, message: 'Retried', data: null } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminSystemOpsJobsMutations({ selectedJobIds: new Set(), setSelectedJobIds: vi.fn() }), { wrapper });
    await act(async () => { await result.current.handleRetryJob('job-1'); await result.current.handleRetryJob('job-1'); });
    await waitFor(() => expect(jobsApi.retryJob).toHaveBeenCalledTimes(2));
    expect(vi.mocked(jobsApi.retryJob).mock.calls[0]?.[1]).toBe(vi.mocked(jobsApi.retryJob).mock.calls[1]?.[1]);
  });
});
