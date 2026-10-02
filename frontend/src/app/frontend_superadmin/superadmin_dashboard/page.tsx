// RESPONSIBILITY: Server Component entry point for the Dashboard page. Delegates rendering to SuperadminDashboardMain.
import SuperadminDashboardMain from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_components/superadmin_dashboard_main/SuperadminDashboardMain';
import SuperadminLayoutRoleProviders from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutRoleProviders';
import { SuperadminLayoutErrorBoundary } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_error_boundary/SuperadminLayoutErrorBoundary';



/**
 * @description Server Component entry point for the Dashboard page. Delegates rendering to SuperadminDashboardMain.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function SaaSDashboardPage() {
    return (<SuperadminLayoutRoleProviders><SuperadminLayoutErrorBoundary>
      <SuperadminDashboardMain />
    </SuperadminLayoutErrorBoundary></SuperadminLayoutRoleProviders>);
}
