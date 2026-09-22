// @ts-nocheck
// RESPONSIBILITY: Read use-case for GET /api/v1/manager/referrals/kpis.
// FLOW: Controller -> ReferralsFetchReferralKPIsService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { ReferralsRepository } from '@/backend_manager/modules/manager/referrals/repositories/referrals-repository';

@Injectable()
export class ReferralsFetchReferralKPIsService {
  constructor(private readonly repository: ReferralsRepository) {}

  /** @description Loads the referrals collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchReferralKPIs(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findReferralsList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: rows[0]?.payload ?? {}, meta: result.meta };
  }
}
