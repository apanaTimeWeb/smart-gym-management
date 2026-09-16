import { http, HttpResponse, delay } from 'msw';
import type { SuperadminFranchise } from '@/app/superadmin/franchises/franchises_types/superadmin_franchises_types';
import type { ApiResponse } from '@/lib/api';
import { MOCK_SUPERADMIN_FRANCHISES } from '@/app/superadmin/franchises/franchises_mocks/fixtures/SuperadminFranchisesMockFixtures';

const BASE_URL = '*/api/v1/superadmin/franchises';

let mockFranchises: SuperadminFranchise[] = [...MOCK_SUPERADMIN_FRANCHISES];

export const superadminFranchisesHandlers = [
  http.get(BASE_URL, async ({ request }) => {
    await delay(400);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 20;
    const search = url.searchParams.get('search')?.toLowerCase() || '';

    let filtered = [...mockFranchises];

    if (search) {
      filtered = filtered.filter(
        f => f.franchiseName?.toLowerCase().includes(search) ||
             f.ownerName?.toLowerCase().includes(search) ||
             f.id?.toLowerCase().includes(search)
      );
    }

    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return HttpResponse.json<ApiResponse<SuperadminFranchise[]>>({
      success: true,
      message: 'Success',
      data: paginated,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    });
  }),
  
  http.get(`${BASE_URL}/:id`, async ({ params }) => {
    await delay(300);
    const id = params.id as string;
    const franchise = mockFranchises.find(f => f.id === id);
    if (!franchise) {
      return HttpResponse.json<ApiResponse<SuperadminFranchise>>({ success: false, message: 'Not found', data: null }, { status: 404 });
    }
    return HttpResponse.json<ApiResponse<SuperadminFranchise>>({
      success: true,
      message: 'Success',
      data: franchise,
    });
  }),

  http.post(`${BASE_URL}/:id/suspend`, async ({ params }) => {
    await delay(400);
    const id = params.id as string;
    mockFranchises = mockFranchises.map(f => f.id === id ? { ...f, status: 'SUSPENDED' } : f);
    return HttpResponse.json<ApiResponse<null>>({
      success: true,
      message: 'Suspended',
      data: null,
    });
  }),

  http.post(`${BASE_URL}/:id/activate`, async ({ params }) => {
    await delay(400);
    const id = params.id as string;
    mockFranchises = mockFranchises.map(f => f.id === id ? { ...f, status: 'ACTIVE' } : f);
    return HttpResponse.json<ApiResponse<null>>({
      success: true,
      message: 'Activated',
      data: null,
    });
  }),

  http.patch(`${BASE_URL}/:id`, async ({ params, request }) => {
    await delay(500);
    const id = params.id as string;
    const body = await request.json() as Partial<SuperadminFranchise>;
    let updated: SuperadminFranchise | null = null;
    mockFranchises = mockFranchises.map(f => {
      if (f.id === id) {
        updated = { ...f, ...body };
        return updated;
      }
      return f;
    });
    if (!updated) {
      return HttpResponse.json<ApiResponse<SuperadminFranchise>>({ success: false, message: 'Not found', data: null }, { status: 404 });
    }
    return HttpResponse.json<ApiResponse<SuperadminFranchise>>({
      success: true,
      message: 'Updated',
      data: updated,
    });
  }),
];
