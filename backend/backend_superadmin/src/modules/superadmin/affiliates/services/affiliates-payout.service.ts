// RESPONSIBILITY: Executes affiliate commission payouts and exposes payout history.
// FLOW: Controller -> AffiliatesPayoutService -> AffiliatesRepository -> persistent affiliate state.
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AffiliatesRepository } from '@/modules/superadmin/affiliates/affiliates.repository';
import { AffiliatesMapper } from '@/modules/superadmin/affiliates/affiliates.mapper';
@Injectable()
export class AffiliatesPayoutService {
  constructor(private readonly repository: AffiliatesRepository) {}
  /** Pays the full current pending balance and records an immutable payout entry. */
  async pay(id: string): Promise<ReturnType<typeof AffiliatesMapper.toDomain>> { const affiliate = await this.repository.findByIdOrThrow(id); const amount = affiliate.pendingPayout; const history = Array.isArray((affiliate as unknown as { payoutHistory?: unknown }).payoutHistory) ? (affiliate as unknown as { payoutHistory: unknown[] }).payoutHistory : []; const entry = { id: randomUUID(), affiliateId: affiliate.id, affiliateName: affiliate.name, amount, method: 'BANK_TRANSFER', referenceId: `PAYOUT-${Date.now()}`, status: 'COMPLETED', paidAt: new Date().toISOString() }; await this.repository.payPendingPayout(id, entry); return AffiliatesMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
  /** Returns all recorded affiliate payout entries. */
  async history(): Promise<unknown[]> { const rows = await this.repository.findPayoutHistory(); if (!rows.length) throw new NotFoundException('No payout history found'); return rows; }
}
