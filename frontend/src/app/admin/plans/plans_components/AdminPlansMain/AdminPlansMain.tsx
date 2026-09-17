"use client";
// RESPONSIBILITY: Entry point for the Plans module. Sets up the Context provider and composes AdminPlansToolbar, AdminPlansGrid, and AdminPlansModal.

import { useAdminPlansLogic } from '@/app/admin/plans/plans_context/useAdminPlansLogic';
import { useAdminPlansStore } from '@/app/admin/plans/plans_store/useAdminPlansStore';
import AdminPlansToolbar from '@/app/admin/plans/plans_components/AdminPlansToolbar/AdminPlansToolbar';
import AdminPlansGrid from '@/app/admin/plans/plans_components/AdminPlansGrid/AdminPlansGrid';
import AdminPlansModal from '@/app/admin/plans/plans_components/AdminPlansModal/AdminPlansModal';
import type { PlansInitialData } from '@/app/admin/plans/plans_types/AdminPlansTypes';

export default function AdminPlansMain({ initialData }: { initialData?: PlansInitialData | null }) {
  const { status } = useAdminPlansLogic(initialData);

  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-5">
        <AdminPlansToolbar />
        <AdminPlansGrid />
      </div>

      <AdminPlansModal />
    </div>
  );
}