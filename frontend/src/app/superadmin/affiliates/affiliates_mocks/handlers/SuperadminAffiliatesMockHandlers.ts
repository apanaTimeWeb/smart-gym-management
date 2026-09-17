import { http, HttpResponse, delay } from 'msw';
import type { Affiliate } from '@/app/superadmin/affiliates/superadmin_affiliates_types/superadmin_affiliates_types';
import type { ApiResponse } from '@/lib/api';
import { MOCK_SUPERADMIN_AFFILIATES } from '@/app/superadmin/affiliates/affiliates_mocks/fixtures/SuperadminAffiliatesMockFixtures';
const BASE_URL = '*/api/v1/superadmin/affiliates';
let mockAffiliates: Affiliate[] = [...MOCK_SUPERADMIN_AFFILIATES];
export const superadminAffiliatesHandlers = [
    http.get(BASE_URL, async ({ request }) => {
        await delay(400);
        const url = new URL(request.url);
        const page = Number(url.searchParams.get('page')) || 1;
        const limit = Number(url.searchParams.get('limit')) || 10;
        const search = url.searchParams.get('search')?.toLowerCase() || '';
        const status = url.searchParams.get('status');
        let filtered = [...mockAffiliates];
        if (search) {
            filtered = filtered.filter(a => a.name?.toLowerCase().includes(search) ||
                a.email?.toLowerCase().includes(search) ||
                a.referralCode?.toLowerCase().includes(search));
        }
        if (status && status !== 'ALL') {
            filtered = filtered.filter(a => a.status === status);
        }
        const startDate = url.searchParams.get('startDate');
        const endDate = url.searchParams.get('endDate');
        if (startDate || endDate) {
            filtered = filtered.filter((affiliate) => {
                const joined = affiliate.joinedAt.slice(0, 10);
                return (!startDate || joined >= startDate) && (!endDate || joined <= endDate);
            });
        }
        const total = filtered.length;
        const paginated = filtered.slice((page - 1) * limit, page * limit);
        return HttpResponse.json<ApiResponse<Affiliate[]>>({
            success: true,
            message: 'Success',
            data: paginated,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
        });
    }),
    http.post(BASE_URL, async ({ request }) => {
        await delay(500);
        const body = await request.json() as Partial<Affiliate>;
        const newAffiliate: Affiliate = {
            ...body,
            id: `a${Date.now()}`,
            totalReferred: 0,
            commissionEarned: 0,
            pendingPayout: 0,
            status: 'ACTIVE',
            joinedAt: new Date().toISOString(),
            name: body.name || 'New Affiliate',
            email: body.email || '',
            phone: body.phone || '',
            referralCode: body.referralCode || `REF${Date.now()}`,
            commissionRate: body.commissionRate || 10,
            referralCount: 0,
            conversionRate: 0,
        };
        mockAffiliates = [newAffiliate, ...mockAffiliates];
        return HttpResponse.json<ApiResponse<Affiliate>>({
            success: true,
            message: 'Affiliate created successfully',
            data: newAffiliate,
        });
    }),
    http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
        await delay(500);
        const id = params.id as string;
        const body = await request.json() as Partial<Affiliate>;
        let updatedAffiliate: Affiliate | null = null;
        mockAffiliates = mockAffiliates.map(a => {
            if (a.id === id) {
                updatedAffiliate = { ...a, ...body };
                return updatedAffiliate;
            }
            return a;
        });
        if (!updatedAffiliate) {
            return HttpResponse.json<ApiResponse<Affiliate>>({ success: false, message: 'Not found', data: null }, { status: 404 });
        }
        return HttpResponse.json<ApiResponse<Affiliate>>({
            success: true,
            message: 'Affiliate updated',
            data: updatedAffiliate,
        });
    }),
    http.patch(`${BASE_URL}/:id/status`, async ({ params, request }) => {
        await delay(300);
        const id = params.id as string;
        const { status } = await request.json() as {
            status: Affiliate['status'];
        };
        let updatedAffiliate: Affiliate | null = null;
        mockAffiliates = mockAffiliates.map(a => {
            if (a.id === id) {
                updatedAffiliate = { ...a, status };
                return updatedAffiliate;
            }
            return a;
        });
        if (!updatedAffiliate) {
            return HttpResponse.json<ApiResponse<Affiliate>>({ success: false, message: 'Not found', data: null }, { status: 404 });
        }
        return HttpResponse.json<ApiResponse<Affiliate>>({
            success: true,
            message: 'Status updated',
            data: updatedAffiliate,
        });
    }),
    http.delete(`${BASE_URL}/:id`, async ({ params }) => {
        await delay(400);
        const id = params.id as string;
        mockAffiliates = mockAffiliates.filter(a => a.id !== id);
        return HttpResponse.json<ApiResponse<null>>({
            success: true,
            message: 'Deleted successfully',
            data: null,
        });
    }),
    http.post(`${BASE_URL}/:id/pay`, async ({ params }) => {
        await delay(600);
        const id = params.id as string;
        mockAffiliates = mockAffiliates.map(a => a.id === id ? { ...a, pendingPayout: 0, commissionEarned: a.commissionEarned + (a.pendingPayout || 0) } : a);
        return HttpResponse.json<ApiResponse<null>>({
            success: true,
            message: 'Commission paid successfully',
            data: null,
        });
    }),
];
