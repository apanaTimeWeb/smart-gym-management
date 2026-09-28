// RESPONSIBILITY: Returns Trainer Dashboard KPI data only.
// FLOW: TrainerDashboardQueryController → TrainerDashboardKpisService → TrainerDashboardKpisRepository.
import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { TrainerDashboardKpisRepository } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_repositories/trainer-dashboard-kpis.repository';
import type { DashboardKpis } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/dashboard_types/trainer-dashboard.types';
/**
 * Intent: Defines the TrainerDashboardKpisService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerDashboardKpisService {
  constructor(private readonly repository: TrainerDashboardKpisRepository) {}
  /** Returns current-day operational KPIs for the authenticated Trainer. */
  /**
 * Intent: Executes the find operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes find inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {Promise<DashboardKpis>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async find(): Promise<DashboardKpis> {
    return this.repository.findToday(CoreRequestContext.getUserIdOrThrow());
  }
}
