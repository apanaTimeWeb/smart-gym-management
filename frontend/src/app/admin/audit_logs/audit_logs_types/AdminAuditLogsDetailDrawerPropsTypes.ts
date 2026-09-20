import type { AuditLog } from '@/app/admin/audit_logs/audit_types/AdminAuditLogsTypes';

export type { AuditLog };

export interface AdminAuditLogsDetailDrawerProps {
  log: AuditLog | null;
  isOpen: boolean;
  onClose: () => void;
}
