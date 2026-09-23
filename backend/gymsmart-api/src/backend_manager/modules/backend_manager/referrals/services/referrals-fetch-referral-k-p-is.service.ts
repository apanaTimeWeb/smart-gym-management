// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ReferralsRepository } from '@/backend_manager/modules/backend_manager/referrals/repositories/referrals-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class ReferralsFetchReferralKPIsService {
  constructor(private readonly repository: ReferralsRepository) {}

  /** @description Calculates complete referral KPIs from tenant referral records. @param query - Validated referral filters. @returns Complete referral KPI object. */
  async fetchReferralKPIs(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findReferralsList({ ...query, __unbounded: true, page: 1, limit: 100 });
    const rows = result.data.map((row) => row.payload);
    const totalReferrals = rows.length;
    const totalConverted = rows.filter((row) => ['CONVERTED', 'JOINED'].includes(String(row.status ?? '').toUpperCase())).length;
    const pendingRewards = rows.filter((row) => String(row.rewardStatus ?? row.status ?? '').toUpperCase() === 'PENDING').length;
    const claimed = rows.filter((row) => String(row.rewardStatus ?? '').toUpperCase() === 'CLAIMED');
    const claimedRewards = claimed.length;
    const totalRewardsPaidOut = claimed.reduce((sum, row) => sum + Number(row.rewardAmount ?? 0), 0);
    return { totalReferrals, totalConverted, pendingRewards, claimedRewards, conversionRate: totalReferrals ? (totalConverted / totalReferrals) * 100 : 0, totalRewardsPaidOut };
  }
}
