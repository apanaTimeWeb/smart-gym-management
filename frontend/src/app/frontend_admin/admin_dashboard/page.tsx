// RESPONSIBILITY: Server Component entry point for the admin dashboard.
import AdminDashboardMain from '@/app/frontend_admin/admin_dashboard/admin_dashboard_components/admin_dashboard_main/AdminDashboardMain';

/**
 * DashboardPage is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function DashboardPage() {
  return (
      <AdminDashboardMain />
  );
}
