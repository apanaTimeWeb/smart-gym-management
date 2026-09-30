// RESPONSIBILITY: Builds Trainer progress list, entry detail, and summary response contracts.
// FLOW: Progress query controller → query service → trainer ownership guard → repository/mapper.
import { Injectable } from '@nestjs/common';
import type { ProgressTrackingMemberSummary, ProgressTrackingSummary, ProgressEntriesQuery } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_types/trainer-progress-tracking-repository-query.types';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { buildCorePaginationMeta } from '@/backend_trainer/backend_core/core_utils/core-pagination.utils';
import { TrainerProgressTrackingRepository } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_repositories/trainer-progress-tracking-repository';
/**
 * Intent: Defines the TrainerProgressTrackingQueryService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerProgressTrackingQueryService {
  constructor(private readonly repo: TrainerProgressTrackingRepository) {}
  /** Lists trainer-visible members. */
  /**
 * Intent: Executes the findMembers operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes findMembers inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {Promise<ProgressTrackingMemberSummary[]>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findMembers(): Promise<ProgressTrackingMemberSummary[]> { return this.repo.findMembers(CoreRequestContext.getUserIdOrThrow()); }
  /** Lists entries after verifying trainer membership ownership. */
  /**
 * Intent: Executes the findEntries operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes findEntries inside the owning backend service/repository boundary without exposing ORM details.
 * @param memberId - Input for findEntries.
 * @param query - Input for findEntries.
 * @returns {Promise<{entries:Awaited<ReturnType<TrainerProgressTrackingRepository['findEntries']>>['rows'];total:number;page:number;limit:number;pagination:ReturnType<typeof buildCorePaginationMeta>}>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findEntries(memberId:string,query:ProgressEntriesQuery):Promise<{entries:Awaited<ReturnType<TrainerProgressTrackingRepository['findEntries']>>['rows'];total:number;page:number;limit:number;pagination:ReturnType<typeof buildCorePaginationMeta>}>{await this.repo.assertMemberOwnedByTrainer(CoreRequestContext.getUserIdOrThrow(),memberId);const r=await this.repo.findEntries(memberId,query);return {entries:r.rows,total:r.total,page:query.page,limit:query.limit,pagination:buildCorePaginationMeta(r.total,query.page,query.limit)};}
  /** Returns the complete summary contract for one trainer member. */
  /**
 * Intent: Executes the summary operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes summary inside the owning backend service/repository boundary without exposing ORM details.
 * @param memberId - Input for summary.
 * @returns {Promise<ProgressTrackingSummary>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async summary(memberId:string):Promise<ProgressTrackingSummary>{await this.repo.assertMemberOwnedByTrainer(CoreRequestContext.getUserIdOrThrow(),memberId);return this.repo.findSummary(memberId);}
  /** Returns one entry after verifying member ownership. */
  /**
 * Intent: Executes the findEntry operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes findEntry inside the owning backend service/repository boundary without exposing ORM details.
 * @param memberId - Input for findEntry.
 * @param id - Input for findEntry.
 * @returns {Promise<Awaited<ReturnType<TrainerProgressTrackingRepository['findByIdOrThrow']>>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findEntry(memberId:string,id:string):Promise<Awaited<ReturnType<TrainerProgressTrackingRepository['findByIdOrThrow']>>>{await this.repo.assertMemberOwnedByTrainer(CoreRequestContext.getUserIdOrThrow(),memberId);const row=await this.repo.findByIdOrThrow(memberId,id);return row;}
}
