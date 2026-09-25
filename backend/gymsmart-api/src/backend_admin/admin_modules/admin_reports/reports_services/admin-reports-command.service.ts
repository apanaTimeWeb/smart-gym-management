// RESPONSIBILITY: Owns write-side use cases for Admin reports; persistence remains behind the feature repository.
// FLOW: AdminReportsCommandController -> AdminReportsCommandService -> named repository mutation -> audit trail.
import { Injectable } from '@nestjs/common';

import { AdminCoreAuditTrailService } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-trail.service'
import { AdminCoreAuditSeverity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit.constants'
import { AdminCoreJobQueueService } from '@/backend_admin/admin_core/admin_core_jobs/admin-core-job-queue.service'

import { AdminReportsMutationDto } from '@/backend_admin/admin_modules/admin_reports/reports_dtos/admin-reports-mutation.dto'
import { AdminReportsExportResponseDto } from '@/backend_admin/admin_modules/admin_reports/reports_dtos/admin-reports-response.dto'
import { AdminReportsRepository } from '@/backend_admin/admin_modules/admin_reports/reports_repositories/admin-reports-repository'

@Injectable()
/**
 * @description Defines the AdminReportsCommandService boundary for the admin_reports backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminReportsCommandService {
  constructor(
    private readonly repository: AdminReportsRepository,
    private readonly auditTrail: AdminCoreAuditTrailService,
    private readonly jobQueue: AdminCoreJobQueueService
  ) {}

  /**
   * @description Executes the exportReport mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async createExportJob(input: AdminReportsMutationDto): Promise<AdminReportsExportResponseDto> {
    const entity = await this.repository.createExportJob(input);
    await this.jobQueue.enqueue('admin-reports', 'ADMIN.REPORTS.GENERATE', entity.id, input as any);
    await this.createAudit(entity.id, 'CREATED', { status: 'processing', tab: input.tab ?? null, format: input.format ?? null });
    const extension = input.format === 'excel' ? 'xlsx' : 'pdf';
    return { url: `/api/v1/admin/reports/export/${entity.id}/download`, fileName: `report-${entity.id}.${extension}` };
  }

  /**
   * @description Persists an immutable audit record for the current feature mutation.
   * @param entityId Changed record UUID.
   * @param action Audit action.
   * @param newValue New-state summary.
   * @returns Audit record UUID.
   */
  private async createAudit(entityId: string, action: string, newValue: Record<string, unknown>): Promise<string> {
    return this.auditTrail.record({ action: `ADMIN_${action}`, entityType: 'AdminFeature', entityId, newValue, severity: AdminCoreAuditSeverity.LOW, module: 'reports' });
  }
}
