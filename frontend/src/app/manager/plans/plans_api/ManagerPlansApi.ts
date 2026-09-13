// RESPONSIBILITY: Provides strongly-typed network calls for the plans module.
import { MOCK_PLANS } from '@/app/manager/plans/plans_fixtures/ManagerPlansMockData';
import type { Plan } from '@/app/manager/plans/plans_types/ManagerPlansTypes';

export const plansApi = {
  getAll: async () => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Success', data: MOCK_PLANS };
  },
  getOne: async (id: string) => {
    await new Promise(res => setTimeout(res, 400));
    const plan = MOCK_PLANS.find(p => p.id === id) || MOCK_PLANS[0];
    return { success: true, message: 'Success', data: plan };
  },
  create: async (body: Partial<Plan>) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Created', data: MOCK_PLANS[0] };
  },
  update: async (id: string, body: Partial<Plan>) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Updated', data: MOCK_PLANS[0] };
  },
  remove: async (id: string) => {
    await new Promise(res => setTimeout(res, 400));
    return { success: true, message: 'Removed', data: { id } };
  },
};
