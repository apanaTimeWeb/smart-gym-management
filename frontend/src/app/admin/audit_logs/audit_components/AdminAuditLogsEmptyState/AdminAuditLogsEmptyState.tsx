// RESPONSIBILITY: Renders the empty state for the Admin audit log table.

import { ShieldAlert } from 'lucide-react';

export default function AdminAuditLogsEmptyState() {
  return <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
    <ShieldAlert size={32} aria-hidden="true" className="text-secondary" />
    <h3 className="text-base font-semibold text-primary">No audit logs found</h3>
    <p className="text-sm text-secondary">No log events match the current filters.</p>
  </div>;
}
