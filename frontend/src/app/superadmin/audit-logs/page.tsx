// RESPONSIBILITY: Server Component entry point for the Audit Logs page. Delegates rendering to AuditLogsClient.
import AuditLogsClient from '@/app/superadmin/audit-logs/audit-logs_components/AuditLogsClient/AuditLogsClient';

export default function AuditLogsPage() {
  return <AuditLogsClient />;
}
