import { AuditLog } from './entities/audit-log.entity';

export interface AuditLogResponse {
  data: AuditLog[];
  total: number;
}
