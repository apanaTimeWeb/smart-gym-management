import { http, HttpResponse, delay } from 'msw';
import type { SuperadminFranchise } from '@/app/superadmin/franchises/franchises_types/superadmin_franchises_types';
import type { ApiResponse } from '@/lib/api';

const BASE_URL = '*/api/v1/superadmin/franchises';

let mockFranchises: SuperadminFranchise[] = [
  {
    id: 'f1', franchiseName: 'Gold Gym Group', ownerName: 'Alice Johnson', ownerEmail: 'alice@goldgym.com',
    phone: '9876543210', status: 'ACTIVE', branchCount: 15, totalMembers: 5000, totalStaff: 150,
    totalMonthlyRevenue: 500000, plan: 'Enterprise', city: 'Mumbai', state: 'MH',
    gstin: '27AABCU9603R1ZX', createdAt: '2023-01-10'
  },
  {
    id: 'f2', franchiseName: 'Anytime Fitness India', ownerName: 'Bob Smith', ownerEmail: 'bob@anytime.com',
    phone: '9876543211', status: 'ACTIVE', branchCount: 8, totalMembers: 2500, totalStaff: 80,
    totalMonthlyRevenue: 250000, plan: 'Pro', city: 'Delhi', state: 'DL',
    createdAt: '2023-05-15'
  },
  {
    id: 'f3', franchiseName: 'Cult Fit Mini', ownerName: 'Charlie', ownerEmail: 'charlie@cultfit.com',
    phone: '9876543212', status: 'SUSPENDED', branchCount: 2, totalMembers: 300, totalStaff: 10,
    totalMonthlyRevenue: 30000, plan: 'Basic', city: 'Bangalore', state: 'KA',
    createdAt: '2023-08-20'
  }
];

export const superadminFranchisesHandlers = [
  http.get(BASE_URL, async () => {
    await delay(400);
    return HttpResponse.json<ApiResponse<SuperadminFranchise[]>>({
      success: true,
      message: 'Success',
      data: mockFranchises,
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
