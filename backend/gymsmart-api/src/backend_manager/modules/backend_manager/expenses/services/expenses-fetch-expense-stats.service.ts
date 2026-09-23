// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ExpensesRepository } from '@/backend_manager/modules/backend_manager/expenses/repositories/expenses-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class ExpensesFetchExpenseStatsService {
  constructor(private readonly repository: ExpensesRepository) {}

  /** @description Loads the expenses collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchExpenseStats(query:CoreJsonObject={}):Promise<CoreJsonObject> {
    const result=await this.repository.findExpensesList({ ...query, __unbounded: true, page:1, limit:100 });
    const rows=result.data.map((row)=>row.payload);
    const totalAmount=rows.reduce((sum,row)=>sum+Number(row.amount ?? 0),0);
    const paidAmount=rows.filter((row)=>row.status==='PAID').reduce((sum,row)=>sum+Number(row.amount ?? 0),0);
    const pendingAmount=rows.filter((row)=>row.status==='PENDING').reduce((sum,row)=>sum+Number(row.amount ?? 0),0);
    const month=new Date().toISOString().slice(0,7);
    const thisMonthAmount=rows.filter((row)=>String(row.date ?? '').slice(0,7)===month).reduce((sum,row)=>sum+Number(row.amount ?? 0),0);
    return { totalAmount, paidAmount, pendingAmount, thisMonthAmount };
  }
}
