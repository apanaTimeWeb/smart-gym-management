// RESPONSIBILITY: Owns the Admin usage upgrade-request use case and its audit event.
// FLOW: Usage command controller â†’ command service â†’ master repository â†’ audit trail.

import { Injectable } from '@nestjs/common';
import { CoreAuditTrailService } from '@/backend_admin/core/audit/core-audit-trail.service';
import { AdminUsageRepository } from '@/backend_admin/modules/admin/usage/repositories/admin-usage-repository';

@Injectable()
export class AdminUsageCommandService {
  constructor(
    private readonly repository: AdminUsageRepository,
    private readonly auditTrail: CoreAuditTrailService,
  ) {}

  /** @description Creates an idempotent subscription plan upgrade request in the master database. @param input Validated frontend request. @returns Frontend upgrade-request contract. */
  async createUpgradeRequest(input: Record<string, unknown>): Promise<Record<string, unknown>> {
    const planName = typeof input.planName === 'string' ? input.planName : '';
    const response = await this.repository.createMasterUpgradeRequest(planName);
    await this.audit(response.requestId as string, 'UPGRADE_REQUEST_CREATED', { planName: response.planName, status: response.status });
    return response;
  }

  private async audit(entityId: string, action: string, newValue: Record<string, unknown>): Promise<string> {
    return this.auditTrail.record({ action: `ADMIN.USAGE.${action}`, entityType: 'UpgradeRequest', entityId, oldValue: null, newValue, severity: 'low', module: 'Settings' });
  }
}
