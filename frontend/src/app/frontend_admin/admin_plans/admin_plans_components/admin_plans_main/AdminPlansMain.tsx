// RESPONSIBILITY: Client entry point for Plans; owns the single query/hook instance and passes its controlled view state to children.
"use client";
import { useAdminPlansLogic } from '@/app/frontend_admin/admin_plans/admin_plans_hooks/useAdminPlansLogic';
import AdminPlansToolbar from '@/app/frontend_admin/admin_plans/admin_plans_components/admin_plans_toolbar/AdminPlansToolbar';
import AdminPlansGrid from '@/app/frontend_admin/admin_plans/admin_plans_components/admin_plans_grid/AdminPlansGrid';
import AdminPlansModal from '@/app/frontend_admin/admin_plans/admin_plans_components/admin_plans_modal/AdminPlansModal';

/**
 * AdminPlansMain renders the admin plans main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminPlansMain: Client entry point for Plans; owns the single query/hook instance and passes its controlled view state to children.
 * @dependencies Consumes useAdminPlansLogic, AdminPlansToolbar, AdminPlansGrid, AdminPlansModal.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminPlansMain() {
  const logic = useAdminPlansLogic();
  return (
    <div className="min-h-full pb-10">
      <div className="space-y-5 p-6">
        <AdminPlansToolbar logic={logic} />
        <AdminPlansGrid logic={logic} />
      </div>
      <AdminPlansModal />
    </div>
  );
}

