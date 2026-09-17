import { http, HttpResponse, delay } from 'msw';
import type { Coupon } from '@/app/superadmin/coupons/superadmin_coupons_types/superadmin_coupons_types';
import type { ApiResponse } from '@/lib/api';
import { MOCK_SUPERADMIN_COUPONS } from '@/app/superadmin/coupons/coupons_mocks/fixtures/SuperadminCouponsMockFixtures';
const BASE_URL = '*/api/v1/superadmin/coupons';
let mockCoupons: Coupon[] = [...MOCK_SUPERADMIN_COUPONS];
export const superadminCouponsHandlers = [
    http.get(BASE_URL, async ({ request }) => {
        await delay(400);
        const url = new URL(request.url);
        const page = Number(url.searchParams.get('page')) || 1;
        const limit = Number(url.searchParams.get('limit')) || 20;
        const search = url.searchParams.get('search')?.toLowerCase() || '';
        const status = url.searchParams.get('statusFilter');
        let filtered = mockCoupons.filter(c => !c.isDeleted);
        if (search) {
            filtered = filtered.filter(c => c.code?.toLowerCase().includes(search) ||
                c.id?.toLowerCase().includes(search));
        }
        if (status && status !== 'ALL') {
            filtered = filtered.filter(c => c.status === status);
        }
        const total = filtered.length;
        const paginated = filtered.slice((page - 1) * limit, page * limit);
        return HttpResponse.json<ApiResponse<Coupon[]>>({
            success: true,
            message: 'Success',
            data: paginated,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
        });
    }),
    http.post(BASE_URL, async ({ request }) => {
        await delay(500);
        const body = await request.json() as Partial<Coupon>;
        const newCoupon: Coupon = {
            ...body,
            id: `c${Date.now()}`,
            currentUses: 0,
            status: 'ACTIVE',
            isDeleted: false,
            code: body.code || `NEW${Date.now()}`,
            discountType: body.discountType || 'PERCENTAGE',
            discountValue: body.discountValue || 10,
            maxUses: body.maxUses || 100,
            expiryDate: body.expiryDate || (new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] as string),
        };
        mockCoupons = [newCoupon, ...mockCoupons];
        return HttpResponse.json<ApiResponse<Coupon>>({
            success: true,
            message: 'Created',
            data: newCoupon,
        });
    }),
    http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
        await delay(500);
        const id = params.id as string;
        const body = await request.json() as Partial<Coupon>;
        let updated: Coupon | null = null;
        mockCoupons = mockCoupons.map(c => {
            if (c.id === id) {
                updated = { ...c, ...body };
                return updated;
            }
            return c;
        });
        if (!updated) {
            return HttpResponse.json<ApiResponse<Coupon>>({ success: false, message: 'Not found', data: null }, { status: 404 });
        }
        return HttpResponse.json<ApiResponse<Coupon>>({
            success: true,
            message: 'Updated',
            data: updated,
        });
    }),
    http.delete(`${BASE_URL}/:id`, async ({ params }) => {
        await delay(400);
        const id = params.id as string;
        mockCoupons = mockCoupons.filter(c => c.id !== id);
        return HttpResponse.json<ApiResponse<null>>({
            success: true,
            message: 'Deleted',
            data: null,
        });
    }),
];
