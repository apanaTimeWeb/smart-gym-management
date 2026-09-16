import { Suspense } from 'react';
// RESPONSIBILITY: Renders/orchestrates page for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import type { Metadata } from 'next';
import AdminAuditLogsMain from '@/app/admin/audit_logs/audit_components/AdminAuditLogsMain/AdminAuditLogsMain';

export const metadata: Metadata = {
  title: 'Audit Logs | Admin - GymSmart',
  description: 'Monitor system activity, security events, and audit trails.',
};

export default function AdminAuditLogsPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <AdminAuditLogsMain />
    </Suspense>
  );
}
