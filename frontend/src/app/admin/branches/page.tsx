// RESPONSIBILITY: Server Component entry point for /admin/branches. Rule 8 compliant — no 'use client', no AdminHeader import.
import type { Metadata } from 'next';
import AdminBranchesMain from '@/app/admin/branches/branches_components/AdminBranchesMain/AdminBranchesMain';

export const metadata: Metadata = { title: 'Branches | Admin | GymSmart', description: 'Overview of all gym locations.' };

export default function AdminBranchesPage() {
  return <AdminBranchesMain />;
}
