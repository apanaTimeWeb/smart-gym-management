// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ReferralsRepository } from '@/backend_manager/manager_modules/referrals/manager-referrals.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

type ReferralRow = { id: string; [key: string]: unknown };
export type ReferralsResult = { referrals: ReferralRow[] };

@Injectable()
export class ManagerReferralsFindReferralsService {
  constructor(private readonly repository: ReferralsRepository) {}

  /** @description Loads the referrals collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findReferrals(query: ManagerCoreJsonObject = {}): Promise<ReferralsResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { referrals: rows, };
  }
}

export { ManagerReferralsFindReferralsService as ReferralsFindReferralsService };
