import { MANAGER_PLANS_STATUS_VALUES } from '@/app/frontend_manager/manager_plans/manager_plans_constants/ManagerPlansConstants';
import type { ManagerPlansMembershipOverview } from '@/app/frontend_manager/manager_plans/manager_plans_types/ManagerPlansMembershipTypes';

/**
 * @description Provides the ManagerPlansMembershipMockData implementation for the plans module.
 * @dependencies @/app/frontend_manager/manager_plans/manager_plans_types/ManagerPlansMembershipTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_PLANS_MEMBERSHIP_OVERVIEW: ManagerPlansMembershipOverview = {
  memberOptions: [
    { id: 'm-plan-1', name: 'Rahul Kumar', phone: '+919876543210', status: MANAGER_PLANS_STATUS_VALUES.ACTIVE, planName: 'Pro Access', planId: 'p1', expiryDate: '2026-10-08T00:00:00Z' },
    { id: 'm-plan-2', name: 'Priya Singh', phone: '+919876543211', status: MANAGER_PLANS_STATUS_VALUES.ACTIVE, planName: 'Basic Access', planId: 'p2', expiryDate: '2026-09-25T00:00:00Z' },
    { id: 'm-plan-3', name: 'Neha Verma', phone: '+919876543212', status: MANAGER_PLANS_STATUS_VALUES.ACTIVE, planName: 'Elite Training', planId: 'p3', expiryDate: '2026-10-19T00:00:00Z' },
  ],
  renewalCandidates: [
    { id: 'm-plan-2', name: 'Priya Singh', phone: '+919876543211', status: MANAGER_PLANS_STATUS_VALUES.ACTIVE, planName: 'Basic Access', planId: 'p2', expiryDate: '2026-09-25T00:00:00Z' },
    { id: 'm-plan-1', name: 'Rahul Kumar', phone: '+919876543210', status: MANAGER_PLANS_STATUS_VALUES.ACTIVE, planName: 'Pro Access', planId: 'p1', expiryDate: '2026-10-08T00:00:00Z' },
  ] };
