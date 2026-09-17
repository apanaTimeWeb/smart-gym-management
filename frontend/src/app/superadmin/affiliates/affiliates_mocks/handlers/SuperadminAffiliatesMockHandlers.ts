import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';
import type { Affiliate } from '@/app/superadmin/affiliates/superadmin_affiliates_types/superadmin_affiliates_types';
import type { ApiResponse } from '@/lib/api';
const BASE_URL = '*/api/v1/superadmin/affiliates';

let mockAffiliates: Affiliate[] = [
  {
    id: 'a1', name: 'John Doe', email: 'john@influencer.com', phone: '9876543210',
    referralCode: 'JOHN50', totalReferred: 25, commissionEarned: 15000,
    commissionRate: 15, pendingPayout: 5000, bankDetails: 'HDFC Bank - 1234',
    status: 'ACTIVE', joinedAt: '2026-01-15', referralCount: 120, conversionRate: 20.8
  },
  {
    id: 'a2', name: 'Fit Channel', email: 'hello@fitchannel.com', phone: '9876543211',
    referralCode: 'FIT100', totalReferred: 150, commissionEarned: 120000,
    commissionRate: 20, pendingPayout: 0, bankDetails: 'SBI - 5678',
    status: 'ACTIVE', joinedAt: '2026-04-10', referralCount: 500, conversionRate: 30.0
  },
  {
    id: 'a3', name: 'Jane Smith', email: 'jane@blogger.com', phone: '9876543212',
    referralCode: 'JANE25', totalReferred: 0, commissionEarned: 0,
    commissionRate: 10, pendingPayout: 0, bankDetails: 'ICICI - 9012',
    status: 'INACTIVE', joinedAt: '2026-09-01', referralCount: 10, conversionRate: 0.0
  },
  { id: 'a4', name: 'Coach Riya', email: 'riya@coachhub.in', phone: '9876543213', referralCode: 'RIYA20', totalReferred: 40, commissionEarned: 26000, commissionRate: 15, pendingPayout: 8000, bankDetails: 'Axis Bank - 3456', status: 'ACTIVE', joinedAt: '2026-09-03', referralCount: 180, conversionRate: 22.2 },
  { id: 'a5', name: 'Gym Growth Media', email: 'growth@gymmedia.in', phone: '9876543214', referralCode: 'GROW25', totalReferred: 75, commissionEarned: 54000, commissionRate: 18, pendingPayout: 12000, bankDetails: 'ICICI - 7788', status: 'ACTIVE', joinedAt: '2026-08-21', referralCount: 300, conversionRate: 25.0 },
  { id: 'a6', name: 'Wellness Blogger', email: 'wellness@blogger.in', phone: '9876543215', referralCode: 'WELL10', totalReferred: 12, commissionEarned: 6000, commissionRate: 10, pendingPayout: 1500, bankDetails: 'HDFC - 9900', status: 'INACTIVE', joinedAt: '2026-08-10', referralCount: 80, conversionRate: 15.0 },
  { id: 'a7', name: 'Fit Influencer Network', email: 'network@fitinfluencers.in', phone: '9876543216', referralCode: 'FITNET30', totalReferred: 110, commissionEarned: 88000, commissionRate: 20, pendingPayout: 0, bankDetails: 'SBI - 2233', status: 'ACTIVE', joinedAt: '2026-09-06', referralCount: 420, conversionRate: 26.2 },
  { id: 'a8', name: 'Local Fitness Guide', email: 'guide@fitnesslocal.in', phone: '9876543217', referralCode: 'GUIDE15', totalReferred: 18, commissionEarned: 9000, commissionRate: 12, pendingPayout: 2500, bankDetails: 'Kotak - 4455', status: 'INACTIVE', joinedAt: '2026-08-05', referralCount: 95, conversionRate: 18.9 },

];

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
      filtered = filtered.filter(
        a => a.name?.toLowerCase().includes(search) ||
             a.email?.toLowerCase().includes(search) ||
             a.referralCode?.toLowerCase().includes(search)
      );
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
      return HttpResponse.json<ApiResponse<Affiliate>>({ success: false, message: 'Not found', data: null }, { status: StatusCodes.NOT_FOUND });
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
    const { status } = await request.json() as { status: Affiliate['status'] };
    
    let updatedAffiliate: Affiliate | null = null;
    mockAffiliates = mockAffiliates.map(a => {
      if (a.id === id) {
        updatedAffiliate = { ...a, status };
        return updatedAffiliate;
      }
      return a;
    });

    if (!updatedAffiliate) {
      return HttpResponse.json<ApiResponse<Affiliate>>({ success: false, message: 'Not found', data: null }, { status: StatusCodes.NOT_FOUND });
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
    mockAffiliates = mockAffiliates.map(a => 
      a.id === id ? { ...a, pendingPayout: 0, commissionEarned: a.commissionEarned + (a.pendingPayout || 0) } : a
    );
    return HttpResponse.json<ApiResponse<null>>({
      success: true,
      message: 'Commission paid successfully',
      data: null,
    });
  }),
];
