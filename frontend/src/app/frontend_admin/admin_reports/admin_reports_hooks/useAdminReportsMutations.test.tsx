import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminReportsApi } from '@/app/frontend_admin/admin_reports/admin_reports_api/AdminReportsApi';
import { useAdminReportsMutations } from '@/app/frontend_admin/admin_reports/admin_reports_hooks/useAdminReportsMutations';

vi.mock('@/app/frontend_admin/admin_reports/admin_reports_api/AdminReportsApi', () => ({
  AdminReportsApi: {
    exportReport: vi.fn().mockResolvedValue({ message: 'ok' })
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminReportsMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('executes the mutation through the module API boundary', async () => {
    const { result } = renderHook(() => useAdminReportsMutations(), { wrapper });
    await act(async () => { await result.current.exportMutation.mutateAsync({ id: 'id-1', payload: {}, data: {}, planId: 'plan-1', planName: 'Pro', intentId: 'intent-1', permission: 'view', enabled: true, idempotencyKey: 'idem-1' } as never); });
    await waitFor(() => expect(AdminReportsApi.exportReport).toHaveBeenCalled());
  });
});
