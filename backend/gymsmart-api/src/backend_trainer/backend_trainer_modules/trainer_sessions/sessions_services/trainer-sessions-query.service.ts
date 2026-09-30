// RESPONSIBILITY: Builds Trainer session read contracts and member selectors.
// FLOW: TrainerSessionsQueryController → TrainerSessionsQueryService → TrainerSessionsRepository → mapper → canonical response.
import { Injectable } from '@nestjs/common';
import type { TrainerSessionsMemberOption } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_types/trainer-sessions.types';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { buildCorePaginationMeta, type CorePaginationMeta } from '@/backend_trainer/backend_core/core_utils/core-pagination.utils';
import { TrainerSessionsRepository } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_repositories/trainer-sessions-repository';
import type { SessionsListQuery } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_types/trainer-sessions-list-query.type';
/**
 * Intent: Defines the TrainerSessionsQueryService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerSessionsQueryService {
  constructor(private readonly repo: TrainerSessionsRepository) {}
  /** Returns the frontend session array with canonical pagination metadata. */
  /**
 * Intent: Executes the findMany operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes findMany inside the owning backend service/repository boundary without exposing ORM details.
 * @param query - Input for findMany.
 * @returns {Promise<{ data: Awaited<ReturnType<TrainerSessionsRepository['findMany']>>['rows']; meta: CorePaginationMeta }>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findMany(query: SessionsListQuery): Promise<{ data: Awaited<ReturnType<TrainerSessionsRepository['findMany']>>['rows']; meta: CorePaginationMeta }> {
    const result = await this.repo.findMany(CoreRequestContext.getUserIdOrThrow(), query);
    return { data: result.rows, meta: buildCorePaginationMeta(result.total, query.page, query.limit) };
  }
  /** Returns trainer-owned members for session assignment. */
  /**
 * Intent: Executes the findMembers operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes findMembers inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {Promise<TrainerSessionsMemberOption[]>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findMembers(): Promise<TrainerSessionsMemberOption[]> {
    return this.repo.findMembers(CoreRequestContext.getUserIdOrThrow());
  }
}
