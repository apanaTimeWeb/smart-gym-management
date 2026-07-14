// RESPONSIBILITY: PlansClient.tsx is the root client entry for the Plans page. Initialises the Zustand store on mount.
'use client';

import { useEffect } from 'react';
import { usePlansStore } from '@/app/superadmin/plans/plans_store/usePlansStore';
import PlansList from '@/app/superadmin/plans/plans_components/PlansList';
import PlanCreateModal from '@/app/superadmin/plans/plans_components/PlanCreateModal';
import PlanEditModal from '@/app/superadmin/plans/plans_components/PlanEditModal';

export default function PlansClient() {
  const fetchPlans = usePlansStore(state => state.fetchPlans);
  const openCreateModal = usePlansStore(state => state.openCreateModal);

  // Fetch plans on mount
  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Subscription Plans</h1>
          <p className="text-secondary mt-1">Manage pricing tiers and limits for SaaS tenants.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors active:scale-95"
        >
          Create New Plan
        </button>
      </div>

      <PlansList />
      <PlanCreateModal />
      <PlanEditModal />
    </div>
  );
}
