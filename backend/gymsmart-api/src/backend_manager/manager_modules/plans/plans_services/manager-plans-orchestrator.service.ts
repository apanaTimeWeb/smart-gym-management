// RESPONSIBILITY: Owns the plans transaction boundary and post-commit lifecycle-event emission; no direct repository access or business logic.
// FLOW: Controller-facing service → UnitOfWork → ManagerPlansMutationService → repository → commit → event registry.
import { Injectable } from '@nestjs/common';

import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerPlansMutationService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-mutation.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PlansDomainData } from '@/backend_manager/manager_modules/plans/plans_types/manager-plans.types';

@Injectable()
export class ManagerPlansOrchestratorService {
  constructor(private readonly uow: ManagerCoreUnitOfWorkService, private readonly events: ManagerCoreEventService, private readonly mutation: ManagerPlansMutationService) {}

  /** @description Executes create inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated payload. @returns Created domain record. */
  async createPlan(data: ManagerCoreJsonObject): Promise<PlansDomainData> {
    let result: PlansDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.createPlan(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_PLANS_CREATED, { feature: 'plans', id: result.id });
    return result;
  }

  /** @description Executes update inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated patch. @param id - Resource UUID. @returns Updated domain record. */
  async updatePlan(data: ManagerCoreJsonObject, id?: string): Promise<PlansDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: PlansDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updatePlan(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_PLANS_UPDATED, { feature: 'plans', id });
    return result;
  }

  /** @description Activates membership inside one UnitOfWork and emits a committed event. @param data - Activation payload. @returns Empty success contract. */
  async activateMembership(data: ManagerCoreJsonObject): Promise<Record<string, never>> { let result: PlansDomainData | undefined; await this.uow.run(async (context) => { result = await this.mutation.activateMembership(data, context); }); if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT'); this.events.emit(ManagerCoreEventRegistry.MANAGER_PLANS_UPDATED, { feature: 'plans', id: result.id, action: 'MEMBERSHIP_ACTIVATED' }); return {}; }

  /** @description Renews membership inside one UnitOfWork and emits a committed event. @param data - Renewal payload. @returns Empty success contract. */
  async renewMembership(data: ManagerCoreJsonObject): Promise<Record<string, never>> { let result: PlansDomainData | undefined; await this.uow.run(async (context) => { result = await this.mutation.renewMembership(data, context); }); if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT'); this.events.emit(ManagerCoreEventRegistry.MANAGER_PLANS_UPDATED, { feature: 'plans', id: result.id, action: 'MEMBERSHIP_RENEWED' }); return {}; }

  /** @description Freezes membership inside one UnitOfWork and emits a committed event. @param data - Freeze payload. @returns Empty success contract. */
  async freezeMembership(data: ManagerCoreJsonObject): Promise<Record<string, never>> { let result: PlansDomainData | undefined; await this.uow.run(async (context) => { result = await this.mutation.freezeMembership(data, context); }); if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT'); this.events.emit(ManagerCoreEventRegistry.MANAGER_PLANS_UPDATED, { feature: 'plans', id: result.id, action: 'MEMBERSHIP_FROZEN' }); return {}; }

  /** @description Creates a plan change request inside one UnitOfWork and emits a committed event. @param data - Change-request payload. @returns Empty success contract. */
  async createChangeRequest(data: ManagerCoreJsonObject): Promise<Record<string, never>> { let result: PlansDomainData | undefined; await this.uow.run(async (context) => { result = await this.mutation.createChangeRequest(data, context); }); if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT'); this.events.emit(ManagerCoreEventRegistry.MANAGER_PLANS_UPDATED, { feature: 'plans', id: result.id, action: 'CHANGE_REQUEST_CREATED' }); return {}; }

  /** @description Executes soft delete inside a UnitOfWork and emits the committed lifecycle event. @param id - Resource UUID. @returns Soft-deleted domain record. */
  async deletePlan(id?: string): Promise<PlansDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: PlansDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.deletePlan(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_PLANS_DELETED, { feature: 'plans', id });
    return result;
  }
}

export { ManagerPlansOrchestratorService as PlansOrchestratorService };
