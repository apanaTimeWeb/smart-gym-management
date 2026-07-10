/**
 * GymSmart API Client
 * Centralised fetch wrapper for all backend API calls.
 * Base URL: http://localhost:5000/api/v1
 */

import { AuthUrlConfig } from '@/app/auth/auth_url_config';
import { StatusCodes } from 'http-status-codes';
import { DashboardUrlConfig } from '@/app/erp/dashboard/dashboard_url_config';
import { MembersUrlConfig } from '@/app/erp/members/members_url_config';
import { PlansUrlConfig } from '@/app/erp/plans/plans_url_config';
import { FinanceUrlConfig } from '@/app/erp/finance/finance_url_config';
import { HrUrlConfig } from '@/app/erp/hr/hr_url_config';
import { AttendanceUrlConfig } from '@/app/erp/attendance/attendance_url_config';
import { StoreUrlConfig } from '@/app/erp/store/store_url_config';
import { WorkoutUrlConfig } from '@/app/erp/workout/workout_url_config';
import { LibraryUrlConfig } from '@/app/erp/library/library_url_config';
import { InquiriesUrlConfig } from '@/app/erp/inquiries/inquiries_url_config';
import { SalesUrlConfig } from '@/app/erp/sales/sales_url_config';

export type { DashboardStats, RecentMember, RecentPayment, PendingPayment } from '@/app/erp/dashboard/dashboard_types/dashboard_types';
export type { Member, MemberStats } from '@/app/erp/members/members_types/members_types';
export type { Plan } from '@/app/erp/plans/plans_types/plans_types';
export type { Payment, FinanceSummary } from '@/app/erp/finance/finance_types/finance_types';
export type { Staff, Payroll, HrSummary } from '@/app/erp/hr/hr_types/hr_types';
export type { Attendance } from '@/app/erp/attendance/attendance_types/attendance_types';
export type { Product, Order, StoreSummary } from '@/app/erp/store/store_types/store_types';
export type { Workout } from '@/app/erp/workout/workout_types/workout_types';
export type { Exercise, DietPlan } from '@/app/erp/library/library_types/library_types';
export type { Inquiry, InquiryStats } from '@/app/erp/inquiries/inquiries_types/inquiries_types';

import type { DashboardStats, RecentMember, RecentPayment, PendingPayment } from '@/app/erp/dashboard/dashboard_types/dashboard_types';
import type { Member, MemberStats } from '@/app/erp/members/members_types/members_types';
import type { Plan } from '@/app/erp/plans/plans_types/plans_types';
import type { Payment, FinanceSummary } from '@/app/erp/finance/finance_types/finance_types';
import type { Staff, Payroll, HrSummary } from '@/app/erp/hr/hr_types/hr_types';
import type { Attendance } from '@/app/erp/attendance/attendance_types/attendance_types';
import type { Product, Order, StoreSummary } from '@/app/erp/store/store_types/store_types';
import type { Workout } from '@/app/erp/workout/workout_types/workout_types';
import type { Exercise, DietPlan } from '@/app/erp/library/library_types/library_types';
import type { Inquiry, InquiryStats } from '@/app/erp/inquiries/inquiries_types/inquiries_types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// ─── User Helper (reads from non-HttpOnly cookie set by server) ───────────────

export function getUser(): { name: string; email: string; role: string } | null {
  if (typeof window === 'undefined') return null;
  const c = document.cookie.split(';').find(x => x.trim().startsWith('gymsmart_user='));
  if (!c) return null;
  try { return JSON.parse(decodeURIComponent(c.split('=').slice(1).join('='))); } catch { return null; }
}

export async function logout() {
  await fetch(AuthUrlConfig.PROXY_API.LOGOUT, { method: 'POST' });
  window.location.replace(AuthUrlConfig.PAGES.LOGIN);
}

// ─── Core Fetch ───────────────────────────────────────────────────────────────

interface FetchOptions extends RequestInit {
  auth?: boolean;
}

