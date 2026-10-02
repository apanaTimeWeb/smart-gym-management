import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';
import { MOCK_SUPERADMIN_COUPONS } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_mocks/superadmin_coupons_mocks_fixtures/SuperadminCouponsMockFixtures';
import { SUPERADMIN_COUPON_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_constants/SuperadminCouponsConstants';
import { CouponStatusSchema, CouponSchema } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_schemas/SuperadminCouponsContractSchemas';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminCouponsMockHandlers owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: http-status-codes, msw, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_url_config, @/lib/api, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_mocks/superadmin_coupons_mocks_fixtures/SuperadminCouponsMockFixtures, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_utils/SuperadminCouponsDateUtils
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_url_config';
import { formatSuperadminCouponDateForInput } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_utils/SuperadminCouponsDateUtils';

import type { Coupon, RedemptionRecord } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes';
import type { ApiResponse } from '@/lib/api';


const BASE_URL = `*${MODULE_URLS.BACKEND_API.BASE}`;
let mockCoupons: Coupon[] = [...MOCK_SUPERADMIN_COUPONS];
export function resetSuperadminCouponsMockState(): void { mockCoupons = MOCK_SUPERADMIN_COUPONS.map((coupon) => ({ ...coupon, redemptions: coupon.redemptions ? [...coupon.redemptions] : [] })); }
export const superadminCouponsHandlers = [
    http.get(BASE_URL, async ({ request }) => {
        await delay(400);
        const url = new URL(request.url);
        const page = Number(url.searchParams.get('page')) || 1;
        const limit = Number(url.searchParams.get('limit')) || 20;
        const search = url.searchParams.get('search')?.toLowerCase() || '';
        const status = url.searchParams.get('status') ?? url.searchParams.get('statusFilter');
        let filtered = status === SUPERADMIN_COUPON_STATUS_CODES.DELETED ? mockCoupons.filter(c => c.isDeleted) : mockCoupons.filter(c => !c.isDeleted);
        if (search) {
            filtered = filtered.filter(c => c.code?.toLowerCase().includes(search) ||
                c.id?.toLowerCase().includes(search));
        }
        if (status && status !== SUPERADMIN_COUPON_STATUS_CODES.ALL && status !== SUPERADMIN_COUPON_STATUS_CODES.DELETED) {
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
        const raw = await request.json();
        const parsed = CouponSchema.safeParse(raw);
        if (!parsed.success) return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({ success: false, message: 'Invalid coupon payload', data: null }, { status: StatusCodes.BAD_REQUEST });
        const body = parsed.data;
        const newCoupon: Coupon = {
            ...body,
            id: `c${Date.now()}`,
            currentUses: 0,
            status: SUPERADMIN_COUPON_STATUS_CODES.ACTIVE,
            isDeleted: false,
            code: body.code || `NEW${Date.now()}`,
            discountType: body.discountType || 'PERCENTAGE',
            discountValue: body.discountValue || 10,
            maxUses: body.maxUses || 100,
            expiryDate: body.expiryDate || formatSuperadminCouponDateForInput(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()),
            redemptions: [],
        };
        mockCoupons = [newCoupon, ...mockCoupons];
        return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({
            success: true,
            message: 'Created',
            data: newCoupon,
        });
    }),
    http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
        await delay(500);
        const id = params.id as string;
        const raw = await request.json();
        const parsed = CouponSchema.partial().safeParse(raw);
        if (!parsed.success) return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({ success: false, message: 'Invalid coupon payload', data: null }, { status: StatusCodes.BAD_REQUEST });
        const body = parsed.data;
        let updated: Coupon | null = null;
        mockCoupons = mockCoupons.map(c => {
            if (c.id === id) {
                updated = { ...c, ...body };
                return updated;
            }
            return c;
        });
        if (!updated) {
            return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({ success: false, message: 'Not found', data: null }, { status: StatusCodes.NOT_FOUND });
        }
        return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({
            success: true,
            message: 'Updated',
            data: updated,
        });
    }),
    http.post(`${BASE_URL}/:id/restore`, async ({ params }) => {
        await delay(350);
        const id = String(params.id);
        let restored: Coupon | null = null;
        mockCoupons = mockCoupons.map((coupon) => coupon.id === id ? (restored = { ...coupon, isDeleted: false, status: coupon.status === SUPERADMIN_COUPON_STATUS_CODES.EXPIRED ? SUPERADMIN_COUPON_STATUS_CODES.ACTIVE : coupon.status }) : coupon);
        if (!restored) return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({ success: false, message: 'Not found', data: null }, { status: StatusCodes.NOT_FOUND });
        return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({ success: true, message: 'Coupon restored', data: restored });
    }),
    http.patch(`${BASE_URL}/:id/status`, async ({ params, request }) => {
        await delay(300);
        const id = String(params.id);
        const raw = await request.json();
        const statusResult = typeof raw === 'object' && raw !== null && 'status' in raw ? CouponStatusSchema.safeParse((raw as { status: unknown }).status) : { success: false } as const;
        if (!statusResult.success || (statusResult.data !== SUPERADMIN_COUPON_STATUS_CODES.ACTIVE && statusResult.data !== SUPERADMIN_COUPON_STATUS_CODES.INACTIVE)) return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({ success: false, message: 'Invalid coupon status', data: null }, { status: StatusCodes.BAD_REQUEST });
        let updated: Coupon | null = null;
        const nextStatus = statusResult.data;
        mockCoupons = mockCoupons.map((coupon) => coupon.id === id ? (updated = { ...coupon, status: nextStatus }) : coupon);
        if (!updated) return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({ success: false, message: 'Not found', data: null }, { status: StatusCodes.NOT_FOUND });
        return HttpResponse.json<ApiResponse<Coupon> | ApiResponse<null>>({ success: true, message: 'Coupon status updated', data: updated });
    }),
    http.get(`${BASE_URL}/:id/redemptions`, async ({ params }) => {
        await delay(250);
        const id = String(params.id);
        const coupon = mockCoupons.find((item) => item.id === id);
        if (!coupon) return HttpResponse.json<ApiResponse<RedemptionRecord[]> | ApiResponse<null>>({ success: false, message: 'Not found', data: null }, { status: StatusCodes.NOT_FOUND });
        return HttpResponse.json<ApiResponse<RedemptionRecord[]> | ApiResponse<null>>({ success: true, message: 'Coupon redemptions loaded', data: coupon.redemptions ?? [] });
    }),
    http.delete(`${BASE_URL}/:id`, async ({ params }) => {
        await delay(400);
        const id = params.id as string;
        let updated: Coupon | null = null;
        mockCoupons = mockCoupons.map((coupon) => coupon.id === id ? (updated = { ...coupon, isDeleted: true }) : coupon);
        if (!updated) return HttpResponse.json<ApiResponse<null>>({ success: false, message: 'Not found', data: null }, { status: StatusCodes.NOT_FOUND });
        return HttpResponse.json<ApiResponse<null>>({ success: true, message: 'Deleted', data: null });
    }),
];
