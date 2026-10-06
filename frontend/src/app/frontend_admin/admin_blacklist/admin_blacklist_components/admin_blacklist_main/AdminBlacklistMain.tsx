"use client";
// RESPONSIBILITY: Main entry point for the Blacklist module.
import AdminBlacklistKPIs from '@/app/frontend_admin/admin_blacklist/admin_blacklist_components/admin_blacklist_kpis/AdminBlacklistKPIs';
import AdminBlacklistToolbar from '@/app/frontend_admin/admin_blacklist/admin_blacklist_components/admin_blacklist_toolbar/AdminBlacklistToolbar';
import AdminBlacklistTable from '@/app/frontend_admin/admin_blacklist/admin_blacklist_components/admin_blacklist_table/AdminBlacklistTable';
import AdminBlacklistModal from '@/app/frontend_admin/admin_blacklist/admin_blacklist_components/admin_blacklist_modal/AdminBlacklistModal';
import AdminBlacklistTabs from '@/app/frontend_admin/admin_blacklist/admin_blacklist_components/admin_blacklist_tabs/AdminBlacklistTabs';
import AdminBlacklistCrossGymView from '@/app/frontend_admin/admin_blacklist/admin_blacklist_components/admin_blacklist_cross_gym_view/AdminBlacklistCrossGymView';
import { useAdminBlacklistLogic } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_hooks/useAdminBlacklistLogic';

/**
 * AdminBlacklistMain renders the admin blacklist main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminBlacklistMain: Main entry point for the Blacklist module.
 * @dependencies Consumes AdminBlacklistKPIs, AdminBlacklistToolbar, AdminBlacklistTable, AdminBlacklistModal, AdminBlacklistTabs.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBlacklistMain() {
  const { activeTab } = useAdminBlacklistLogic();

  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-5">
        <AdminBlacklistKPIs />
        <AdminBlacklistTabs />
        {activeTab === 'all' ? (
          <>
            <AdminBlacklistToolbar />
            <AdminBlacklistTable />
          </>
        ) : (
          <AdminBlacklistCrossGymView />
        )}
      </div>
      <AdminBlacklistModal />
    </div>
  );
}