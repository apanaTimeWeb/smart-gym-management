// RESPONSIBILITY: Owns write-side use cases for Admin data-export; persistence remains behind the feature repository.
// FLOW: AdminDataExportCommandController -> AdminDataExportCommandService -> named repository mutation -> audit trail.
import { Injectable } from '@nestjs/common';

import { AdminCoreAuditTrailService } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-trail.service.js';
import { AdminCoreAuditSeverity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit.constants.js';
import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service.js';
import { AdminCoreEventBusService } from '@/backend_admin/admin_core/admin_core_events/admin-core-event-bus.service.js';
import { CORE_EVENT_REGISTRY } from '@/backend_admin/admin_core/admin_core_events/admin-core-event-registry.constants.js';
import { AdminCoreJobQueueService } from '@/backend_admin/admin_core/admin_core_jobs/admin-core-job-queue.service.js';

import { AdminDataExportMutationDto } from '@/backend_admin/admin_modules/admin_data-export/data-export_dtos/admin-data-export-mutation.dto.js';
import { AdminDataExportResponsePresenter } from '@/backend_admin/admin_modules/admin_data-export/data-export_mappers/admin-data-export.response.presenter.js';
import { AdminDataExportRepository } from '@/backend_admin/admin_modules/admin_data-export/data-export_repositories/admin-data-export-repository.js';

@Injectable()
/**
 * @description Defines the AdminDataExportCommandService boundary for the admin_data-export backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDataExportCommandService {
  constructor(
    private readonly repository: AdminDataExportRepository,
    private readonly presenter: AdminDataExportResponsePresenter,
    private readonly auditTrail: AdminCoreAuditTrailService,
    private readonly jobQueue: AdminCoreJobQueueService,
    private readonly eventBus: AdminCoreEventBusService,
    private readonly requestContext: AdminCoreRequestContextService,
  ) {}

  /**
   * @description Executes the createExport mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async createExportJob(input: AdminDataExportMutationDto): Promise<Record<string, unknown>> {
    const entity = await this.repository.createExportJob(input);
    await this.jobQueue.enqueue('admin-data-export', 'ADMIN.DATA_EXPORT.GENERATE', entity.id, input as any);
    this.requestContext.deferUntilCommit(() => this.eventBus.emit(CORE_EVENT_REGISTRY.ADMIN_EXPORT_CREATED, { jobId: entity.id, tenantId: this.requestContext.get().tenantId }));
    return this.createResponse(entity, 'CREATED');
  }

  /**
   * @description Executes the deleteJob mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async deleteDataExport(id: string): Promise<null> {
    await this.repository.deleteDataExport(id);
    await this.createAudit(id, 'DELETED', { deleted: true });
    return null;
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async createResponse(entity: Awaited<ReturnType<AdminDataExportRepository['findByIdOrThrow']>>, action: string): Promise<Record<string, unknown>> {
    const response = this.presenter.toResponse(entity as any);
    await this.createAudit(entity.id, action, response);
    return response;
  }

  /**
   * @description Persists an immutable audit record for the current feature mutation.
   * @param entityId Changed record UUID.
   * @param action Audit action.
   * @param newValue New-state summary.
   * @returns Audit record UUID.
   */
  private async createAudit(entityId: string, action: string, newValue: Record<string, unknown>): Promise<string> {
    return this.auditTrail.record({ action: `ADMIN_${action}`, entityType: 'AdminFeature', entityId, newValue, severity: AdminCoreAuditSeverity.LOW, module: 'data-export' });
  }
}
