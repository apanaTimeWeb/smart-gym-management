// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { CommunicationsRepository } from '@/backend_manager/manager_modules/communications/manager-communications.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerCommunicationsFindCommunicationKPIsServiceFindCommunicationKPIsResult {
  totalSent: number;
  whatsappSent: number;
  emailSent: number;
  campaignsThisMonth: number;
}

@Injectable()
export class ManagerCommunicationsFindCommunicationKPIsService {
  constructor(private readonly repository: CommunicationsRepository) {}

  /** @description Loads the communications collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findCommunicationKPIs(query:ManagerCoreJsonObject={}):Promise<ManagerCommunicationsFindCommunicationKPIsServiceFindCommunicationKPIsResult> {
    const result=await this.repository.findAll({ ...query, __unbounded: true, page:1, limit:100 });
    const rows=result.data.map((row)=>row.payload);
    const totalSent=rows.reduce((sum,row)=>sum+Number(row.sentCount ?? 0),0);
    const whatsappSent=rows.filter((row)=>row.channel==='whatsapp').reduce((sum,row)=>sum+Number(row.sentCount ?? 0),0);
    const emailSent=rows.filter((row)=>row.channel==='email').reduce((sum,row)=>sum+Number(row.sentCount ?? 0),0);
    return { totalSent, whatsappSent, emailSent, campaignsThisMonth:rows.filter((row)=>String(row.sentAt ?? row.createdAt ?? '').slice(0,7)===new Date().toISOString().slice(0,7)).length };
  }
}

export { ManagerCommunicationsFindCommunicationKPIsService as CommunicationsFindCommunicationKPIsService };
