import type { Metadata } from 'next';
import AdminAuditLogsMain from './audit_components/AdminAuditLogsMain';

export const metadata: Metadata = {
  title: 'Audit Logs | Admin - GymSmart',
  description: 'View system activity and audit trails.',
};

export default function AdminAuditLogsPage() {
  return (
    <div className="min-h-full pb-10 bg-background">
      <AdminAuditLogsMain />
    </div>
  );
}
