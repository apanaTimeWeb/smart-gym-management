"use client";

import ErpHeader from '@/app/(erp)/erp_components/ErpHeader';
import ErpToast from '@/app/(erp)/erp_components/ErpToast';

import { PlansProvider, usePlansContext } from '../../plans_context/PlansContext';
import PlansToolbar from '../PlansToolbar/PlansToolbar';
import PlansGrid from '../PlansGrid/PlansGrid';
import PlanModal from '../PlanModal/PlanModal';

import '../../plans.css';

function PlansContent() {
  const { toast, hideToast } = usePlansContext();

  return (
    <div className="min-h-full pb-10 plans-module bg-[var(--bg-page)] text-[var(--plans-text-primary)]">
      <ErpHeader title="Membership Plans" subtitle="Manage subscription plans, pricing, and features" />
      <div className="p-6 space-y-5">
        <PlansToolbar />
        <PlansGrid />
      </div>

      <PlanModal />

      {toast && (
        <ErpToast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}

export default function PlansMain() {
  return (
    <PlansProvider>
      <PlansContent />
    </PlansProvider>
  );
}
