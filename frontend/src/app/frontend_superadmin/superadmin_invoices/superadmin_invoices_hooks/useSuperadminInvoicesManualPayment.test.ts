import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { invoicesApi } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_api/SuperadminInvoicesApi';
import { useSuperadminInvoicesManualPayment } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_hooks/useSuperadminInvoicesManualPayment';



vi.mock('@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_api/SuperadminInvoicesApi', () => ({ invoicesApi: { createManualPayment: vi.fn() } }));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm: vi.fn().mockResolvedValue(true) }) }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminInvoicesManualPayment', () => {
  it('records the manual payment through the feature API and invalidates invoices', async () => {
    vi.mocked(invoicesApi.createManualPayment).mockResolvedValue({ success: true, message: 'Recorded', data: { id: 'INV-1' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const invalidate = vi.spyOn(client, 'invalidateQueries');
    const wrapper = ({ children }: { children: React.ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminInvoicesManualPayment(), { wrapper });
    await act(async () => { await result.current.handleLogManualPayment('GYM-1', 5000, 'PRO'); });
    expect(invoicesApi.createManualPayment).toHaveBeenCalledWith(expect.objectContaining({ gymId: 'GYM-1', amount: 5000, planName: 'PRO' }), expect.any(String));
    expect(invalidate).toHaveBeenCalled();
  });
});
