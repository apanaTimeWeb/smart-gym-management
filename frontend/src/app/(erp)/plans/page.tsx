"use client";

import Header from '@/components/Header';
import Toast from '@/components/Toast';

import { PlansProvider, usePlansContext } from './plans_context/PlansContext';
import PlansToolbar from './plans_components/PlansToolbar/PlansToolbar';
import PlansGrid from './plans_components/PlansGrid/PlansGrid';
import PlanModal from './plans_components/PlanModal/PlanModal';

import './plans.css';

function PlansContent() {
  const { toast, hideToast } = usePlansContext();

  return (
    <div className="min-h-full pb-10 plans-module bg-[var(--bg-page)] text-[var(--plans-text-primary)]">
      <Header title="Membership Plans" subtitle="Manage subscription plans, pricing, and features" />
      <div className="p-6 space-y-5">
        <PlansToolbar />
        <PlansGrid />
      </div>

      <PlanModal />

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}

export default function PlansPage() {
  return (
    <PlansProvider>
      <PlansContent />
    </PlansProvider>
  );
}
