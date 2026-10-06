// Type contract owned by this module; extracted from the component signature for AI isolation.
import type { AuditLog } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_types/AdminAuditLogsTypes';

export interface AdminAuditLogsDetailDrawerProps {
  onClose: () => void;
  log: AuditLog | null;
  isOpen: boolean;
}
