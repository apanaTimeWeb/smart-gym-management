// RESPONSIBILITY: Writes mutation audit records for HTTP, job, event, webhook, and command entry points.
// FLOW: Mutation/orchestrator → CoreAuditTrailService → tenant audit_logs repository.

import { Injectable } from '@nestjs/common';
import { CoreRequestContextService } from '@/core/context/core-request-context.service';
import { CoreTenantDataSourceManager } from '@/core/database/core-tenant-data-source.manager';
import { CoreAuditLogEntity } from '@/core/audit/core-audit-log.entity';

export interface CoreAuditRecordInput {
  action: string;
  entityType: string;
  entityId?: string | null;
  oldValue?: unknown;
  newValue?: unknown;
  ipAddress?: string | null;
  module?: string | null;
  severity?: string;
}

@Injectable()
export class CoreAuditTrailService {
  constructor(private readonly tenantManager: CoreTenantDataSourceManager, private readonly context: CoreRequestContextService) {}

  /** @description Persists an immutable audit entry within the current trusted tenant database. @param input Mutation audit facts. @returns Created audit UUID. */
  async record(input: CoreAuditRecordInput): Promise<string> {
    const source = await this.tenantManager.getCurrent();
    const entity = source.getRepository(CoreAuditLogEntity).create({
      actorId: this.context.get().userId || null,
      actorRole: this.context.get().userRole || null,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId ?? null,
      oldValue: input.oldValue ?? null,
      newValue: input.newValue ?? null,
      ipAddress: input.ipAddress ?? null,
      module: input.module ?? null,
      severity: input.severity ?? 'low',
    });
    const saved = await source.getRepository(CoreAuditLogEntity).save(entity);
    return saved.id;
  }
}
