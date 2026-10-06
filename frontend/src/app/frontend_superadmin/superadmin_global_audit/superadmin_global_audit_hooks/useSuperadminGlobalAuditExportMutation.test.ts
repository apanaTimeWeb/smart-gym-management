import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { superadminGlobalAuditExportApi } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_api/SuperadminGlobalAuditExportApi';
import { useSuperadminGlobalAuditExportMutation } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_hooks/useSuperadminGlobalAuditExportMutation';



vi.mock('@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_api/SuperadminGlobalAuditExportApi', () => ({ superadminGlobalAuditExportApi: { requestExport: vi.fn() } }));

describe('useSuperadminGlobalAuditExportMutation', () => {
  it('passes a stable idempotency key to the owning export API', async () => {
    vi.mocked(superadminGlobalAuditExportApi.requestExport).mockResolvedValue({ success: true, message: 'started' } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: React.ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminGlobalAuditExportMutation(), { wrapper });
    await act(async () => { await result.current.requestExport(); });
    expect(superadminGlobalAuditExportApi.requestExport).toHaveBeenCalledWith(expect.any(String));
  });
});
