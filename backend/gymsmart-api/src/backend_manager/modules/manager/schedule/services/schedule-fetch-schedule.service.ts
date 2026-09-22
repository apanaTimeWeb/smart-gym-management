// @ts-nocheck
// RESPONSIBILITY: Read use-case for GET /api/v1/manager/schedule.
// FLOW: Controller -> ScheduleFetchScheduleService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { ScheduleRepository } from '@/backend_manager/modules/manager/schedule/repositories/schedule-repository';

@Injectable()
export class ScheduleFetchScheduleService {
  constructor(private readonly repository: ScheduleRepository) {}

  /** @description Loads the schedule collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchSchedule(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findScheduleList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: { trainers: rows,  }, meta: result.meta };
  }
}
