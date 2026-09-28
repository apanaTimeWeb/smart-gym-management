// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '@/backend_manager/manager_modules/notifications/manager-notifications.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerNotificationsFindNotificationKPIsServiceFindNotificationKPIsResult {
  total: unknown;
  unread: unknown;
  highPriority: unknown;
  todayCount: unknown;
}

@Injectable()
export class ManagerNotificationsFindNotificationKPIsService {
  constructor(private readonly repository: NotificationsRepository) {}

  /** @description Loads the notifications collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findNotificationKPIs(query:ManagerCoreJsonObject={}):Promise<ManagerNotificationsFindNotificationKPIsServiceFindNotificationKPIsResult> {
    const result=await this.repository.findAll({ ...query, __unbounded: true, page:1, limit:100 });
    const rows=result.data.map((row: any)=>row.payload);
    const today=new Date().toISOString().slice(0,10);
    return { total:rows.length, unread:rows.filter((row)=>String(row.status ?? '').toUpperCase()!=='READ').length, highPriority:rows.filter((row)=>String(row.priority ?? '').toUpperCase()==='HIGH').length, todayCount:rows.filter((row)=>String(row.createdAt ?? row.date ?? '').slice(0,10)===today).length };
  }
}

export { ManagerNotificationsFindNotificationKPIsService as NotificationsFindNotificationKPIsService };
