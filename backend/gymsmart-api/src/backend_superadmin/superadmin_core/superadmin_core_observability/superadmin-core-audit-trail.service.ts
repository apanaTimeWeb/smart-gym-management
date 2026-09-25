// RESPONSIBILITY: Exposes explicit audit writing for business flows that have no entity mutation boundary (for example external side effects).
// FLOW: Business/orchestration boundary -> SuperadminCoreAuditTrailService -> audit_logs persistence.
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { DataSource } from 'typeorm';
import { getTenantDataSource } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-datasource-context';

/**
 * Primary Intent: Defines SuperadminAuditTrailRecordInput as the interface-level contract for superadmin-core-audit-trail.service.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminAuditTrailRecordInput { actorId: string; actorRole: string; action: string; entityType: string; entityId: string; oldValue: unknown; newValue: unknown; ipAddress: string; tenantId: string | null; }

/**
 * Primary Intent: Defines SuperadminCoreAuditTrailService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreAuditTrailService {
  constructor(private readonly dataSource: DataSource) {}
/**
 * Primary Intent: Executes the record use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the record use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async record(input: SuperadminAuditTrailRecordInput): Promise<void> {
    const dataSource = getTenantDataSource() ?? this.dataSource;
    await dataSource.query('INSERT INTO audit_logs (id, actor_id, actor_role, action, entity_type, entity_id, old_value, new_value, ip_address, tenant_id, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb,$8::jsonb,$9,$10,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)', [randomUUID(), input.actorId, input.actorRole, input.action.slice(0, 500), input.entityType.slice(0, 500), input.entityId.slice(0, 500), JSON.stringify(input.oldValue ?? null), JSON.stringify(input.newValue ?? null), input.ipAddress.slice(0, 255), input.tenantId]);
  }
}
