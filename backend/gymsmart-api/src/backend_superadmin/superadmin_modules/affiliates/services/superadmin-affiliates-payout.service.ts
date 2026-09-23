// RESPONSIBILITY: Executes affiliate commission payouts and exposes payout history.
// FLOW: Controller -> SuperadminAffiliatesPayoutService -> SuperadminAffiliatesRepository -> persistent affiliate state.
import { ConfigService } from '@nestjs/config';
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { SuperadminAffiliatesRepository } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.repository';
import { SuperadminAffiliatesMapper } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.mapper';
import { SuperadminAffiliatesResponseDto, SuperadminAffiliatePayoutRecordDto } from '@/backend_superadmin/superadmin_modules/affiliates/responses/superadmin-affiliates-response.dto';
@Injectable()
export class SuperadminAffiliatesPayoutService {
  constructor(private readonly repository: SuperadminAffiliatesRepository, private readonly config: ConfigService) {}
  /** Pays the full current pending balance and records an immutable payout entry. */
  async pay(id: string): Promise<SuperadminAffiliatesResponseDto> { const affiliate = await this.repository.findByIdOrThrow(id); const amount = affiliate.pendingPayout; const entry = { id: randomUUID(), affiliateId: affiliate.id, affiliateName: affiliate.name, amount, method: 'BANK_TRANSFER', referenceId: `PAYOUT-${Date.now()}`, status: 'COMPLETED', paidAt: new Date().toISOString(), currency: this.config.getOrThrow<string>('app.defaultCurrency') }; await this.repository.payPendingPayout(id, entry); return SuperadminAffiliatesMapper.toResponse(SuperadminAffiliatesMapper.toDomain(await this.repository.findByIdOrThrow(id)), this.config.getOrThrow<string>('app.defaultCurrency')); }
  /** Returns all recorded affiliate payout entries. */
  async history(): Promise<SuperadminAffiliatePayoutRecordDto[]> { const rows = await this.repository.findPayoutHistory(); if (!rows.length) throw new NotFoundException({ error: 'NOT_FOUND', errorCode: 'AFFILIATES.PAYOUT_HISTORY.NOT_FOUND', message: { key: 'affiliates.ERRORS.NOT_FOUND' } }); return rows as unknown as SuperadminAffiliatePayoutRecordDto[]; }
}