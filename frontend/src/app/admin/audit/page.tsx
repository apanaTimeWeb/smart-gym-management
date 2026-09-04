import type { Metadata } from "next";
import { AdminAuditProvider } from "@/app/admin/audit/audit_context/AdminAuditContext";
import AdminAuditToolbar from "@/app/admin/audit/audit_components/AdminAuditToolbar/AdminAuditToolbar";
import AdminAuditTable from "@/app/admin/audit/audit_components/AdminAuditTable/AdminAuditTable";
export const metadata: Metadata = { title: "Audit Logs | Admin � GymSmart", description: "View system audit logs." };
export default function AdminAuditPage() {
  return <AdminAuditProvider><div className="p-6 max-w-7xl mx-auto space-y-6"><div><h1 className="text-2xl font-bold text-text-primary">Audit Logs</h1><p className="text-sm text-text-secondary mt-1">Track and monitor administrative actions across the system.</p></div><AdminAuditToolbar /><AdminAuditTable /></div></AdminAuditProvider>;
}
