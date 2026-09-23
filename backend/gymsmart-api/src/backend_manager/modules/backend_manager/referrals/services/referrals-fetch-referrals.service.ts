// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ReferralsRepository } from '@/backend_manager/modules/backend_manager/referrals/repositories/referrals-repository';

import type { CoreJsonObject, CoreJsonValue } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class ReferralsFetchReferralsService {
  constructor(private readonly repository: ReferralsRepository) {}

  /** @description Loads the referrals collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchReferrals(query: CoreJsonObject = {}): Promise<CoreJsonValue[]> {
    const result = await this.repository.findReferralsList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { referrals: rows, } as any;
  }
}
