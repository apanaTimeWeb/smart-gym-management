// RESPONSIBILITY: Modularized API client for the Plans module. All methods import apiFetch from src/lib/api.ts.
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { SubscriptionPlan, CreatePlanPayload, UpdatePlanPayload } from '@/app/superadmin/plans/superadmin_plans_types/superadmin_plans_types';

import { MOCK_SUPERADMIN_PLANS } from '@/app/superadmin/plans/superadmin_plans_api/SuperadminPlansMockData';

let mockPlans = [...MOCK_SUPERADMIN_PLANS];

export const plansApi = {
  fetchPlans: async (params?: Record<string, string>) => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: mockPlans };
  },
  fetchPlanById: async (id: string) => {
    await new Promise(r => setTimeout(r, 300));
    return { success: true, message: 'Success', data: mockPlans.find(p => p.id === id) as SubscriptionPlan };
  },
  createPlan: async (body: CreatePlanPayload) => {
    await new Promise(r => setTimeout(r, 500));
    const newPlan = { ...body, id: `p${Date.now()}`, activeTenants: 0, isArchived: false } as SubscriptionPlan;
    mockPlans = [newPlan, ...mockPlans];
    return { success: true, message: 'Created', data: newPlan };
  },
  updatePlan: async (id: string, body: UpdatePlanPayload) => {
    await new Promise(r => setTimeout(r, 500));
    mockPlans = mockPlans.map(p => p.id === id ? { ...p, ...body } : p);
    return { success: true, message: 'Updated', data: mockPlans.find(p => p.id === id) as SubscriptionPlan };
  },
  deletePlan: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    mockPlans = mockPlans.filter(p => p.id !== id);
    return { success: true, message: 'Deleted', data: undefined };
  },
  archivePlan: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    mockPlans = mockPlans.map(p => p.id === id ? { ...p, isArchived: true } : p);
    return { success: true, message: 'Archived', data: undefined };
  },
};
