"use client";
// RESPONSIBILITY: Client entry point for Plans; owns the single query/hook instance and passes its controlled view state to children.
import { useAdminPlansLogic } from '@/app/admin/plans/plans_context/useAdminPlansLogic';
import AdminPlansToolbar from '@/app/admin/plans/plans_components/AdminPlansToolbar/AdminPlansToolbar';
import AdminPlansGrid from '@/app/admin/plans/plans_components/AdminPlansGrid/AdminPlansGrid';
import AdminPlansModal from '@/app/admin/plans/plans_components/AdminPlansModal/AdminPlansModal';
import type { PlansInitialData } from '@/app/admin/plans/plans_types/AdminPlansTypes';

export default function AdminPlansMain({ initialData }: { initialData?: PlansInitialData | null }) {
  const logic = useAdminPlansLogic(initialData);
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

