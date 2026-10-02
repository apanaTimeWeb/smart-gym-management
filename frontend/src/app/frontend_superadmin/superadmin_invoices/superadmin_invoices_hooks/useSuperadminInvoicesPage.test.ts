import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { invoicesApi } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_api/SuperadminInvoicesApi';
import { SUPERADMIN_INVOICE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_constants/SuperadminInvoicesConstants';
import { SUPERADMIN_INVOICES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_constants/SuperadminInvoicesQueryKeys';
import { useSuperadminInvoicesPage } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_hooks/useSuperadminInvoicesPage';



vi.mock('next/navigation', () => ({
    useRouter: vi.fn(() => ({ replace: vi.fn(), push: vi.fn() })),
    usePathname: vi.fn(() => '/superadmin/saas-billing/invoices'),
    useSearchParams: vi.fn(() => new URLSearchParams()),
}));

vi.mock('@/hooks/useUrlState', () => ({
    useUrlState: vi.fn(() => ({
        getParam: (_key: string, fallback: string) => fallback,
        setParam: vi.fn(),
    })),
}));

vi.mock('@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_hooks/useSuperadminInvoicesManualPayment', () => ({
    useSuperadminInvoicesManualPayment: vi.fn(() => ({
        isLoggingPayment: false,
        handleLogManualPayment: vi.fn(),
    })),
}));

vi.mock('@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_api/SuperadminInvoicesApi', () => ({
    invoicesApi: {
        fetchInvoices: vi.fn(),
        fetchTenants: vi.fn(),
    },
}));

const invoicesResponse = {
    success: true,
    message: 'Invoices loaded',
    data: [
        { id: 'INV-001', gymName: 'Gold Gym', amount: 5000, status: SUPERADMIN_INVOICE_STATUS_CODES.PAID },
        { id: 'INV-002', gymName: 'Blue Gym', amount: 3000, status: SUPERADMIN_INVOICE_STATUS_CODES.PENDING },
        { id: 'INV-003', gymName: 'Green Gym', amount: 2000, status: SUPERADMIN_INVOICE_STATUS_CODES.PAID },
    ],
    meta: { total: 3 },
};

const tenantsResponse = {
    success: true,
    message: 'Tenants loaded',
    data: [
        { id: 'gym-001', name: 'Gold Gym' },
        { id: 'gym-002', name: 'Blue Gym' },
    ],
};

function createWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    });

    return function Wrapper({ children }: { children: React.ReactNode }) {
        return createElement(QueryClientProvider, { client: queryClient }, children);
    };
}

describe('useSuperadminInvoicesPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(invoicesApi.fetchInvoices).mockResolvedValue(invoicesResponse as never);
        vi.mocked(invoicesApi.fetchTenants).mockResolvedValue(tenantsResponse as never);
    });

    it('loads invoices through the real TanStack Query path and exposes server data', async () => {
        const { result } = renderHook(() => useSuperadminInvoicesPage(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isPending).toBe(false));

        expect(invoicesApi.fetchInvoices).toHaveBeenCalledWith({ page: '1', limit: '10' });
        expect(result.current.invoices).toEqual(invoicesResponse.data);
        expect(result.current.total).toBe(3);
    });

    it('preserves the feature query-key contract in the actual QueryClient cache', async () => {
        const wrapper = createWrapper();
        const { result } = renderHook(() => useSuperadminInvoicesPage(), { wrapper });

        await waitFor(() => expect(result.current.isPending).toBe(false));

        const queryKey = SUPERADMIN_INVOICES_QUERY_KEYS.list({ page: '1', limit: '10' });
        expect(invoicesApi.fetchInvoices).toHaveBeenCalledTimes(1);
        expect(queryKey).toEqual(['superadmin_invoices', 'list', { page: '1', limit: '10' }]);
    });

    it('calculates derived revenue metrics from the API response', async () => {
        const { result } = renderHook(() => useSuperadminInvoicesPage(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.totalRevenue).toBe(7000));

        expect(result.current.failedRevenue).toBe(0);
        expect(result.current.pendingRevenue).toBe(3000);
        expect(result.current.overdueCount).toBe(0);
    });

    it('surfaces a failed invoice request through the hook error state', async () => {
        vi.mocked(invoicesApi.fetchInvoices).mockRejectedValueOnce(new Error('invoice-api-failed'));

        const { result } = renderHook(() => useSuperadminInvoicesPage(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isError).toBe(true));

        expect(result.current.error).toBe('invoice-api-failed');
        expect(result.current.invoices).toEqual([]);
    });

    it('handles an empty server response without creating fake fallback rows', async () => {
        vi.mocked(invoicesApi.fetchInvoices).mockResolvedValueOnce({
            ...invoicesResponse,
            data: [],
            meta: { total: 0 },
        } as never);

        const { result } = renderHook(() => useSuperadminInvoicesPage(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isPending).toBe(false));

        expect(result.current.invoices).toEqual([]);
        expect(result.current.filteredInvoices).toEqual([]);
        expect(result.current.total).toBe(0);
    });
});
