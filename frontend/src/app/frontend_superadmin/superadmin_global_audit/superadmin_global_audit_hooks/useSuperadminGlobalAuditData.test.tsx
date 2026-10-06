import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { auditLogsApi } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_api/SuperadminGlobalAuditApi';
import { SUPERADMIN_AUDIT_FILTER_ALL } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_constants/SuperadminGlobalAuditConstants';
import { useSuperadminGlobalAuditData } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_hooks/useSuperadminGlobalAuditData';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_api/SuperadminGlobalAuditApi', () => ({ auditLogsApi: { fetchGlobalLogs: vi.fn() } }));

describe('useSuperadminGlobalAuditData', () => {
  it('builds explicit server-side params and computes total pages from API metadata', async () => {
    vi.mocked(auditLogsApi.fetchGlobalLogs).mockResolvedValue({ success: true, message: 'Loaded', data: [{ id: 'log-1' }], meta: { total: 41 } } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminGlobalAuditData('search', SUPERADMIN_AUDIT_FILTER_ALL, SUPERADMIN_AUDIT_FILTER_ALL, 2, 20), { wrapper });
    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(auditLogsApi.fetchGlobalLogs).toHaveBeenCalledWith({ page: '2', limit: '20', search: 'search' });
    expect(result.current.totalPages).toBe(3);
    expect(result.current.logs).toHaveLength(1);
  });
});
