// RESPONSIBILITY: Provides strongly-typed network calls for the plans module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { PlansUrlConfig } from '@/app/admin/plans/plans_url_config';
import { MOCK_ADMIN_PLANS, MOCK_ADMIN_PLAN_REVENUE } from '@/app/admin/plans/plans_api/AdminPlansMockData';
import type { Plan } from '@/app/admin/plans/plans_types/plans_types';
import type { PlanRevenueRecord, RevenuePeriod } from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';

let mockPlans = [...MOCK_ADMIN_PLANS];

export const plansApi = {
  fetchAllPlans: async () => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: mockPlans };
  },
  fetchPlanById: async (id: string) => {
    await new Promise(res => setTimeout(res, 300));
    const plan = mockPlans.find(p => p.id === id);
    if (!plan) throw new Error('Not found');
    return { success: true, message: 'Success', data: plan };
  },
  createPlan: async (body: Partial<Plan>) => {
    await new Promise(res => setTimeout(res, 400));
    const newPlan = { ...body, id: `p${Date.now()}` } as Plan;
    mockPlans.push(newPlan);
    return { success: true, message: 'Created', data: newPlan };
  },
  updatePlan: async (id: string, body: Partial<Plan>) => {
    await new Promise(res => setTimeout(res, 400));
    const idx = mockPlans.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Not found');
    mockPlans[idx] = { ...mockPlans[idx], ...body } as Plan;
    return { success: true, message: 'Updated', data: mockPlans[idx] };
  },
  deletePlan: async (id: string) => {
    await new Promise(res => setTimeout(res, 400));
    mockPlans = mockPlans.filter(p => p.id !== id);
    return { success: true, message: 'Deleted', data: { id } };
  },
  fetchPlanRevenue: async (period: RevenuePeriod) => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: MOCK_ADMIN_PLAN_REVENUE };
  },
};
