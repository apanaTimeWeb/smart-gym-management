// RESPONSIBILITY: PlansMain.tsx handles the logic and UI for its corresponding feature.
"use client";

import ErpHeader from '@/app/erp/erp_components/ErpLayout/ErpHeader';
import ErpToast from '@/app/erp/erp_components/ErpFeedback/ErpToast';

import { PlansProvider, usePlansContext } from '@/app/erp/plans/plans_context/PlansContext';
import PlansToolbar from '@/app/erp/plans/plans_components/PlansToolbar/PlansToolbar';
import PlansGrid from '@/app/erp/plans/plans_components/PlansGrid/PlansGrid';
import PlanModal from '@/app/erp/plans/plans_components/PlanModal/PlanModal';

import '@/app/erp/plans/plans.css';

function PlansContent() {
 const { toast, hideToast } = usePlansContext();

 return (
 <div className="min-h-full pb-10 plans-module bg-background text-foreground">
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
