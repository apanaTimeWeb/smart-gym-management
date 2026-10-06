"use client";
// RESPONSIBILITY: Main entry point for Admin Members module. Composes KPIs, toolbar, table, and profile drawer.
import AdminMembersKPIs from '@/app/frontend_admin/admin_members/admin_members_components/admin_members_kpis/AdminMembersKPIs';
import AdminMembersToolbar from '@/app/frontend_admin/admin_members/admin_members_components/admin_members_toolbar/AdminMembersToolbar';
import AdminMembersTable from '@/app/frontend_admin/admin_members/admin_members_components/admin_members_table/AdminMembersTable';
import AdminMembersProfileDrawer from '@/app/frontend_admin/admin_members/admin_members_components/admin_members_profile_drawer/AdminMembersProfileDrawer';
import { useAdminMembersLogic } from '@/app/frontend_admin/admin_members/admin_members_hooks/useAdminMembersLogic';
import { useRouter, useSearchParams } from 'next/navigation';
import { ADMIN_MEMBERS_ROUTES } from '@/app/frontend_admin/admin_members/admin_members_url_config';

/**
 * AdminMembersMain renders the admin members main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminMembersMain: Main entry point for Admin Members module. Composes KPIs, toolbar, table, and profile drawer.
 * @dependencies Consumes AdminMembersKPIs, AdminMembersToolbar, AdminMembersTable, AdminMembersProfileDrawer, useAdminMembersLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminMembersMain() {
  const { selectedMember, setSelectedMember } = useAdminMembersLogic();
  const router = useRouter();
  const searchParams = useSearchParams();
  const closeMember = () => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete('memberId');
    router.replace(`${ADMIN_MEMBERS_ROUTES.root}${next.toString() ? `?${next.toString()}` : ''}`, { scroll: false });
    setSelectedMember(null);
  };

  return (
    <div className="min-h-full pb-10 bg-page text-primary">
      <div className="p-6 space-y-5">
        <AdminMembersKPIs />
        <div className="bg-card rounded-xl border border-border p-4 space-y-4">
          <AdminMembersToolbar />
          <AdminMembersTable />
        </div>
      </div>

      {selectedMember && (
        <AdminMembersProfileDrawer
          member={selectedMember}
          onClose={closeMember}
        />
      )}
    </div>
  );
}
