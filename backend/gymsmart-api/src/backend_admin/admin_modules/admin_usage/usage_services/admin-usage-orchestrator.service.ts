// RESPONSIBILITY: Owns the Admin usage multi-step master-database transaction boundary so the upgrade request and audit record commit atomically.
// FLOW: Usage command controller -> AdminUsageOrchestratorService -> Master UnitOfWork -> command service/repository -> audit.
import { Injectable } from '@nestjs/common';

import { AdminCoreMasterUnitOfWorkService } from '@/backend_admin/admin_core/admin_core_database/admin-core-master-unit-of-work.service.js';

import { AdminUsageMutationDto } from '@/backend_admin/admin_modules/admin_usage/usage_dtos/admin-usage-mutation.dto.js';
import { AdminUsageCommandService } from '@/backend_admin/admin_modules/admin_usage/usage_services/admin-usage-command.service.js';

@Injectable()
/**
 * @description Defines the AdminUsageOrchestratorService boundary for the admin_usage backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminUsageOrchestratorService {
  constructor(
    private readonly unitOfWork: AdminCoreMasterUnitOfWorkService,
    private readonly commandService: AdminUsageCommandService,
  ) {}

  /**
   * @description Executes upgrade-request creation and its audit record as one master-database unit of work.
   * @param input Validated frontend mutation.
   * @returns Frontend upgrade-request contract.
   * @remarks The UnitOfWork reuses any outer master transaction so HTTP interceptors and feature orchestration cannot create nested transactions.
   */
  async createUpgradeRequest(input: AdminUsageMutationDto): Promise<Record<string, unknown>> {
    return this.unitOfWork.run(() => this.commandService.createUpgradeRequest(input));
  }
}
