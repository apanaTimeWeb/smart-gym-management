// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ScheduleRepository } from '@/backend_manager/manager_modules/schedule/manager-schedule.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerScheduleFindScheduleServiceFindScheduleResult {
  kpis: unknown;
  trainers: unknown;
}

@Injectable()
export class ManagerScheduleFindScheduleService {
  constructor(private readonly repository: ScheduleRepository) {}

  /** @description Loads the complete schedule response, preserving any persisted KPI/trainer grouping. @param query - Validated schedule filters. @returns Schedule KPIs and trainer summaries. */
  async findSchedule(query: ManagerCoreJsonObject = {}): Promise<ManagerScheduleFindScheduleServiceFindScheduleResult> {
    const result = await this.repository.findAll(query);
    const rows: Array<{ id: string } & ManagerCoreJsonObject> = result.data.map((row: any) => ({ id: row.id, ...row.payload }));
    const snapshot = rows[0];
    const kpis = ((snapshot)?.kpis as ManagerCoreJsonObject) ?? { totalTrainers: 0, trainersOnDutyToday: 0, trainersOnLeaveToday: 0, totalShiftsThisWeek: 0, totalClassesThisWeek: 0, avgOccupancyRate: 0, totalEnrolledMembers: 0 };
    const trainers = Array.isArray((snapshot)?.trainers) ? (snapshot)?.trainers : rows.filter((row) => (row).trainerId != null).map((row: any) => ({ trainerId: String((row).trainerId), trainerName: String((row).trainerName ?? ''), trainerRole: String((row).trainerRole ?? ''), isActive: Boolean((row).isActive ?? true), shifts: Array.isArray((row).shifts) ? (row).shifts : [], totalShiftsPerWeek: Number((row).totalShiftsPerWeek ?? 0), totalHoursPerWeek: Number((row).totalHoursPerWeek ?? 0) }));
    return { kpis, trainers };
  }
}

export { ManagerScheduleFindScheduleService as ScheduleFindScheduleService };
