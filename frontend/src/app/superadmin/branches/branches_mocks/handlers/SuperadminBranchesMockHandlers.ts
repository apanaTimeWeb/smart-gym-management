import { http, HttpResponse, delay } from 'msw';
import type { SuperadminBranch } from '@/app/superadmin/branches/branches_types/superadmin_branches_types';
import type { ApiResponse } from '@/lib/api';

const BASE_URL = '*/api/v1/superadmin/branches';

let mockBranches: SuperadminBranch[] = [
  {
    id: 'b1', tenantId: 't1', tenantName: 'Iron Paradise', branchName: 'Downtown Main',
    location: 'Downtown', city: 'Mumbai', state: 'MH', managerName: 'Alice', managerEmail: 'alice@iron.com',
    phone: '9876543210', status: 'ACTIVE', memberCount: 150, staffCount: 10, monthlyRevenue: 4000,
    createdAt: '2023-10-01'
  },
  {
    id: 'b2', tenantId: 't1', tenantName: 'Iron Paradise', branchName: 'Andheri East',
    location: 'Andheri East', city: 'Mumbai', state: 'MH', managerName: 'Bob', managerEmail: 'bob@iron.com',
    phone: '9876543211', status: 'ACTIVE', memberCount: 50, staffCount: 5, monthlyRevenue: 1000,
    createdAt: '2023-10-10'
  },
  {
    id: 'b3', tenantId: 't2', tenantName: 'Fit Life Studio', branchName: 'Pune Center',
    location: 'Pune Center', city: 'Pune', state: 'MH', managerName: 'Charlie', managerEmail: 'charlie@fitlife.com',
    phone: '9876543212', status: 'INACTIVE', memberCount: 50, staffCount: 3, monthlyRevenue: 0,
    createdAt: '2023-10-15'
  }
];

export const superadminBranchesHandlers = [
  http.get(BASE_URL, async ({ request }) => {
    await delay(400);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 20;
    const search = url.searchParams.get('search')?.toLowerCase() || '';
    const status = url.searchParams.get('statusFilter');

    let filtered = [...mockBranches];

    if (search) {
      filtered = filtered.filter(
        b => b.branchName?.toLowerCase().includes(search) ||
             b.tenantName?.toLowerCase().includes(search) ||
             b.id?.toLowerCase().includes(search)
      );
    }
    
    if (status && status !== 'ALL') {
      filtered = filtered.filter(b => b.status === status);
    }

    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return HttpResponse.json<ApiResponse<SuperadminBranch[]>>({
      success: true,
      message: 'Success',
      data: paginated,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    });
  }),
  
  http.get(`${BASE_URL}/:id`, async ({ params }) => {
    await delay(300);
    const id = params.id as string;
    const branch = mockBranches.find(b => b.id === id);
    if (!branch) {
      return HttpResponse.json<ApiResponse<SuperadminBranch>>({ success: false, message: 'Not found', data: null }, { status: 404 });
    }
    return HttpResponse.json<ApiResponse<SuperadminBranch>>({
      success: true,
      message: 'Success',
      data: branch,
    });
  }),

  http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
    await delay(500);
    const id = params.id as string;
    const body = await request.json() as Partial<SuperadminBranch>;
    let updated: SuperadminBranch | null = null;
    mockBranches = mockBranches.map(b => {
      if (b.id === id) {
        updated = { ...b, ...body };
        return updated;
      }
      return b;
    });
    if (!updated) {
      return HttpResponse.json<ApiResponse<SuperadminBranch>>({ success: false, message: 'Not found', data: null }, { status: 404 });
    }
    return HttpResponse.json<ApiResponse<SuperadminBranch>>({
      success: true,
      message: 'Updated',
      data: updated,
    });
  }),

  http.post(`${BASE_URL}/:id/suspend`, async ({ params }) => {
    await delay(400);
    const id = params.id as string;
    mockBranches = mockBranches.map(b => b.id === id ? { ...b, status: 'SUSPENDED' } : b);
    return HttpResponse.json<ApiResponse<null>>({
      success: true,
      message: 'Suspended',
      data: null,
    });
  }),

  http.post(`${BASE_URL}/:id/activate`, async ({ params }) => {
    await delay(400);
    const id = params.id as string;
    mockBranches = mockBranches.map(b => b.id === id ? { ...b, status: 'ACTIVE' } : b);
    return HttpResponse.json<ApiResponse<null>>({
      success: true,
      message: 'Activated',
      data: null,
    });
  }),
];