export async function apiFetch<T = unknown>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { auth = true, ...rest } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(rest.headers as Record<string, string>),
  };

  // Token is in HttpOnly cookie — read via Next.js proxy to avoid CORS/exposure
  if (auth) {
    const tokenRes = await fetch(AuthUrlConfig.PROXY_API.TOKEN).catch(() => null);
    if (tokenRes?.ok) {
      const { token } = await tokenRes.json();
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...rest, headers });
  
  let finalRes = res;
  
  if (res.status === StatusCodes.UNAUTHORIZED && auth) {
    // Attempt to refresh the token
    const refreshRes = await fetch(AuthUrlConfig.PROXY_API.REFRESH, { method: 'POST' });
    
    if (refreshRes.ok) {
      // Refresh succeeded, grab new token from response
      const { accessToken } = await refreshRes.json();
      if (accessToken) {
        // Retry original request with new token
        headers['Authorization'] = `Bearer ${accessToken}`;
        finalRes = await fetch(`${BASE_URL}${path}`, { ...rest, headers });
      }
    } else {
      // Refresh failed, session genuinely expired
      await fetch(AuthUrlConfig.PROXY_API.LOGOUT, { method: 'POST' });
      window.location.replace(AuthUrlConfig.PAGES.LOGIN);
      throw new Error('Session expired. Please login again.');
    }
  }

  const json = await finalRes.json();

  if (!finalRes.ok) {
    throw new Error(json.message || `API Error: ${finalRes.status}`);
  }

  return json;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const authApi = {
  login: async (email: string, password: string) => {
    return apiFetch<{ success: boolean; data: { accessToken: string; user: any } }>(AuthUrlConfig.BACKEND_API.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      auth: false,
    });
  },
  me: () => apiFetch(AuthUrlConfig.BACKEND_API.ME),
};

// ─── Dashboard ────────────────────────────────────────────────────────────────

export const dashboardApi = {
  getStats: async () => {
    const [kpiRes, chartsRes, recentRes] = await Promise.all([
      apiFetch<{ success: boolean; data: any }>(DashboardUrlConfig.BACKEND_API.STATS),
      apiFetch<{ success: boolean; data: any }>(DashboardUrlConfig.BACKEND_API.CHARTS),
      apiFetch<{ success: boolean; data: any }>(DashboardUrlConfig.BACKEND_API.RECENT),
    ]);
    return {
      success: true,
      data: {
        ...kpiRes.data,
        ...chartsRes.data,
        ...recentRes.data,
      } as DashboardStats,
    };
  },
};


// ─── Members ──────────────────────────────────────────────────────────────────

export const membersApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<{ success: boolean; data: { members: Member[]; total: number; page: number; limit: number } }>(`${MembersUrlConfig.BACKEND_API.BASE}${q}`);
  },
  getOne: (id: number) => apiFetch<{ success: boolean; data: Member }>(MembersUrlConfig.BACKEND_API.GET_ONE(id)),
  getStats: () => apiFetch<{ success: boolean; data: MemberStats }>(MembersUrlConfig.BACKEND_API.STATS),
  create: (body: Partial<Member>) =>
    apiFetch(MembersUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body) }),
  update: (id: number, body: Partial<Member>) =>
    apiFetch(MembersUrlConfig.BACKEND_API.UPDATE(id), { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (id: number) => apiFetch(MembersUrlConfig.BACKEND_API.DELETE(id), { method: 'DELETE' }),
  renew: (id: number, body: unknown) =>
    apiFetch(MembersUrlConfig.BACKEND_API.RENEW(id), { method: 'POST', body: JSON.stringify(body) }),
};



// ─── Plans ────────────────────────────────────────────────────────────────────

export const plansApi = {
  getAll: () => apiFetch<{ success: boolean; data: Plan[] }>(PlansUrlConfig.BACKEND_API.BASE),
  getOne: (id: number) => apiFetch<{ success: boolean; data: Plan }>(PlansUrlConfig.BACKEND_API.GET_ONE(id)),
  create: (body: Partial<Plan>) =>
    apiFetch(PlansUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body) }),
  update: (id: number, body: Partial<Plan>) =>
    apiFetch(PlansUrlConfig.BACKEND_API.UPDATE(id), { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (id: number) => apiFetch(PlansUrlConfig.BACKEND_API.DELETE(id), { method: 'DELETE' }),
};


// ─── Finance ──────────────────────────────────────────────────────────────────

export const financeApi = {
  getPayments: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<{ success: boolean; data: { payments: Payment[]; total: number } }>(`${FinanceUrlConfig.BACKEND_API.PAYMENTS_BASE}${q}`);
  },
  createPayment: (body: Partial<Payment>) =>
    apiFetch(FinanceUrlConfig.BACKEND_API.PAYMENTS_BASE, { method: 'POST', body: JSON.stringify(body) }),
  getSummary: () => apiFetch<{ success: boolean; data: FinanceSummary }>(FinanceUrlConfig.BACKEND_API.SUMMARY),
  getByMember: (memberId: number) =>
    apiFetch<{ success: boolean; data: Payment[] }>(FinanceUrlConfig.BACKEND_API.PAYMENTS_BY_MEMBER(memberId)),
};



