"use client";
// RESPONSIBILITY: Empty state illustration shown when the members list is empty.
import { Users, UserPlus } from "lucide-react";
import { useAdminMembersContext } from "@/app/admin/members/members_context/AdminMembersContext";

export default function AdminMembersEmptyState() {
  const { openAdd } = useAdminMembersContext();
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Users className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-lg font-bold text-text-primary mb-2">No Members Yet</h3>
      <p className="text-text-secondary text-sm max-w-sm mb-6">
        Your gym has no members matching the current filters. Add a new member to get started.
      </p>
      <button
        onClick={openAdd}
        className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-black font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
      >
        <UserPlus className="w-4 h-4" /> Add First Member
      </button>
    </div>
  );
}
