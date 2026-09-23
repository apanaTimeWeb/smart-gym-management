// RESPONSIBILITY: Exposes explicit audit writing for business flows that have no entity mutation boundary (for example external side effects).
// FLOW: Business/orchestration boundary -> SuperadminAuditTrailService -> audit_logs persistence.
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { DataSource } from 'typeorm';
import { getTenantDataSource } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-datasource-context';

export interface SuperadminAuditTrailRecordInput { actorId: string; actorRole: string; action: string; entityType: string; entityId: string; oldValue: unknown; newValue: unknown; ipAddress: string; tenantId: string | null; }

@Injectable()
export class SuperadminAuditTrailService {
  constructor(private readonly dataSource: DataSource) {}
  /** Persists a structured audit event for a non-ORM side effect boundary. */
  async record(input: SuperadminAuditTrailRecordInput): Promise<void> {
    const dataSource = getTenantDataSource() ?? this.dataSource;
    await dataSource.query('INSERT INTO audit_logs (id, actor_id, actor_role, action, entity_type, entity_id, old_value, new_value, ip_address, tenant_id, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb,$8::jsonb,$9,$10,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)', [randomUUID(), input.actorId, input.actorRole, input.action.slice(0, 500), input.entityType.slice(0, 500), input.entityId.slice(0, 500), JSON.stringify(input.oldValue ?? null), JSON.stringify(input.newValue ?? null), input.ipAddress.slice(0, 255), input.tenantId]);
  }
}
