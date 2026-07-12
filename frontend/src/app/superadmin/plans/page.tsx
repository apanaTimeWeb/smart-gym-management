'use client';

import { PlansProvider, usePlansContext } from './plans_context/PlansContext';
import PlansList from './plans_components/PlansList';
import PlanCreateModal from './plans_components/PlanCreateModal';

function PlansPageContent() {
  const { openCreateModal } = usePlansContext();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Subscription Plans</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage pricing tiers and limits for SaaS tenants.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors"
        >
          Create New Plan
        </button>
      </div>

      <PlansList />
      <PlanCreateModal />
    </div>
  );
}

export default function PlansPage() {
  return (
    <PlansProvider>
      <PlansPageContent />
    </PlansProvider>
  );
}
