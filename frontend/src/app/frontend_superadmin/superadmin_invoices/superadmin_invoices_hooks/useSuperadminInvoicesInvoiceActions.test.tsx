import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { invoicesApi } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_api/SuperadminInvoicesApi';
import { useSuperadminInvoicesInvoiceActions } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_hooks/useSuperadminInvoicesInvoiceActions';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_api/SuperadminInvoicesApi', () => ({ invoicesApi: { exportInvoiceReport: vi.fn(), fetchInvoiceDownloadUrl: vi.fn(), resendInvoiceEmail: vi.fn() } }));

describe('useSuperadminInvoicesInvoiceActions', () => {
  it('exports a report only after the feature API returns a download URL', async () => {
    vi.mocked(invoicesApi.exportInvoiceReport).mockResolvedValue({ success: true, message: 'Ready', data: { downloadUrl: 'https://example.test/export.csv' } } as never);
    const windowOpen = vi.fn();
    Object.defineProperty(globalThis, 'window', { value: { open: windowOpen }, configurable: true });
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminInvoicesInvoiceActions(), { wrapper });
    await result.current.exportInvoices({ period: 'current' });
    expect(invoicesApi.exportInvoiceReport).toHaveBeenCalledWith({ period: 'current' });
    expect(windowOpen).toHaveBeenCalledWith('https://example.test/export.csv', '_blank');
  });
});
