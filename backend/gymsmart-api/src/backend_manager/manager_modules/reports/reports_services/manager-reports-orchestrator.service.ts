// RESPONSIBILITY: Owns the reports transaction boundary and post-commit lifecycle-event emission; no direct repository access or business logic.
// FLOW: Controller-facing service → UnitOfWork → ManagerReportsMutationService → repository → commit → event registry.
import { Injectable } from '@nestjs/common';

import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerReportsMutationService } from '@/backend_manager/manager_modules/reports/reports_services/manager-reports-mutation.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerReportsDomainData } from '@/backend_manager/manager_modules/reports/reports_types/manager-reports.types';

@Injectable()
export class ManagerReportsOrchestratorService {
  constructor(private readonly uow: ManagerCoreUnitOfWorkService, private readonly events: ManagerCoreEventService, private readonly mutation: ManagerReportsMutationService) {}

  /** @description Executes create inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated payload. @returns Created domain record. */
  async createReports(data: ManagerCoreJsonObject): Promise<ManagerReportsDomainData> {
    let result: ManagerReportsDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.createReports(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_REPORTS_CREATED, { feature: 'reports', id: result.id });
    return result;
  }

  /** @description Executes update inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated patch. @param id - Resource UUID. @returns Updated domain record. */
  async updateReports(data: ManagerCoreJsonObject, id?: string): Promise<ManagerReportsDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerReportsDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updateReports(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_REPORTS_UPDATED, { feature: 'reports', id });
    return result;
  }

  /** @description Executes soft delete inside a UnitOfWork and emits the committed lifecycle event. @param id - Resource UUID. @returns Soft-deleted domain record. */
  async deleteReports(id?: string): Promise<ManagerReportsDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerReportsDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.deleteReports(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_REPORTS_DELETED, { feature: 'reports', id });
    return result;
  }
}

export { ManagerReportsOrchestratorService as ReportsOrchestratorService };
