// RESPONSIBILITY: Owns the referrals transaction boundary and post-commit lifecycle-event emission; no direct repository access or business logic.
// FLOW: Controller-facing service → UnitOfWork → ManagerReferralsMutationService → repository → commit → event registry.
import { Injectable } from '@nestjs/common';

import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerReferralsMutationService } from '@/backend_manager/manager_modules/referrals/referrals_services/manager-referrals-mutation.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ReferralsDomainData } from '@/backend_manager/manager_modules/referrals/referrals_types/manager-referrals.types';

@Injectable()
export class ManagerReferralsOrchestratorService {
  constructor(private readonly uow: ManagerCoreUnitOfWorkService, private readonly events: ManagerCoreEventService, private readonly mutation: ManagerReferralsMutationService) {}

  /** @description Executes create inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated payload. @returns Created domain record. */
  async createReferral(data: ManagerCoreJsonObject): Promise<ReferralsDomainData> {
    let result: ReferralsDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.createReferral(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_REFERRALS_CREATED, { feature: 'referrals', id: result.id });
    return result;
  }

  /** @description Executes update inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated patch. @param id - Resource UUID. @returns Updated domain record. */
  async updateReferral(data: ManagerCoreJsonObject, id?: string): Promise<ReferralsDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ReferralsDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updateReferral(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_REFERRALS_UPDATED, { feature: 'referrals', id });
    return result;
  }

  /** @description Claims an eligible reward inside a UnitOfWork and emits a committed event. @param data - Claim payload. @param id - Referral UUID. @returns Updated referral. */
  async claimReward(data: ManagerCoreJsonObject, id?: string): Promise<ReferralsDomainData> { void data; if(!id) throw new ManagerCoreContextException('Resource id is required','CORE.RESOURCE.ID_REQUIRED'); let result:ReferralsDomainData|undefined; await this.uow.run(async context=>{result=await this.mutation.claimReward(id,context);}); if(!result) throw new ManagerCoreContextException('Mutation completed without a result.','CORE.TRANSACTION.NO_RESULT'); this.events.emit(ManagerCoreEventRegistry.MANAGER_REFERRALS_UPDATED,{feature:'referrals',id,action:'REWARD_CLAIMED'}); return result; }

  /** @description Executes soft delete inside a UnitOfWork and emits the committed lifecycle event. @param id - Resource UUID. @returns Soft-deleted domain record. */
  async deleteReferral(id?: string): Promise<ReferralsDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ReferralsDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.deleteReferral(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_REFERRALS_DELETED, { feature: 'referrals', id });
    return result;
  }
}

export { ManagerReferralsOrchestratorService as ReferralsOrchestratorService };
