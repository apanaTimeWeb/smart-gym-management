// RESPONSIBILITY: Executes the business decision for a single affiliate payout using an already-established transaction boundary.
// FLOW: Payout orchestrator -> locked affiliate row -> ledger pair -> payout-history projection.
import { Injectable, BadRequestException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { SuperadminAffiliatesRepository } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.repository';
import { SuperadminAffiliatesLedgerRepository } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_repositories/superadmin-affiliates-ledger.repository';
import { SuperadminAffiliatesMapper } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.mapper';
import { SUPERADMIN_AFFILIATE_LEDGER_REASON } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.constants';
import { SuperadminAffiliatesResponseDto } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_responses/superadmin-affiliates-response.dto';

/**
 * Primary Intent: Converts one affiliate's current pending payable into a ledger-backed payout projection.
 * Edge Cases: Zero balance, missing affiliate, repeated retries, and concurrent payout requests must never create duplicate value transfer.
 * Side-Effects: Appends two ledger entries and updates only the UI payout-history projection inside the same transaction.
 * AI-Note: This service assumes the Orchestrator owns transaction lifecycle; never open a separate transaction here.
 */
@Injectable()
/**
 * Primary Intent: Defines SuperadminAffiliatesPayoutService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated, use the configured absolute import alias, and preserve frozen contracts.
 */
export class SuperadminAffiliatesPayoutService {
  constructor(private readonly repository:SuperadminAffiliatesRepository, private readonly ledger:SuperadminAffiliatesLedgerRepository) {}

  /**
 * Primary Intent: Executes the payLocked use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async payLocked(id:string):Promise<SuperadminAffiliatesResponseDto>{
    const affiliate=await this.repository.findByIdForPayout(id);
    const pendingPayout = await this.ledger.findPayableBalance(affiliate.id, affiliate.currency);
    if(pendingPayout<=0) throw new BadRequestException({error:'BAD_REQUEST',errorCode:'AFFILIATES.PAYOUT.ZERO_BALANCE',message:{key:'affiliates.ERRORS.BAD_REQUEST'}});
    const transactionId=randomUUID();
    await this.ledger.createPayoutPair(transactionId,affiliate.id,pendingPayout,affiliate.currency,SUPERADMIN_AFFILIATE_LEDGER_REASON.PAYOUT_COMPLETED);
    await this.repository.appendPayoutHistory(id,{id:randomUUID(),affiliateId:affiliate.id,affiliateName:affiliate.name,amount:pendingPayout,method:'BANK_TRANSFER',referenceId:`PAYOUT-${transactionId}`,status:'COMPLETED',paidAt:new Date().toISOString(),currency:affiliate.currency});
    const domain = SuperadminAffiliatesMapper.toDomain(await this.repository.findByIdOrThrow(id), 0);
    return SuperadminAffiliatesMapper.toResponse(domain, affiliate.currency);
  }

  /**
 * Primary Intent: Executes the history use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async history():Promise<import('@/backend_superadmin/superadmin_modules/affiliates/affiliates_responses/superadmin-affiliates-response.dto').SuperadminAffiliatePayoutRecordDto[]>{
    return (await this.repository.findPayoutHistory()) as import('@/backend_superadmin/superadmin_modules/affiliates/affiliates_responses/superadmin-affiliates-response.dto').SuperadminAffiliatePayoutRecordDto[];
  }
}
