// RESPONSIBILITY: Builds Trainer member list, detail, and related read contracts.
// FLOW: Members query controller → TrainerMembersQueryService → TrainerMembersRepository → mapper/domain.
import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { TrainerMembersRepository } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_repositories/trainer-members-repository';
import type { MembersListQuery } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_types/trainer-members-list-query.type';
import type { MembersMemberDomain } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member.domain';
import { buildCorePaginationMeta } from '@/backend_trainer/backend_core/core_utils/core-pagination.utils';
import type { MembersMemberNoteDomain } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member-note.domain';
/**
 * Intent: Defines the TrainerMembersQueryService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerMembersQueryService {
  constructor(private readonly repo: TrainerMembersRepository) {}
  /** Returns the trainer member list with pagination metadata. */
  /**
 * Intent: Executes the findMany operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes findMany inside the owning backend service/repository boundary without exposing ORM details.
 * @param query - Input for findMany.
 * @returns {Promise<{ members: MembersMemberDomain[]; total: number; page: number; limit: number; pagination: ReturnType<typeof buildCorePaginationMeta> }>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findMany(query: MembersListQuery): Promise<{ members: MembersMemberDomain[]; total: number; page: number; limit: number; pagination: ReturnType<typeof buildCorePaginationMeta> }> {
    const trainerId = CoreRequestContext.getUserIdOrThrow();
    const result = await this.repo.findMany(trainerId, query);
    return { members: result.rows, total: result.total, page: query.page, limit: query.limit, pagination: buildCorePaginationMeta(result.total, query.page, query.limit) };
  }
  /** Returns a trainer-owned member detail record. */
  /**
 * Intent: Executes the findById operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes findById inside the owning backend service/repository boundary without exposing ORM details.
 * @param id - Input for findById.
 * @returns {Promise<MembersMemberDomain & { trainerNotes: MembersMemberNoteDomain[] }>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findById(id: string): Promise<MembersMemberDomain & { trainerNotes: MembersMemberNoteDomain[] }> {
    const trainerId = CoreRequestContext.getUserIdOrThrow();
    const member = await this.repo.findByIdForTrainerOrThrow(trainerId, id);
    const [notes, workoutHistory] = await Promise.all([this.repo.findNotes(id), this.repo.findWorkoutHistory(trainerId, id)]);
    return { ...member, workoutHistory, trainerNotes: notes };
  }
  /** Returns trainer-scoped member-page KPI statistics. */
  /**
 * Intent: Executes the findStats operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes findStats inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {Promise<{ total: number; active: number; pending: number; expired: number }>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findStats(): Promise<{ total: number; active: number; pending: number; expired: number }> {
    const stats = await this.repo.findStats(CoreRequestContext.getUserIdOrThrow()); return { total: stats.totalMembers, active: stats.activeMembers, pending: stats.pendingMembers, expired: stats.expiredMembers };
  }
  /** Returns notes for a trainer-owned member. */
  /**
 * Intent: Executes the findNotes operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes findNotes inside the owning backend service/repository boundary without exposing ORM details.
 * @param memberId - Input for findNotes.
 * @returns {Promise<MembersMemberNoteDomain[]>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findNotes(memberId: string): Promise<MembersMemberNoteDomain[]> {
    await this.repo.findByIdForTrainerOrThrow(CoreRequestContext.getUserIdOrThrow(), memberId);
    return this.repo.findNotes(memberId);
  }
  /** Returns trainer-owned member attendance history. */
  /**
 * Intent: Executes the findAttendance operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes findAttendance inside the owning backend service/repository boundary without exposing ORM details.
 * @param memberId - Input for findAttendance.
 * @returns {Promise<Array<Record<string, unknown>>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findAttendance(memberId: string): Promise<Array<Record<string, unknown>>> {
    await this.repo.findByIdForTrainerOrThrow(CoreRequestContext.getUserIdOrThrow(), memberId);
    return this.repo.findAttendance(memberId);
  }
  /** Returns active diet plan options. */
  /**
 * Intent: Executes the findDietPlans operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes findDietPlans inside the owning backend service/repository boundary without exposing ORM details.
 * @param memberId - Input for findDietPlans.
 * @returns {Promise<Array<Record<string, unknown>>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findDietPlans(memberId:string): Promise<Array<Record<string, unknown>>> { await this.repo.findByIdForTrainerOrThrow(CoreRequestContext.getUserIdOrThrow(), memberId); return this.repo.findDietPlans(); }
  /** Returns active workout options. */
  /**
 * Intent: Executes the findWorkouts operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes findWorkouts inside the owning backend service/repository boundary without exposing ORM details.
 * @param memberId - Input for findWorkouts.
 * @returns {Promise<Array<Record<string, unknown>>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findWorkouts(memberId:string): Promise<Array<Record<string, unknown>>> { const trainerId = CoreRequestContext.getUserIdOrThrow(); await this.repo.findByIdForTrainerOrThrow(trainerId, memberId); return this.repo.findWorkouts(trainerId); }
  /** Returns trainer-owned member progress history. */
  /**
 * Intent: Executes the findProgress operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes findProgress inside the owning backend service/repository boundary without exposing ORM details.
 * @param memberId - Input for findProgress.
 * @returns {Promise<Array<Record<string, unknown>>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findProgress(memberId: string): Promise<Array<Record<string, unknown>>> {
    await this.repo.findByIdForTrainerOrThrow(CoreRequestContext.getUserIdOrThrow(), memberId);
    return this.repo.findProgress(memberId);
  }
}
