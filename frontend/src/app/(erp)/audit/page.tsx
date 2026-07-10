import React from 'react';
import AuditMain from '@/app/(erp)/audit/audit_components/AuditMain/AuditMain';

export const metadata = {
  title: 'Audit Logs | Smart Gym Management',
  description: 'View and filter system audit logs for security and tracking.',
};

export default function AuditPage() {
  return <AuditMain />;
}
