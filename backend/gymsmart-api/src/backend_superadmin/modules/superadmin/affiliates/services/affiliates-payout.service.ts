// RESPONSIBILITY: Executes affiliate commission payouts and exposes payout history.
// FLOW: Controller -> AffiliatesPayoutService -> AffiliatesRepository -> persistent affiliate state.
import { ConfigService } from '@nestjs/config';
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AffiliatesRepository } from '@/backend_superadmin/modules/superadmin/affiliates/affiliates.repository';
import { AffiliatesMapper } from '@/backend_superadmin/modules/superadmin/affiliates/affiliates.mapper';
import { AffiliatesResponseDto, AffiliatePayoutRecordDto } from '@/backend_superadmin/modules/superadmin/affiliates/responses/affiliates-response.dto';
@Injectable()
export class AffiliatesPayoutService {
  constructor(private readonly repository: AffiliatesRepository, private readonly config: ConfigService) {}
  /** Pays the full current pending balance and records an immutable payout entry. */
  async pay(id: string): Promise<AffiliatesResponseDto> { const affiliate = await this.repository.findByIdOrThrow(id); const amount = affiliate.pendingPayout; const entry = { id: randomUUID(), affiliateId: affiliate.id, affiliateName: affiliate.name, amount, method: 'BANK_TRANSFER', referenceId: `PAYOUT-${Date.now()}`, status: 'COMPLETED', paidAt: new Date().toISOString(), currency: this.config.getOrThrow<string>('app.defaultCurrency') }; await this.repository.payPendingPayout(id, entry); return AffiliatesMapper.toResponse(AffiliatesMapper.toDomain(await this.repository.findByIdOrThrow(id)), this.config.getOrThrow<string>('app.defaultCurrency')); }
  /** Returns all recorded affiliate payout entries. */
  async history(): Promise<AffiliatePayoutRecordDto[]> { const rows = await this.repository.findPayoutHistory(); if (!rows.length) throw new NotFoundException({ error: 'NOT_FOUND', errorCode: 'AFFILIATES.PAYOUT_HISTORY.NOT_FOUND', message: { key: 'affiliates.ERRORS.NOT_FOUND' } }); return rows as unknown as AffiliatePayoutRecordDto[]; }
}