// ─── HR ───────────────────────────────────────────────────────────────────────

export const hrApi = {
  getStaff: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<{ success: boolean; data: { staff: Staff[]; total: number } }>(`${HrUrlConfig.BACKEND_API.STAFF_BASE}${q}`);
  },
  getOneStaff: (id: number) => apiFetch<{ success: boolean; data: Staff }>(HrUrlConfig.BACKEND_API.STAFF_GET_ONE(id)),
  createStaff: (body: Partial<Staff>) =>
    apiFetch(HrUrlConfig.BACKEND_API.STAFF_BASE, { method: 'POST', body: JSON.stringify(body) }),
  updateStaff: (id: number, body: Partial<Staff>) =>
    apiFetch(HrUrlConfig.BACKEND_API.STAFF_UPDATE(id), { method: 'PATCH', body: JSON.stringify(body) }),
  removeStaff: (id: number) => apiFetch(HrUrlConfig.BACKEND_API.STAFF_DELETE(id), { method: 'DELETE' }),
  getPayrolls: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<{ success: boolean; data: { payrolls: Payroll[]; total: number } }>(`${HrUrlConfig.BACKEND_API.PAYROLLS_BASE}${q}`);
  },
  createPayroll: (body: Partial<Payroll>) =>
    apiFetch(HrUrlConfig.BACKEND_API.PAYROLLS_BASE, { method: 'POST', body: JSON.stringify(body) }),
  updatePayrollStatus: (id: number, status: string) =>
    apiFetch(HrUrlConfig.BACKEND_API.PAYROLL_STATUS_UPDATE(id), { method: 'PATCH', body: JSON.stringify({ status }) }),
  getSummary: () => apiFetch<{ success: boolean; data: HrSummary }>(HrUrlConfig.BACKEND_API.SUMMARY),
};




// ─── Attendance ───────────────────────────────────────────────────────────────

export const attendanceApi = {
  mark: (body: { memberId?: number; staffId?: number; date: string; checkIn?: string; type: string }) =>
    apiFetch(AttendanceUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body) }),
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<{ success: boolean; data: Attendance[] }>(`${AttendanceUrlConfig.BACKEND_API.BASE}${q}`);
  },
  getTodayStats: () =>
    apiFetch<{ success: boolean; data: { totalCheckIns: number; memberCheckIns: number; staffCheckIns: number } }>(
      AttendanceUrlConfig.BACKEND_API.TODAY_STATS
    ),
};


// ─── Store ────────────────────────────────────────────────────────────────────

export const storeApi = {
  getProducts: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<{ success: boolean; data: { products: Product[]; total: number } }>(`${StoreUrlConfig.BACKEND_API.PRODUCTS_BASE}${q}`);
  },
  createProduct: (body: Partial<Product>) =>
    apiFetch(StoreUrlConfig.BACKEND_API.PRODUCTS_BASE, { method: 'POST', body: JSON.stringify(body) }),
  updateProduct: (id: number, body: Partial<Product>) =>
    apiFetch(StoreUrlConfig.BACKEND_API.PRODUCT_UPDATE(id), { method: 'PATCH', body: JSON.stringify(body) }),
  removeProduct: (id: number) => apiFetch(StoreUrlConfig.BACKEND_API.PRODUCT_DELETE(id), { method: 'DELETE' }),
  getOrders: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<{ success: boolean; data: { orders: Order[]; total: number } }>(`${StoreUrlConfig.BACKEND_API.ORDERS_BASE}${q}`);
  },
  createOrder: (body: { items: { productId: number; qty: number }[]; method: string; notes?: string }) =>
    apiFetch(StoreUrlConfig.BACKEND_API.ORDERS_BASE, { method: 'POST', body: JSON.stringify(body) }),
  getStoreSummary: () => apiFetch<{ success: boolean; data: StoreSummary }>(StoreUrlConfig.BACKEND_API.SUMMARY),
};




