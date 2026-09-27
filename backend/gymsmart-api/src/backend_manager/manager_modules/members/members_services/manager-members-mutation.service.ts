// RESPONSIBILITY: Owns members mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerMembersMutationService → ManagerMembersRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerMembersRepository } from '@/backend_manager/manager_modules/members/manager-members.repository';
import type { ManagerMembersDomainData, ManagerMembersPaymentSnapshot } from '@/backend_manager/manager_modules/members/members_types/manager-members.types';

@Injectable()
export class ManagerMembersMutationService {
  constructor(private readonly repository: ManagerMembersRepository, private readonly audit: ManagerCoreAuditLogRepository) {}

  /** @description Creates one members domain record and writes its audit entry within the active transaction. @param data - Validated payload. @param context - Active transaction context. @returns Created domain record. */
  async createMember(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerMembersDomainData> {
    const row = await this.repository.createMember(data, context);
    await this.audit.append(context, 'MANAGER.MEMBERS.CREATED', 'members', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one members domain record under the repository concurrency policy and writes an audit entry. @param id - Resource UUID. @param data - Validated patch. @param context - Active transaction context. @returns Updated domain record. */
  async updateMember(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerMembersDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateById(id, data, context);
    await this.audit.append(context, 'MANAGER.MEMBERS.UPDATED', 'members', id, before.payload, row.payload);
    return row;
  }

  /** @description Assigns a diet plan to an existing member and records the state transition. @param id - Member UUID. @param dietPlanId - Diet plan UUID. @param context - Active transaction context. @returns Updated member domain record. */
  async assignDietPlan(id: string, dietPlanId: string, context: ManagerCoreTransactionContext): Promise<ManagerMembersDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.assignDietPlan(id, dietPlanId, context);
    await this.audit.append(context, 'MANAGER.MEMBERS.UPDATED', 'members', id, before.payload, row.payload);
    return row;
  }

  /** @description Assigns a workout to an existing member and records the state transition. @param id - Member UUID. @param workoutId - Workout UUID. @param context - Active transaction context. @returns Updated member domain record. */
  async assignWorkout(id: string, workoutId: string, context: ManagerCoreTransactionContext): Promise<ManagerMembersDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.assignWorkout(id, workoutId, context);
    await this.audit.append(context, 'MANAGER.MEMBERS.UPDATED', 'members', id, before.payload, row.payload);
    return row;
  }



  /** @description Soft-deletes one members domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deleteMember(id: string, context: ManagerCoreTransactionContext): Promise<ManagerMembersDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.softDelete(id, context);
    await this.audit.append(context, 'MANAGER.MEMBERS.DELETED', 'members', id, before.payload, row.payload);
    return row;
  }

  /** @description Adds a member payment snapshot under the repository transaction and returns the persisted snapshot. @param id - Member UUID. @param payment - Validated payment payload. @param context - Active transaction context. @returns Persisted payment snapshot. */
  async createMemberPayment(id: string, payment: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerMembersPaymentSnapshot> {
    const snapshot = await this.repository.createMemberPayment(id, payment, context);
    await this.audit.append(context, 'MANAGER.MEMBERS.PAYMENT.CREATED', 'members', id, null, snapshot);
    return snapshot;
  }

}
