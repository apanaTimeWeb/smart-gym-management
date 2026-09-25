// RESPONSIBILITY: Owns the Admin usage upgrade-request use case and its audit event.
// FLOW: Usage command controller â†’ command service â†’ master repository â†’ audit trail.
import { Injectable } from '@nestjs/common';

import { AdminCoreAuditTrailService } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-trail.service'
import { AdminCoreAuditSeverity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit.constants'

import { AdminUsageMutationDto } from '@/backend_admin/admin_modules/admin_usage/usage_dtos/admin-usage-mutation.dto'
import { AdminUsageRepository } from '@/backend_admin/admin_modules/admin_usage/usage_repositories/admin-usage-repository'

@Injectable()
/**
 * @description Defines the AdminUsageCommandService boundary for the admin_usage backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminUsageCommandService {
  constructor(
    private readonly repository: AdminUsageRepository,
    private readonly auditTrail: AdminCoreAuditTrailService,
  ) {}

  /** @description Creates an idempotent subscription plan upgrade request in the master database. @param input Validated frontend request. @returns Frontend upgrade-request contract. */
  async createUpgradeRequest(input: AdminUsageMutationDto): Promise<Record<string, unknown>> {
    const planName = typeof input.planName === 'string' ? input.planName : '';
    const response = await this.repository.createMasterUpgradeRequest(planName);
    await this.createAudit(response.requestId as string, 'UPGRADE_REQUEST_CREATED', { planName: response.planName, status: response.status });
    return response;
  }

  /** @description Records an immutable usage-domain audit entry. @param entityId Changed upgrade-request identifier. @param action Audit action. @param newValue New-state summary. @returns Audit record UUID. */
  private async createAudit(entityId: string, action: string, newValue: Record<string, unknown>): Promise<string> {
    return this.auditTrail.record({ action: `ADMIN.USAGE.${action}`, entityType: 'UpgradeRequest', entityId, newValue, severity: AdminCoreAuditSeverity.LOW, module: 'usage' });
  }
}
