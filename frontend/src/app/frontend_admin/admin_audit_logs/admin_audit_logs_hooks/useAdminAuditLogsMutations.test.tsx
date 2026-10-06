import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminAuditLogsApi } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_api/AdminAuditLogsApi';
import { useAdminAuditLogsMutations } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_hooks/useAdminAuditLogsMutations';

vi.mock('@/app/frontend_admin/admin_audit_logs/admin_audit_logs_api/AdminAuditLogsApi', () => ({
  AdminAuditLogsApi: {
    exportAuditLogs: vi.fn().mockResolvedValue({ message: 'ok' })
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminAuditLogsMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('executes the mutation through the module API boundary', async () => {
    const { result } = renderHook(() => useAdminAuditLogsMutations(), { wrapper });
    await act(async () => { await result.current.exportMutation.mutateAsync({ id: 'id-1', payload: {}, data: {}, planId: 'plan-1', planName: 'Pro', intentId: 'intent-1', permission: 'view', enabled: true, idempotencyKey: 'idem-1' } as never); });
    await waitFor(() => expect(AdminAuditLogsApi.exportAuditLogs).toHaveBeenCalled());
  });
});
