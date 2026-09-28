// RESPONSIBILITY: Owns referrals mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerReferralsMutationService → ManagerReferralsRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerReferralsRepository } from '@/backend_manager/manager_modules/referrals/manager-referrals.repository';
import type { ManagerReferralsDomainData } from '@/backend_manager/manager_modules/referrals/referrals_types/manager-referrals.types';

@Injectable()
export class ManagerReferralsMutationService {
  constructor(private readonly repository: ManagerReferralsRepository, private readonly audit: ManagerCoreAuditLogRepository) {}

  /** @description Creates one referrals domain record and writes its audit entry within the active transaction. @param data - Validated payload. @param context - Active transaction context. @returns Created domain record. */
  async createReferral(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerReferralsDomainData> {
    const row = await this.repository.createReferral(data, context);
    await this.audit.append(context, 'MANAGER.REFERRALS.CREATED', 'referrals', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one referrals domain record under the repository concurrency policy and writes an audit entry. @param id - Resource UUID. @param data - Validated patch. @param context - Active transaction context. @returns Updated domain record. */
  async updateReferral(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerReferralsDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateById(id, data, context);
    await this.audit.append(context, 'MANAGER.REFERRALS.UPDATED', 'referrals', id, before.payload, row.payload);
    return row;
  }

  /** @description Claims one eligible referral reward and audits the transition. @param id - Referral UUID. @param context - Transaction context. @returns Updated referral. */
  async claimReward(id:string,context:ManagerCoreTransactionContext):Promise<ManagerReferralsDomainData>{const before=await this.repository.findByIdOrThrow(id);const row=await this.repository.claimReward(id,context);await this.audit.append(context,'MANAGER.REFERRALS.REWARD_CLAIMED','referrals',id,before.payload,row.payload);return row;}

  /** @description Soft-deletes one referrals domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deleteReferral(id: string, context: ManagerCoreTransactionContext): Promise<ManagerReferralsDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.softDelete(id, context);
    await this.audit.append(context, 'MANAGER.REFERRALS.DELETED', 'referrals', id, before.payload, row.payload);
    return row;
  }

}
