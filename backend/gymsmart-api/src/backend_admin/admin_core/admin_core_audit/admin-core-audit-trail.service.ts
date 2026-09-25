// RESPONSIBILITY: Writes mutation audit records for HTTP, job, event, webhook, and command entry points.
// FLOW: Mutation/orchestrator â†’ AdminCoreAuditTrailService â†’ tenant audit_logs repository.
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { AdminCoreAuditLogEntity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-log.entity'
import { AdminCoreAuditSeverity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit.constants'
import { AdminCoreMasterAuditLogEntity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-master-audit-log.entity'
import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service'
import { AdminCoreTenantDataSourceManager } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.manager'

import type { DataSource, Repository } from 'typeorm';

export interface AdminCoreAuditRecordInput {
  action: string;
  entityType: string;
  entityId?: string | null;
  oldValue?: unknown;
  newValue?: unknown;
  ipAddress?: string | null;
  userAgent?: string | null;
  module?: string | null;
  severity?: AdminCoreAuditSeverity;
}

@Injectable()
/**
 * @description Defines the AdminCoreAuditTrailService boundary for the admin_core_audit backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreAuditTrailService {
  constructor(
    private readonly tenantManager: AdminCoreTenantDataSourceManager,
    private readonly context: AdminCoreRequestContextService,
    @InjectDataSource() private readonly masterDataSource: DataSource,
  ) {}

  /** @description Persists an immutable audit entry within the current trusted tenant database. @param input Mutation audit facts. @returns Created audit UUID. */
  async record(input: AdminCoreAuditRecordInput): Promise<string> {
    const current = this.context.tryGet();
    const repository = await this.resolveAuditRepository(current);
    const entity = repository.create(this.buildAuditEntity(input, current));
    const saved = await repository.save(entity);
    return saved.id;
  }

  /** @description Resolves the correct master or tenant audit repository for the current trusted transaction context. @param current Request context. @returns Audit repository. */
  private async resolveAuditRepository(current?: import('@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service.js').AdminCoreRequestContext): Promise<Repository<AdminCoreAuditLogEntity> | Repository<AdminCoreMasterAuditLogEntity>> {
    if (!current) return this.masterDataSource.getRepository(AdminCoreMasterAuditLogEntity);
    if (current.masterEntityManager) return current.masterEntityManager.getRepository(AdminCoreMasterAuditLogEntity);
    if (current.entityManager) return current.entityManager.getRepository(AdminCoreAuditLogEntity);
    return (await this.tenantManager.getCurrent()).getRepository(AdminCoreAuditLogEntity);
  }

  /** @description Builds a privacy-safe immutable audit entity payload from trusted request metadata and mutation snapshots. @param input Audit facts. @param current Request context. @returns Persistence-ready audit fields. */
  private buildAuditEntity(input: AdminCoreAuditRecordInput, current?: import('@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service.js').AdminCoreRequestContext): Record<string, unknown> {
    const mutationBefore = this.context.tryGet()?.mutationBefore;
    const consumedMutationBefore = mutationBefore !== undefined ? this.context.consumeMutationBefore() : null;
    return {
      actorId: current?.userId || null,
      actorRole: current?.userRole || null,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId ?? null,
      oldValue: input.oldValue ?? consumedMutationBefore,
      newValue: input.newValue ?? null,
      ipAddress: input.ipAddress ?? current?.ipAddress ?? null,
      userAgent: input.userAgent ?? current?.userAgent ?? null,
      module: input.module ?? null,
      severity: input.severity ?? AdminCoreAuditSeverity.LOW,
    };
  }
}
