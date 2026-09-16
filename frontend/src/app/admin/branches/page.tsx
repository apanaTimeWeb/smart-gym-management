import { Suspense } from 'react';
// RESPONSIBILITY: Server Component entry point for /admin/branches. Rule 8 compliant — no , no AdminHeader import.
import type { Metadata } from 'next';
import AdminBranchesMain from '@/app/admin/branches/branches_components/AdminBranchesMain/AdminBranchesMain';

export const metadata: Metadata = { title: 'Branches | Admin | GymSmart', description: 'Overview of all gym locations.' };

export default function AdminBranchesPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <AdminBranchesMain />
    </Suspense>
  );
}