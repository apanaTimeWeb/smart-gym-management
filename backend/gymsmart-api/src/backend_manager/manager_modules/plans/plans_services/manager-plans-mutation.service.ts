// RESPONSIBILITY: Owns plans mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerPlansMutationService → ManagerPlansRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerPlansRepository } from '@/backend_manager/manager_modules/plans/manager-plans.repository';
import type { PlansDomainData } from '@/backend_manager/manager_modules/plans/plans_types/manager-plans.types';

@Injectable()
export class ManagerPlansMutationService {
  constructor(private readonly repository: ManagerPlansRepository, private readonly audit: ManagerCoreAuditLogRepository) {}

  /** @description Creates one plans domain record and writes its audit entry within the active transaction. @param data - Validated payload. @param context - Active transaction context. @returns Created domain record. */
  async createPlan(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<PlansDomainData> {
    const row = await this.repository.createPlan(data, context);
    await this.audit.append(context, 'MANAGER.PLANS.CREATED', 'plans', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one plans domain record under the repository concurrency policy and writes an audit entry. @param id - Resource UUID. @param data - Validated patch. @param context - Active transaction context. @returns Updated domain record. */
  async updatePlan(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<PlansDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateById(id, data, context);
    await this.audit.append(context, 'MANAGER.PLANS.UPDATED', 'plans', id, before.payload, row.payload);
    return row;
  }

  /** @description Activates membership and audits it. @param data - Activation payload. @param context - Transaction context. @returns Membership. */
  async activateMembership(data:ManagerCoreJsonObject,context:ManagerCoreTransactionContext):Promise<PlansDomainData>{const row=await this.repository.activateMembership(data,context);await this.audit.append(context,'MANAGER.PLANS.MEMBERSHIP_ACTIVATED','membership',row.id,null,row.payload);return row;}
  /** @description Renews membership and audits it. @param data - Renewal payload. @param context - Transaction context. @returns Membership. */
  async renewMembership(data:ManagerCoreJsonObject,context:ManagerCoreTransactionContext):Promise<PlansDomainData>{const row=await this.repository.renewMembership(data,context);await this.audit.append(context,'MANAGER.PLANS.MEMBERSHIP_RENEWED','membership',row.id,null,row.payload);return row;}
  /** @description Freezes membership and audits it. @param data - Freeze payload. @param context - Transaction context. @returns Membership. */
  async freezeMembership(data:ManagerCoreJsonObject,context:ManagerCoreTransactionContext):Promise<PlansDomainData>{const row=await this.repository.freezeMembership(data,context);await this.audit.append(context,'MANAGER.PLANS.MEMBERSHIP_FROZEN','membership',row.id,null,row.payload);return row;}
  /** @description Creates a change request and audits it. @param data - Request payload. @param context - Transaction context. @returns Change request. */
  async createChangeRequest(data:ManagerCoreJsonObject,context:ManagerCoreTransactionContext):Promise<PlansDomainData>{const row=await this.repository.createChangeRequest(data,context);await this.audit.append(context,'MANAGER.PLANS.CHANGE_REQUEST_CREATED','change-request',row.id,null,row.payload);return row;}

  /** @description Soft-deletes one plans domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deletePlan(id: string, context: ManagerCoreTransactionContext): Promise<PlansDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.softDelete(id, context);
    await this.audit.append(context, 'MANAGER.PLANS.DELETED', 'plans', id, before.payload, row.payload);
    return row;
  }

}
