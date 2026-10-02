import { fetchInvoiceRecoveryCenter } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_api/SuperadminInvoicesRecoveryCenterApi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminInvoicesV1 } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_hooks/useSuperadminInvoicesV1';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_api/SuperadminInvoicesRecoveryCenterApi', () => ({ fetchInvoiceRecoveryCenter: vi.fn() }));
describe('useSuperadminInvoicesV1', () => {
  it('executes the hook query contract and reaches a successful query state', async () => {
    vi.mocked(fetchInvoiceRecoveryCenter).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminInvoicesV1(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.isError).toBe(false);
  });
});
