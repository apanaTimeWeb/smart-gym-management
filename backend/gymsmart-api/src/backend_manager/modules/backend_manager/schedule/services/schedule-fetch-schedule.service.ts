// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ScheduleRepository } from '@/backend_manager/modules/backend_manager/schedule/repositories/schedule-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class ScheduleFetchScheduleService {
  constructor(private readonly repository: ScheduleRepository) {}

  /** @description Loads the complete schedule response, preserving any persisted KPI/trainer grouping. @param query - Validated schedule filters. @returns Schedule KPIs and trainer summaries. */
  async fetchSchedule(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findScheduleList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    const snapshot = rows[0];
    const kpis = ((snapshot as any)?.kpis as CoreJsonObject) ?? { totalTrainers: 0, trainersOnDutyToday: 0, trainersOnLeaveToday: 0, totalShiftsThisWeek: 0, totalClassesThisWeek: 0, avgOccupancyRate: 0, totalEnrolledMembers: 0 };
    const trainers = Array.isArray((snapshot as any)?.trainers) ? (snapshot as any)?.trainers : rows.filter((row) => (row as any).trainerId != null).map((row) => ({ trainerId: String((row as any).trainerId), trainerName: String((row as any).trainerName ?? ''), trainerRole: String((row as any).trainerRole ?? ''), isActive: Boolean((row as any).isActive ?? true), shifts: Array.isArray((row as any).shifts) ? (row as any).shifts : [], totalShiftsPerWeek: Number((row as any).totalShiftsPerWeek ?? 0), totalHoursPerWeek: Number((row as any).totalHoursPerWeek ?? 0) }));
    return { kpis, trainers };
  }
}
