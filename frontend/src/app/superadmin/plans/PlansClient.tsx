// RESPONSIBILITY: PlansClient.tsx handles the logic and UI for its corresponding feature.
'use client';

import { PlansProvider, usePlansContext } from '@/app/superadmin/plans/plans_context/PlansContext';
import PlansList from '@/app/superadmin/plans/plans_components/PlansList';
import PlanCreateModal from '@/app/superadmin/plans/plans_components/PlanCreateModal';
import PlanEditModal from '@/app/superadmin/plans/plans_components/PlanEditModal';

function PlansPageContent() {
  const { openCreateModal } = usePlansContext();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Subscription Plans</h1>
          <p className="text-secondary mt-1">Manage pricing tiers and limits for SaaS tenants.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors"
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

export default function PlansClient() {
  return (
    <PlansProvider>
      <PlansPageContent />
    </PlansProvider>
  );
}
