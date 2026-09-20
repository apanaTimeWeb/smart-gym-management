// RESPONSIBILITY: Owns MSW handlers for Superadmin affiliate list and mutation contracts.
import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';
import { AffiliateSchema } from '@/app/superadmin/affiliates/affiliates_types/SuperadminAffiliatesTypes';
import type { Affiliate } from '@/app/superadmin/affiliates/affiliates_types/SuperadminAffiliatesTypes';
import type { AffiliatePayoutRecord } from '@/app/superadmin/affiliates/affiliates_types/SuperadminAffiliatesTypes';
import type { ApiResponse } from '@/lib/api';
import { MOCK_SUPERADMIN_AFFILIATES } from '@/app/superadmin/affiliates/affiliates_mocks/fixtures/SuperadminAffiliatesMockFixtures';
import { MOCK_SUPERADMIN_AFFILIATE_PAYOUT_HISTORY } from '@/app/superadmin/affiliates/affiliates_mocks/fixtures/SuperadminAffiliatesPayoutHistoryMockFixtures';
import { AffiliatesUrlConfig } from '@/app/superadmin/affiliates/superadmin_affiliates_url_config';

const BASE_URL = `*${AffiliatesUrlConfig.BACKEND_API.BASE}`;
let mockAffiliates: Affiliate[] = [...MOCK_SUPERADMIN_AFFILIATES];

export function resetSuperadminAffiliatesMockState(): void {
  mockAffiliates = [...MOCK_SUPERADMIN_AFFILIATES];
}

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
      filtered = filtered.filter((affiliate) => affiliate.name.toLowerCase().includes(search) || affiliate.email.toLowerCase().includes(search) || affiliate.referralCode.toLowerCase().includes(search));
    }
    if (status && status !== 'ALL') filtered = filtered.filter((affiliate) => affiliate.status === status);
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
    return HttpResponse.json<ApiResponse<Affiliate[]>>({ success: true, message: 'Success', data: paginated, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } });
  }),
  http.post(BASE_URL, async ({ request }) => {
    await delay(500);
    const raw = await request.json();
    const parsed = AffiliateSchema.safeParse(raw);
    if (!parsed.success) return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: false, message: 'Invalid affiliate payload', data: null }, { status: StatusCodes.BAD_REQUEST });
    const newAffiliate: Affiliate = {
      ...parsed.data,
      id: `a${Date.now()}`,
      totalReferred: 0,
      commissionEarned: 0,
      pendingPayout: 0,
      status: 'ACTIVE',
      joinedAt: new Date().toISOString(),
      phone: '',
      commissionRate: 10,
      referralCount: 0,
      conversionRate: 0,
    };
    mockAffiliates = [newAffiliate, ...mockAffiliates];
    return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: true, message: 'Affiliate created successfully', data: newAffiliate });
  }),
  http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
    await delay(500);
    const raw = await request.json();
    if (typeof raw !== 'object' || raw === null) return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: false, message: 'Invalid affiliate payload', data: null }, { status: StatusCodes.BAD_REQUEST });
    const parsed = AffiliateSchema.partial().safeParse(raw);
    if (!parsed.success) return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: false, message: 'Invalid affiliate payload', data: null }, { status: StatusCodes.BAD_REQUEST });
    const id = String(params.id);
    let updatedAffiliate: Affiliate | null = null;
    mockAffiliates = mockAffiliates.map((affiliate) => affiliate.id === id ? (updatedAffiliate = { ...affiliate, ...parsed.data }) : affiliate);
    if (!updatedAffiliate) return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: false, message: 'Not found', data: null }, { status: StatusCodes.NOT_FOUND });
    return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: true, message: 'Affiliate updated', data: updatedAffiliate });
  }),
  http.patch(`${BASE_URL}/:id/status`, async ({ params, request }) => {
    await delay(300);
    const raw = await request.json();
    if (typeof raw !== 'object' || raw === null || !('status' in raw)) return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: false, message: 'Invalid status payload', data: null }, { status: StatusCodes.BAD_REQUEST });
    const status = (raw as { status: unknown }).status;
    if (status !== 'ACTIVE' && status !== 'INACTIVE') return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: false, message: 'Invalid status', data: null }, { status: StatusCodes.BAD_REQUEST });
    const id = String(params.id);
    let updatedAffiliate: Affiliate | null = null;
    mockAffiliates = mockAffiliates.map((affiliate) => affiliate.id === id ? (updatedAffiliate = { ...affiliate, status }) : affiliate);
    if (!updatedAffiliate) return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: false, message: 'Not found', data: null }, { status: StatusCodes.NOT_FOUND });
    return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: true, message: 'Status updated', data: updatedAffiliate });
  }),
  http.delete(`${BASE_URL}/:id`, async ({ params }) => {
    await delay(400);
    const id = String(params.id);
    const exists = mockAffiliates.some((affiliate) => affiliate.id === id);
    if (!exists) return HttpResponse.json<ApiResponse<null>>({ success: false, message: 'Not found', data: null }, { status: StatusCodes.NOT_FOUND });
    mockAffiliates = mockAffiliates.filter((affiliate) => affiliate.id !== id);
    return HttpResponse.json<ApiResponse<null>>({ success: true, message: 'Deleted successfully', data: null });
  }),
  http.post(`${BASE_URL}/:id/pay`, async ({ params }) => {
    await delay(600);
    const id = String(params.id);
    let updatedAffiliate: Affiliate | null = null;
    mockAffiliates = mockAffiliates.map((affiliate) => affiliate.id === id ? (updatedAffiliate = { ...affiliate, pendingPayout: 0 }) : affiliate);
    if (!updatedAffiliate) return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: false, message: 'Not found', data: null }, { status: StatusCodes.NOT_FOUND });
    return HttpResponse.json<ApiResponse<Affiliate> | ApiResponse<null>>({ success: true, message: 'Commission paid successfully', data: updatedAffiliate });
  }),
  http.get(`${BASE_URL}/payout-history`, async () => {
    await delay(300);
    return HttpResponse.json<ApiResponse<AffiliatePayoutRecord[]>>({ success: true, message: 'Affiliate payout history loaded', data: MOCK_SUPERADMIN_AFFILIATE_PAYOUT_HISTORY });
  }),
];
