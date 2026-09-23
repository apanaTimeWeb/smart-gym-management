// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { CommunicationsRepository } from '@/backend_manager/modules/backend_manager/communications/repositories/communications-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class CommunicationsFetchChurnKPIsService {
  constructor(private readonly repository: CommunicationsRepository) {}

  /** @description Loads the communications collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchChurnKPIs(query:CoreJsonObject={}):Promise<CoreJsonObject> {
    const result=await this.repository.findCommunicationsList({ ...query, __unbounded: true, page:1, limit:100 });
    const rows=result.data.map((row)=>row.payload);
    const recovered=rows.filter((row)=>row.recovered===true).length;
    const totalChurned=rows.length;
    const avgDaysSinceExit=totalChurned?rows.reduce((sum,row)=>sum+Number(row.daysSinceExit ?? 0),0)/totalChurned:0;
    const churnedThisMonth=rows.filter((row)=>String(row.exitDate ?? '').slice(0,7)===new Date().toISOString().slice(0,7)).length;
    return { totalChurned, churnedThisMonth, recoveryRate:totalChurned?(recovered/totalChurned)*100:0, avgDaysSinceExit };
  }
}
