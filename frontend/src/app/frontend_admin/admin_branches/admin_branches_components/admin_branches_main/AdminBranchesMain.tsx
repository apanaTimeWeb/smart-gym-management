// RESPONSIBILITY: Client orchestrator for the branches module.
"use client";

import AdminBranchesToolbar from '@/app/frontend_admin/admin_branches/admin_branches_components/admin_branches_toolbar/AdminBranchesToolbar';
import AdminBranchesCard from '@/app/frontend_admin/admin_branches/admin_branches_components/admin_branches_card/AdminBranchesCard';
import AdminBranchesDetailDrawer from '@/app/frontend_admin/admin_branches/admin_branches_components/admin_branches_detail_drawer/AdminBranchesDetailDrawer';

/**
 * AdminBranchesMain renders the admin branches main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminBranchesMain: Client orchestrator for the branches module.
 * @dependencies Consumes AdminBranchesToolbar, AdminBranchesCard, AdminBranchesDetailDrawer.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBranchesMain() {
  return (
    <div className="min-h-full pb-10">
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <AdminBranchesToolbar />
        <AdminBranchesCard />
      </div>
      <AdminBranchesDetailDrawer />
    </div>
  );
}