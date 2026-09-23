// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '@/backend_manager/modules/backend_manager/notifications/repositories/notifications-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class NotificationsFetchNotificationKPIsService {
  constructor(private readonly repository: NotificationsRepository) {}

  /** @description Loads the notifications collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchNotificationKPIs(query:CoreJsonObject={}):Promise<CoreJsonObject> {
    const result=await this.repository.findNotificationsList({ ...query, __unbounded: true, page:1, limit:100 });
    const rows=result.data.map((row)=>row.payload);
    const today=new Date().toISOString().slice(0,10);
    return { total:rows.length, unread:rows.filter((row)=>String(row.status ?? '').toUpperCase()!=='READ').length, highPriority:rows.filter((row)=>String(row.priority ?? '').toUpperCase()==='HIGH').length, todayCount:rows.filter((row)=>String(row.createdAt ?? row.date ?? '').slice(0,10)===today).length };
  }
}
