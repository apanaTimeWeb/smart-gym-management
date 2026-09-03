// RESPONSIBILITY: Entry point for the Plans module. Sets up the Context provider and composes AdminPlansToolbar, AdminPlansGrid, and AdminPlansModal.
'use client';

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import AdminToast from '@/app/admin/admin_components/AdminFeedback/AdminToast';

import { PlansProvider, usePlansContext } from '@/app/admin/plans/plans_context/PlansContext';
import AdminPlansToolbar from '@/app/admin/plans/plans_components/AdminPlansToolbar/AdminPlansToolbar';
import AdminPlansGrid from '@/app/admin/plans/plans_components/AdminPlansGrid/AdminPlansGrid';
import AdminPlansModal from '@/app/admin/plans/plans_components/AdminPlansModal/AdminPlansModal';
import type { PlansInitialData } from '@/app/admin/plans/plans_types/plans_types';

function PlansContent() {
 const { toast, hideToast } = usePlansContext();

 return (
 <div className="min-h-full pb-10">
 <AdminHeader title="Membership Plans" subtitle="Manage subscription plans, pricing, and features" />
 <div className="p-6 space-y-5">
 <AdminPlansToolbar />
 <AdminPlansGrid />
 </div>

 <AdminPlansModal />

 {toast && (
 <AdminToast message={toast.message} type={toast.type} onClose={hideToast} />
 )}
 </div>
 );
}

export default function AdminPlansMain({ initialData }: { initialData?: PlansInitialData | null }) {
 return (
 <PlansProvider initialData={initialData}>
 <PlansContent />
 </PlansProvider>
 );
}
