// RESPONSIBILITY: Server Component entry point for /admin/branches. Rule 8 compliant — no 'use client', no AdminHeader import.
import type { Metadata } from 'next';
import AdminBranchesToolbar from '@/app/admin/branches/branches_components/AdminBranchesToolbar/AdminBranchesToolbar';
import AdminBranchCard from '@/app/admin/branches/branches_components/AdminBranchCard/AdminBranchCard';
import AdminBranchDetailDrawer from '@/app/admin/branches/branches_components/AdminBranchDetailDrawer/AdminBranchDetailDrawer';

export const metadata: Metadata = { title: 'Branches | Admin | GymSmart', description: 'Overview of all gym locations.' };

export default function AdminBranchesPage() {
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
