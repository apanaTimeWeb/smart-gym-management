// RESPONSIBILITY: Writes immutable audit records for critical Superadmin mutations.
// FLOW: Mutation service -> AuditTrailService -> audit_logs repository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { getRequestContext } from '@/backend_superadmin/core/observability/request-context';
@Injectable()
export class AuditTrailService {
  constructor(private readonly dataSource: DataSource) {}
  /** Records a state-changing action with request context metadata. */
  async record(action: string, entityType: string, entityId: string, oldValue: unknown, newValue: unknown): Promise<void> {
    const ctx = getRequestContext();
    await this.dataSource.query('INSERT INTO audit_logs (id, actor_id, actor_role, action, entity_type, entity_id, old_value, new_value, ip_address, tenant_id, created_at, updated_at) VALUES (substring(md5(random()::text || clock_timestamp()::text),1,32), $1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8, $9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)', [ctx?.userId ?? 'system', 'SUPERADMIN', action, entityType, entityId, JSON.stringify(oldValue ?? null), JSON.stringify(newValue ?? null), 'request-context', ctx?.tenantId]);
  }
}
