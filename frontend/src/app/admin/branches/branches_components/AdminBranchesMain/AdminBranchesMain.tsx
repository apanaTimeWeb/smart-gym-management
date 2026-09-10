'use client';
// RESPONSIBILITY: Client orchestrator for the branches module.

import AdminBranchesToolbar from '@/app/admin/branches/branches_components/AdminBranchesToolbar/AdminBranchesToolbar';
import AdminBranchCard from '@/app/admin/branches/branches_components/AdminBranchCard/AdminBranchCard';
import AdminBranchDetailDrawer from '@/app/admin/branches/branches_components/AdminBranchDetailDrawer/AdminBranchDetailDrawer';

export default function AdminBranchesMain() {
  return (
    <div className="min-h-full pb-10">
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <AdminBranchesToolbar />
        <AdminBranchCard />
      </div>
      <AdminBranchDetailDrawer />
    </div>
  );
}
