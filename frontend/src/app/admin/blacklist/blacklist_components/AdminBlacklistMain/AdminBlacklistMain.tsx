// RESPONSIBILITY: Main entry point for the Blacklist module.
'use client';

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import AdminBlacklistKPIs from '@/app/admin/blacklist/blacklist_components/AdminBlacklistKPIs/AdminBlacklistKPIs';
import AdminBlacklistToolbar from '@/app/admin/blacklist/blacklist_components/AdminBlacklistToolbar/AdminBlacklistToolbar';
import AdminBlacklistTable from '@/app/admin/blacklist/blacklist_components/AdminBlacklistTable/AdminBlacklistTable';
import AdminBlacklistModal from '@/app/admin/blacklist/blacklist_components/AdminBlacklistModal/AdminBlacklistModal';
import AdminBlacklistTabs from '@/app/admin/blacklist/blacklist_components/AdminBlacklistTabs/AdminBlacklistTabs';
import AdminBlacklistCrossGymView from '@/app/admin/blacklist/blacklist_components/AdminBlacklistCrossGymView/AdminBlacklistCrossGymView';
import { useAdminBlacklistLogic } from '@/app/admin/blacklist/blacklist_context/useAdminBlacklistLogic';

export default function AdminBlacklistMain() {
  const { activeTab } = useAdminBlacklistLogic();

  return (
    <div className="min-h-full pb-10">
      <AdminHeader title="Blacklist" subtitle="Manage cross-gym member bans — global or branch-specific" />
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
