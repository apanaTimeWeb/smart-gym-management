// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { CommunicationsRepository } from '@/backend_manager/modules/backend_manager/communications/repositories/communications-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class CommunicationsFetchCommunicationKPIsService {
  constructor(private readonly repository: CommunicationsRepository) {}

  /** @description Loads the communications collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchCommunicationKPIs(query:CoreJsonObject={}):Promise<CoreJsonObject> {
    const result=await this.repository.findCommunicationsList({ ...query, __unbounded: true, page:1, limit:100 });
    const rows=result.data.map((row)=>row.payload);
    const totalSent=rows.reduce((sum,row)=>sum+Number(row.sentCount ?? 0),0);
    const whatsappSent=rows.filter((row)=>row.channel==='whatsapp').reduce((sum,row)=>sum+Number(row.sentCount ?? 0),0);
    const emailSent=rows.filter((row)=>row.channel==='email').reduce((sum,row)=>sum+Number(row.sentCount ?? 0),0);
    return { totalSent, whatsappSent, emailSent, campaignsThisMonth:rows.filter((row)=>String(row.sentAt ?? row.createdAt ?? '').slice(0,7)===new Date().toISOString().slice(0,7)).length };
  }
}
