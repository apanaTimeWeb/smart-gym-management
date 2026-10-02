import { fetchGlobalAuditInvestigation } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_api/SuperadminGlobalAuditInvestigationApi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminGlobalAuditV1 } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_hooks/useSuperadminGlobalAuditV1';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_api/SuperadminGlobalAuditInvestigationApi', () => ({ fetchGlobalAuditInvestigation: vi.fn() }));
describe('useSuperadminGlobalAuditV1', () => {
  it('executes the hook query contract and reaches a successful query state', async () => {
    vi.mocked(fetchGlobalAuditInvestigation).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminGlobalAuditV1(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.isError).toBe(false);
  });
});
