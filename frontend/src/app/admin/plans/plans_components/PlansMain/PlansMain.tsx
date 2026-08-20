// RESPONSIBILITY: Entry point for the Plans module. Sets up the Context provider and composes PlansToolbar, PlansGrid, and PlanModal.
'use client';

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import AdminToast from '@/app/admin/admin_components/AdminFeedback/AdminToast';

import { PlansProvider, usePlansContext } from '@/app/admin/plans/plans_context/PlansContext';
import PlansToolbar from '@/app/admin/plans/plans_components/PlansToolbar/PlansToolbar';
import PlansGrid from '@/app/admin/plans/plans_components/PlansGrid/PlansGrid';
import PlanModal from '@/app/admin/plans/plans_components/PlanModal/PlanModal';
import { PlansInitialData } from '@/app/admin/plans/plans_types/plans_types';

function PlansContent() {
 const { toast, hideToast } = usePlansContext();

 return (
 <div className="min-h-full pb-10">
 <AdminHeader title="Membership Plans" subtitle="Manage subscription plans, pricing, and features" />
 <div className="p-6 space-y-5">
 <PlansToolbar />
 <PlansGrid />
 </div>

 <PlanModal />

 {toast && (
 <AdminToast message={toast.message} type={toast.type} onClose={hideToast} />
 )}
 </div>
 );
}

export default function PlansMain({ initialData }: { initialData?: PlansInitialData | null }) {
 return (
 <PlansProvider initialData={initialData}>
 <PlansContent />
 </PlansProvider>
 );
}
