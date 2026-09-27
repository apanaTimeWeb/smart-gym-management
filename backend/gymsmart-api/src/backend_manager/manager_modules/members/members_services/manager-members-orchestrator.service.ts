// RESPONSIBILITY: Owns the members transaction boundary and post-commit lifecycle-event emission; no direct repository access or business logic.
// FLOW: Controller-facing service → UnitOfWork → ManagerMembersMutationService → repository → commit → event registry.
import { Injectable } from '@nestjs/common';

import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerMembersMutationService } from '@/backend_manager/manager_modules/members/members_services/manager-members-mutation.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { MembersDomainData, MembersPaymentSnapshot } from '@/backend_manager/manager_modules/members/members_types/manager-members.types';

@Injectable()
export class ManagerMembersOrchestratorService {
  constructor(private readonly uow: ManagerCoreUnitOfWorkService, private readonly events: ManagerCoreEventService, private readonly mutation: ManagerMembersMutationService) {}

  /** @description Executes create inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated payload. @returns Created domain record. */
  async createMember(data: ManagerCoreJsonObject): Promise<MembersDomainData> {
    let result: MembersDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.createMember(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_MEMBERS_CREATED, { feature: 'members', id: result.id });
    return result;
  }

  /** @description Executes update inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated patch. @param id - Resource UUID. @returns Updated domain record. */
  async updateMember(data: ManagerCoreJsonObject, id?: string): Promise<MembersDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: MembersDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updateMember(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_MEMBERS_UPDATED, { feature: 'members', id });
    return result;
  }

  /** @description Assigns a diet plan within one transaction. @param data - Assignment payload. @param id - Member UUID. @returns Success contract. */
  async assignDietPlan(data: ManagerCoreJsonObject, id: string): Promise<{ success: boolean }> { const dietPlanId=typeof data.dietPlanId==='string'?data.dietPlanId:''; if(!dietPlanId) throw new ManagerCoreContextException('Diet plan id is required.','MEMBERS.ASSIGNMENT.REQUIRED'); await this.uow.run(async context=>{ await this.mutation.assignDietPlan(id,dietPlanId,context); }); this.events.emit(ManagerCoreEventRegistry.MANAGER_MEMBERS_UPDATED,{feature:'members',id,action:'DIET_PLAN_ASSIGNED'}); return { success:true }; }

  /** @description Assigns a workout within one transaction. @param data - Assignment payload. @param id - Member UUID. @returns Success contract. */
  async assignWorkout(data: ManagerCoreJsonObject, id: string): Promise<{ success: boolean }> { const workoutId=typeof data.workoutId==='string'?data.workoutId:''; if(!workoutId) throw new ManagerCoreContextException('Workout id is required.','MEMBERS.ASSIGNMENT.REQUIRED'); await this.uow.run(async context=>{ await this.mutation.assignWorkout(id,workoutId,context); }); this.events.emit(ManagerCoreEventRegistry.MANAGER_MEMBERS_UPDATED,{feature:'members',id,action:'WORKOUT_ASSIGNED'}); return { success:true }; }

  /** @description Executes soft delete inside a UnitOfWork and emits the committed lifecycle event. @param id - Resource UUID. @returns Soft-deleted domain record. */
  async deleteMember(id?: string): Promise<MembersDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: MembersDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.deleteMember(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_MEMBERS_DELETED, { feature: 'members', id });
    return result;
  }

  /** @description Adds a member payment inside the UnitOfWork transaction. @param payment - Validated payment payload. @param id - Member UUID. @returns Persisted payment snapshot. */
  async createMemberPayment(payment: ManagerCoreJsonObject, id?: string): Promise<MembersPaymentSnapshot> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: MembersPaymentSnapshot | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.createMemberPayment(id, payment, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    return result;
  }
}

export { ManagerMembersOrchestratorService as MembersOrchestratorService };
