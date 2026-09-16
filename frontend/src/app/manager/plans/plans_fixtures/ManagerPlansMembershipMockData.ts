import type { ManagerPlansMembershipOverview } from '@/app/manager/plans/plans_types/ManagerPlansMembershipTypes';

export const MOCK_PLANS_MEMBERSHIP_OVERVIEW: ManagerPlansMembershipOverview = {
  memberOptions: [
    { id: 'm-plan-1', name: 'Rahul Kumar', phone: '+919876543210', status: 'ACTIVE', planName: 'Pro Access', planId: 'p1', expiryDate: '2026-10-08T00:00:00Z' },
    { id: 'm-plan-2', name: 'Priya Singh', phone: '+919876543211', status: 'ACTIVE', planName: 'Basic Access', planId: 'p2', expiryDate: '2026-09-25T00:00:00Z' },
    { id: 'm-plan-3', name: 'Neha Verma', phone: '+919876543212', status: 'ACTIVE', planName: 'Elite Training', planId: 'p3', expiryDate: '2026-10-19T00:00:00Z' },
  ],
  renewalCandidates: [
    { id: 'm-plan-2', name: 'Priya Singh', phone: '+919876543211', status: 'ACTIVE', planName: 'Basic Access', planId: 'p2', expiryDate: '2026-09-25T00:00:00Z' },
    { id: 'm-plan-1', name: 'Rahul Kumar', phone: '+919876543210', status: 'ACTIVE', planName: 'Pro Access', planId: 'p1', expiryDate: '2026-10-08T00:00:00Z' },
  ],
};
