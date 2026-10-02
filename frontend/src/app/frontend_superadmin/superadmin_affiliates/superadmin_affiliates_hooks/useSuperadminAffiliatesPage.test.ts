import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { affiliatesApi } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_api/SuperadminAffiliatesApi';
import { SUPERADMIN_AFFILIATE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_constants/SuperadminAffiliatesConstants';
import { SUPERADMIN_AFFILIATES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_constants/SuperadminAffiliatesQueryKeys';
import { useSuperadminAffiliatesPage } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_hooks/useSuperadminAffiliatesPage';



let params: Record<string, string> = {};
const setParamMock = vi.fn();

vi.mock('next-intl', () => ({ useTranslations: vi.fn(() => (key: string) => key) }));
vi.mock('next/navigation', () => ({
    useRouter: vi.fn(() => ({ replace: vi.fn(), push: vi.fn() })),
    usePathname: vi.fn(() => '/superadmin/affiliates'),
    useSearchParams: vi.fn(() => new URLSearchParams()),
}));
vi.mock('@/hooks/useUrlState', () => ({
    useUrlState: vi.fn(() => ({
        getParam: (key: string, fallback: string) => params[key] ?? fallback,
        setParam: (key: string, value: string) => {
            params[key] = value;
            setParamMock(key, value);
        },
    })),
}));
vi.mock('@/hooks/useDebouncedValue', () => ({ useDebouncedValue: vi.fn((value: string) => value) }));
vi.mock('@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard', () => ({ useSuperadminLayoutUnsavedChangesGuard: vi.fn() }));
vi.mock('@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_hooks/useSuperadminAffiliatesMutations', () => ({
    useSuperadminAffiliatesMutations: vi.fn(() => ({
        isMutating: false,
        handleAddAffiliate: vi.fn(),
        handleEditAffiliate: vi.fn(),
        handleToggleAffiliateStatus: vi.fn(),
        handleDeleteAffiliate: vi.fn(),
        handlePayCommission: vi.fn(),
    })),
}));
vi.mock('@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_api/SuperadminAffiliatesApi', () => ({
    affiliatesApi: {
        fetchAffiliates: vi.fn(),
        fetchPayoutHistory: vi.fn(),
    },
}));

function createWrapper() {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    return function Wrapper({ children }: { children: React.ReactNode }) {
        return createElement(QueryClientProvider, { client: queryClient }, children);
    };
}

describe('useSuperadminAffiliatesPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        params = {};
        vi.mocked(affiliatesApi.fetchAffiliates).mockResolvedValue({
            success: true,
            message: 'Affiliates loaded',
            data: [{ id: 'AFF-001', name: 'Fitness Partner Co', status: SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE, commissionEarned: 1000, email: 'a@example.com', referralCode: 'FIT100' }],
            meta: { total: 1 },
        } as never);
        vi.mocked(affiliatesApi.fetchPayoutHistory).mockResolvedValue({ success: true, message: 'Payouts loaded', data: [] } as never);
    });

    it('loads affiliate and payout data through the real QueryClient path', async () => {
        const { result } = renderHook(() => useSuperadminAffiliatesPage(), { wrapper: createWrapper() });
        await waitFor(() => expect(result.current.status).toBe('success'));
        expect(result.current.affiliates).toHaveLength(1);
        expect(result.current.payoutHistory).toEqual([]);
        expect(result.current.totalCommission).toBe(1000);
    });

    it('builds the documented query key from active URL filters', async () => {
        params = { search: 'fitness', status: SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE, page: '2', limit: '10' };
        const { result } = renderHook(() => useSuperadminAffiliatesPage(), { wrapper: createWrapper() });
        await waitFor(() => expect(result.current.status).toBe('success'));
        expect(vi.mocked(affiliatesApi.fetchAffiliates)).toHaveBeenCalledWith({
            search: 'fitness',
            status: SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE,
            page: '2',
            limit: '10',
        });
        expect(SUPERADMIN_AFFILIATES_QUERY_KEYS.list({ search: 'fitness', status: SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE, page: '2', limit: '10' })).toEqual([
            'superadmin_affiliates',
            'list',
            { search: 'fitness', status: SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE, page: '2', limit: '10' },
        ]);
    });

    it('surfaces API errors as query error state', async () => {
        vi.mocked(affiliatesApi.fetchAffiliates).mockRejectedValueOnce(new Error('affiliate-api-failed'));
        const { result } = renderHook(() => useSuperadminAffiliatesPage(), { wrapper: createWrapper() });
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.affiliates).toEqual([]);
    });
});
