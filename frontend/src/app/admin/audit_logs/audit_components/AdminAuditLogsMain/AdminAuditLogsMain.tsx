"use client";
// RESPONSIBILITY: Main orchestrator for the Audit Logs module.
import AdminAuditLogsKPIs from '@/app/admin/audit_logs/audit_components/AdminAuditLogsKPIs/AdminAuditLogsKPIs';
import AdminAuditLogsToolbar from '@/app/admin/audit_logs/audit_components/AdminAuditLogsToolbar/AdminAuditLogsToolbar';
import AdminAuditLogsTable from '@/app/admin/audit_logs/audit_components/AdminAuditLogsTable/AdminAuditLogsTable';

export default function AdminAuditLogsMain() {
  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-5">
        <AdminAuditLogsKPIs />
        <AdminAuditLogsToolbar />
        <AdminAuditLogsTable />
      </div>
    </div>
  );
}