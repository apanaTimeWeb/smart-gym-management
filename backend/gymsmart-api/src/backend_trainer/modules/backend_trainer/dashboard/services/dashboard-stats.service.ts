// RESPONSIBILITY: Resolves Trainer Dashboard date ranges and returns the frontend-frozen operational contract.
// FLOW: DashboardQueryController → DashboardStatsService → DashboardRepository → canonical response.

import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { DashboardRepository } from '@/backend_trainer/modules/backend_trainer/dashboard/dashboard.repository';
import { DashboardQueryDto } from '@/backend_trainer/modules/backend_trainer/dashboard/dtos/dashboard-query.dto';
import type { DashboardInterfaces } from '@/backend_trainer/modules/backend_trainer/dashboard/dashboard.interfaces';

@Injectable()
export class DashboardStatsService {
  constructor(private readonly repository: DashboardRepository) {}

  /** Builds the requested reporting window and retrieves trainer-scoped dashboard data. */
  async findStats(query: DashboardQueryDto): Promise<DashboardInterfaces> {
    const range = this.resolveRange(query);
    return this.repository.getStats(CoreRequestContext.get().userId ?? '', range);
  }

  /** Resolves supported frontend date-range presets without changing the frontend contract. */
  private resolveRange(query: DashboardQueryDto): { startDate: string; endDate: string } {
    const today = new Date();
    const iso = (value: Date): string => value.toISOString().slice(0, 10);
    const end = query.endDate ? new Date(`${query.endDate}T00:00:00.000Z`) : today;
    if (query.range === 'custom') return { startDate: query.startDate ?? iso(end), endDate: query.endDate ?? iso(end) };
    if (query.range === 'this_month') return { startDate: iso(new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 1))), endDate: iso(end) };
    if (query.range === 'last_month') return { startDate: iso(new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() - 1, 1))), endDate: iso(new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 0))) };
    if (query.range === 'last_3_months') return { startDate: iso(new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() - 2, 1))), endDate: iso(end) };
    if (query.range === 'last_6_months') return { startDate: iso(new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() - 5, 1))), endDate: iso(end) };
    return { startDate: iso(new Date(Date.UTC(end.getUTCFullYear(), 0, 1))), endDate: iso(end) };
  }
}
