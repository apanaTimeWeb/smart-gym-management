import { AuditLog } from './entities/audit-log.entity';

export interface AuditLogResponse {
  success: boolean;
  message: string;
  data: AuditLog[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}
