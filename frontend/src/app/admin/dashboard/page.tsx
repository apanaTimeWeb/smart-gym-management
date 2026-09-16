import { Suspense } from 'react';
// RESPONSIBILITY: Server Component entry point for the admin dashboard.
import AdminDashboardMain from '@/app/admin/dashboard/dashboard_components/AdminDashboardMain/AdminDashboardMain';

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <AdminDashboardMain />
    </Suspense>
  );
}
