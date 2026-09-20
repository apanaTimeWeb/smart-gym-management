"use client";
// RESPONSIBILITY: Client orchestrator for the branches module.

import AdminBranchesToolbar from '@/app/admin/branches/branches_components/AdminBranchesToolbar/AdminBranchesToolbar';
import AdminBranchesCard from '@/app/admin/branches/branches_components/AdminBranchesCard/AdminBranchesCard';
import AdminBranchesDetailDrawer from '@/app/admin/branches/branches_components/AdminBranchesDetailDrawer/AdminBranchesDetailDrawer';

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