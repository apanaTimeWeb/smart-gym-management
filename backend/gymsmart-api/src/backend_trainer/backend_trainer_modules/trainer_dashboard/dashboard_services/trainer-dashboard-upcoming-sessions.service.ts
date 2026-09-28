// RESPONSIBILITY: Returns upcoming Trainer Dashboard sessions only.
// FLOW: TrainerDashboardQueryController → TrainerDashboardUpcomingSessionsService → repository.
import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { TrainerDashboardQueryDto } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_dtos/trainer-dashboard-query.dto';
import { TrainerDashboardUpcomingSessionsRepository } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_repositories/trainer-dashboard-upcoming-sessions.repository';
import type { DashboardUpcomingSession } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_types/trainer-dashboard.types';
/**
 * Intent: Defines the TrainerDashboardUpcomingSessionsService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerDashboardUpcomingSessionsService {
  constructor(private readonly repository: TrainerDashboardUpcomingSessionsRepository) {}
  /** Resolves the range and returns the next five upcoming sessions. */
  /**
 * Intent: Executes the find operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes find inside the owning backend service/repository boundary without exposing ORM details.
 * @param query - Input for find.
 * @returns {Promise<{ upcomingSessions: DashboardUpcomingSession[] }>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async find(query: TrainerDashboardQueryDto): Promise<{ upcomingSessions: DashboardUpcomingSession[] }> {
    const range = this.resolveRange(query);
    return { upcomingSessions: await this.repository.findByRange(CoreRequestContext.getUserIdOrThrow(), range.startDate, range.endDate) };
  }
  /** Resolves supported presets for upcoming-session filtering. */
  /**
 * Intent: Executes the resolveRange operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes resolveRange inside the owning backend service/repository boundary without exposing ORM details.
 * @param query - Input for resolveRange.
 * @returns {{ startDate: string; endDate: string }} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private resolveRange(query: TrainerDashboardQueryDto): { startDate: string; endDate: string } {
    const end = query.endDate ? new Date(`${query.endDate}T00:00:00.000Z`) : new Date();
    const iso = (value: Date): string => value.toISOString().slice(0, 10);
    if (query.range === 'custom') return { startDate: query.startDate ?? iso(end), endDate: query.endDate ?? iso(end) };
    if (query.range === 'last_month') return { startDate: iso(new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() - 1, 1))), endDate: iso(new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 0))) };
    if (query.range === 'last_3_months') return { startDate: iso(new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() - 2, 1))), endDate: iso(end) };
    if (query.range === 'last_6_months') return { startDate: iso(new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() - 5, 1))), endDate: iso(end) };
    if (query.range === 'this_year') return { startDate: iso(new Date(Date.UTC(end.getUTCFullYear(), 0, 1))), endDate: iso(end) };
    return { startDate: iso(new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 1))), endDate: iso(end) };
  }
}
