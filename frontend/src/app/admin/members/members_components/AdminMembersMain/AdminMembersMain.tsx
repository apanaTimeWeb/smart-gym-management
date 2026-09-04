"use client";
// RESPONSIBILITY: Orchestrator component that assembles the Admin Members list view.
// DATA FLOW: AdminMembersProvider ? AdminMembersMain ? all sub-components
import AdminMembersKPIs from "@/app/admin/members/members_components/AdminMembersKPIs/AdminMembersKPIs";
import AdminMembersToolbar from "@/app/admin/members/members_components/AdminMembersToolbar/AdminMembersToolbar";
import AdminMembersTable from "@/app/admin/members/members_components/AdminMembersTable/AdminMembersTable";
import AdminMembersModal from "@/app/admin/members/members_components/AdminMembersModal/AdminMembersModal";

export default function AdminMembersMain() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Members</h1>
        <p className="text-sm text-text-secondary mt-1">Manage all gym members, memberships, and payments.</p>
      </div>
      <AdminMembersKPIs />
      <AdminMembersToolbar />
      <AdminMembersTable />
      <AdminMembersModal />
    </div>
  );
}
