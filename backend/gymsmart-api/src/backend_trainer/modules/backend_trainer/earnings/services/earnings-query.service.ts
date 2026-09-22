// RESPONSIBILITY: Builds all Trainer earnings read contracts from repository-owned data.
// FLOW: Earnings query controller → service → repository → typed response DTO shape.

import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { buildCorePaginationMeta } from '@/backend_trainer/core/utils/core-pagination.utils';
import { EarningsRepository } from '@/backend_trainer/modules/backend_trainer/earnings/repositories/earnings-repository';

@Injectable()
export class EarningsQueryService {
  constructor(private readonly repo:EarningsRepository){}
  /** Returns the complete trainer earnings page contract using integer minor-unit money values. */
  async findAll(query:{page:number;limit:number;startDate?:string;endDate?:string;search?:string;sortBy:string;sortDirection:string}):Promise<{kpis:{totalEarnings:number;pendingPayouts:number;sessionsCompleted:number;commissionRate:number;taxDeduction:number;bankAccount:string|null;commissionTier:string;currency:'INR'};pendingPayouts:Array<{id:string;period:string;amount:number;status:string;dueDate:string;currency:'INR'}>;history:Array<{id:string;date:string;type:string;description:string;amount:number;status:string;sessionId:string|null;tdsDeducted:number|null;netPayout:number|null;invoiceNumber:string|null;currency:'INR'}>;historyTotal:number;historyPage:number;historyLimit:number;pagination:ReturnType<typeof buildCorePaginationMeta>}>{
    const trainerId=CoreRequestContext.get().userId??''; const history=await this.repo.findHistory(trainerId,query); const totals=await this.repo.findTotals(trainerId,query.startDate,query.endDate); const payouts=await this.repo.findPending(trainerId); const compensation=await this.repo.findCompensation(trainerId); const sessionsCompleted=await this.repo.countCompletedSessions(trainerId,query.startDate,query.endDate);
    return {kpis:{totalEarnings:totals.totalEarnings,pendingPayouts:payouts.reduce((sum,row)=>sum+Number(row.amountMinor),0),sessionsCompleted,commissionRate:compensation.commissionRate,taxDeduction:totals.taxDeduction,bankAccount:compensation.bankAccount,commissionTier:compensation.commissionTier,currency:'INR'},pendingPayouts:payouts.map((row)=>({id:row.id,period:row.period,amount:Number(row.amountMinor),status:row.status,dueDate:row.dueDate,currency:'INR'})),history:history.rows.map((row)=>({id:row.id,date:row.eventDate,type:row.type,description:row.description,amount:Number(row.amountMinor),status:row.status,sessionId:row.sessionId,tdsDeducted:row.tdsDeductedMinor===null?null:Number(row.tdsDeductedMinor),netPayout:row.netPayoutMinor===null?null:Number(row.netPayoutMinor),invoiceNumber:row.invoiceNumber,currency:'INR'})),historyTotal:history.total,historyPage:query.page,historyLimit:query.limit,pagination:buildCorePaginationMeta(history.total,query.page,query.limit)};
  }
}
