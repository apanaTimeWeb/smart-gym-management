// RESPONSIBILITY: Server Component entry point for the Admin Members page.
import type { Metadata } from "next";
import { AdminMembersProvider } from "@/app/admin/members/members_context/AdminMembersContext";
import AdminMembersMain from "@/app/admin/members/members_components/AdminMembersMain/AdminMembersMain";

export const metadata: Metadata = {
  title: "Members | Admin � GymSmart",
  description: "Manage gym members, memberships, payments, and profiles.",
};

export default function AdminMembersPage() {
  return (
    <AdminMembersProvider>
      <AdminMembersMain />
    </AdminMembersProvider>
  );
}