// ─── Workout ──────────────────────────────────────────────────────────────────

export const workoutApi = {
  getWorkouts: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<{ success: boolean; data: Workout[] }>(`${WorkoutUrlConfig.BACKEND_API.WORKOUTS_BASE}${q}`);
  },
  createWorkout: (body: Partial<Workout>) =>
    apiFetch(WorkoutUrlConfig.BACKEND_API.WORKOUTS_BASE, { method: 'POST', body: JSON.stringify(body) }),
  updateWorkout: (id: number, body: Partial<Workout>) =>
    apiFetch(WorkoutUrlConfig.BACKEND_API.WORKOUT_UPDATE(id), { method: 'PATCH', body: JSON.stringify(body) }),
  removeWorkout: (id: number) => apiFetch(WorkoutUrlConfig.BACKEND_API.WORKOUT_DELETE(id), { method: 'DELETE' }),
};

export const libraryApi = {
  getExercises: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<{ success: boolean; data: { Exercises: Exercise[]; total: number } }>(`${LibraryUrlConfig.BACKEND_API.EXERCISES_BASE}${q}`);
  },
  createExercise: (body: Partial<Exercise>) =>
    apiFetch(LibraryUrlConfig.BACKEND_API.EXERCISES_BASE, { method: 'POST', body: JSON.stringify(body) }),
  updateExercise: (id: number, body: Partial<Exercise>) =>
    apiFetch(LibraryUrlConfig.BACKEND_API.EXERCISE_UPDATE(id), { method: 'PATCH', body: JSON.stringify(body) }),
  removeExercise: (id: number) => apiFetch(LibraryUrlConfig.BACKEND_API.EXERCISE_DELETE(id), { method: 'DELETE' }),
  getDietPlans: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<{ success: boolean; data: { dietPlans: DietPlan[]; total: number } }>(`${LibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE}${q}`);
  },
  createDietPlan: (body: Partial<DietPlan>) =>
    apiFetch(LibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE, { method: 'POST', body: JSON.stringify(body) }),
  updateDietPlan: (id: number, body: Partial<DietPlan>) =>
    apiFetch(LibraryUrlConfig.BACKEND_API.DIET_PLAN_UPDATE(id), { method: 'PATCH', body: JSON.stringify(body) }),
  removeDietPlan: (id: number) => apiFetch(LibraryUrlConfig.BACKEND_API.DIET_PLAN_DELETE(id), { method: 'DELETE' }),
};




// ─── Inquiries ────────────────────────────────────────────────────────────────

export const inquiriesApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<{ success: boolean; data: { inquiries: Inquiry[]; total: number } }>(`${InquiriesUrlConfig.BACKEND_API.BASE}${q}`);
  },
  getOne: (id: number) => apiFetch<{ success: boolean; data: Inquiry }>(InquiriesUrlConfig.BACKEND_API.GET_ONE(id)),
  getStats: () => apiFetch<{ success: boolean; data: InquiryStats }>(InquiriesUrlConfig.BACKEND_API.STATS),
  create: (body: Partial<Inquiry>) =>
    apiFetch(InquiriesUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body) }),
  update: (id: number, body: Partial<Inquiry>) =>
    apiFetch(InquiriesUrlConfig.BACKEND_API.UPDATE(id), { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (id: number) => apiFetch(InquiriesUrlConfig.BACKEND_API.DELETE(id), { method: 'DELETE' }),
};

// ─── Sales ────────────────────────────────────────────────────────────────────

export const salesApi = {
  getOverview: () => apiFetch<{ success: boolean; data: { monthlyRevenue: any[] } }>(SalesUrlConfig.BACKEND_API.OVERVIEW),
  getMembershipReport: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<{ success: boolean; data: { report: any[]; totals: any } }>(`${SalesUrlConfig.BACKEND_API.MEMBERSHIP_REPORT}${q}`);
  },
  getPendingPayments: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<{ success: boolean; data: { members: any[]; total: number } }>(`${SalesUrlConfig.BACKEND_API.PENDING_PAYMENTS}${q}`);
  },
  getAllMemberships: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<{ success: boolean; data: { members: any[]; total: number } }>(`${SalesUrlConfig.BACKEND_API.ALL_MEMBERSHIPS}${q}`);
  },
};


