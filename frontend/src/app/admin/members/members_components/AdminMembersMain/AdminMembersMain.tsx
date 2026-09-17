"use client";
// RESPONSIBILITY: Main entry point for Admin Members module. Composes KPIs, toolbar, table, and profile drawer.
import AdminMembersKPIs from '@/app/admin/members/members_components/AdminMembersKPIs/AdminMembersKPIs';
import AdminMembersToolbar from '@/app/admin/members/members_components/AdminMembersToolbar/AdminMembersToolbar';
import AdminMembersTable from '@/app/admin/members/members_components/AdminMembersTable/AdminMembersTable';
import AdminMembersProfileDrawer from '@/app/admin/members/members_components/AdminMembersProfileDrawer/AdminMembersProfileDrawer';
import { useAdminMembersLogic } from '@/app/admin/members/members_context/useAdminMembersLogic';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdminMembersUrlConfig } from '@/app/admin/members/admin_members_url_config';

export default function AdminMembersMain() {
  const { selectedMember, setSelectedMember } = useAdminMembersLogic();
  const router = useRouter();
  const searchParams = useSearchParams();
  const closeMember = () => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete('memberId');
    router.replace(`${AdminMembersUrlConfig.root}${next.toString() ? `?${next.toString()}` : ''}`, { scroll: false });
    setSelectedMember(null);
  };

  return (
    <div className="min-h-full pb-10 bg-background text-foreground">
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