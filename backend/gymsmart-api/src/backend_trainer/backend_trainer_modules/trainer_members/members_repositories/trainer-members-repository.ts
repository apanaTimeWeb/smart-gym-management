// RESPONSIBILITY: Owns Trainer member persistence and core trainer-scoped member queries.
// FLOW: Members service → TrainerMembersRepository → tenant TypeORM/query builder → mapper/domain.

import { Injectable } from '@nestjs/common';
import { IsNull } from 'typeorm';
import type { MembersListQuery } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_types/trainer-members-list-query.type';
import type { MembersMemberDomain } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member.domain';
import type { MembersMemberNoteDomain } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member-note.domain';
import { MembersMemberMapper } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member.mapper';
import { TrainerMembersMemberEntity } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member.entity';
import { TrainerMembersMemberNoteEntity } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member-note.entity';
import type { MembersUpdateInput } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_types/trainer-members.types';
import { CoreBaseRepository } from '@/backend_trainer/backend_core/core_database/core-base.repository';
import { CoreNotFoundException } from '@/backend_trainer/backend_core/core_errors/core-not-found.exception';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver';
import { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';
import { TrainerMembersReadRepository } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_repositories/trainer-members-read.repository';

/**
 * Intent: Owns primary member persistence and trainer-scoped identity lookup.
 * Edge Cases: Mutations must remain tenant-scoped, soft-delete aware, and mapper-isolated from ORM entities.
 * Side Effects: Writes are performed through the supplied UnitOfWork transaction context when present.
 * AI Note: Keep secondary projections in TrainerMembersReadRepository and never leak ORM entities upward.
 */
@Injectable()
export class TrainerMembersRepository extends CoreBaseRepository {
  constructor(private readonly resolver: CoreTenantDatasourceResolver, private readonly readRepository: TrainerMembersReadRepository) { super(); }

  /**
   * Intent: Lists active members owned by one Trainer with server-side filtering, sorting, and pagination.
   * Edge Cases: Unsupported sort fields fall back to the name allowlist; deleted members remain excluded.
   * AI Note: Never move this query into a controller or service.
   */
  async findMany(trainerId: string, query: MembersListQuery): Promise<{ rows: MembersMemberDomain[]; total: number }> {
    const repo = await this.resolver.getRepository(TrainerMembersMemberEntity);
    const allowed = { id: 'm.id', name: 'm.name', status: 'm.status', expiryDate: 'm.expiry_date', progressStatus: 'm.progress_status' } as const;
    const qb = repo.createQueryBuilder('m').where('m.deleted_at IS NULL AND m.assigned_trainer_id = :trainerId', { trainerId });
    if (query.search) qb.andWhere('(m.name ILIKE :search OR m.email ILIKE :search OR m.phone ILIKE :search)', { search: `%${query.search}%` });
    if (query.status === 'EXPIRING_SOON') qb.andWhere("m.expiry_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'"); else if (query.status === 'NEW') qb.andWhere("m.join_date >= CURRENT_DATE - INTERVAL '30 days'"); else if (query.status) qb.andWhere('m.status = :status', { status: query.status });
    if (query.progressStatus) qb.andWhere('m.progress_status = :progressStatus', { progressStatus: query.progressStatus });
    qb.orderBy(allowed[query.sortBy as keyof typeof allowed] ?? allowed.name, query.sortDirection === 'asc' ? 'ASC' : 'DESC').skip((query.page - 1) * query.limit).take(query.limit);
    const [rows, total] = await qb.getManyAndCount();
    return { rows: rows.map((row) => MembersMemberMapper(row)), total };
  }

  /** Returns one active member when it belongs to the authenticated Trainer. */
  async findByIdForTrainer(trainerId: string, id: string): Promise<MembersMemberDomain | null> {
    const entity = await (await this.resolver.getRepository(TrainerMembersMemberEntity)).findOneBy({ id, assignedTrainerId: trainerId, deletedAt: IsNull() });
    return entity ? MembersMemberMapper(entity) : null;
  }

  /** Returns a trainer-owned active member or raises the canonical typed not-found error. */
  async findByIdForTrainerOrThrow(trainerId: string, id: string): Promise<MembersMemberDomain> {
    const member = await this.findByIdForTrainer(trainerId, id);
    if (!member) throw new CoreNotFoundException('MEMBERS.MEMBER', id);
    return member;
  }

  /**
   * Intent: Updates a member and refreshes assignment snapshots from authoritative tenant rows.
   * Edge Cases: Null assignments clear relationships; cross-Trainer workout assignments are rejected.
   * AI Note: Keep update persistence inside the repository transaction boundary.
   */
  async updateMemberById(trainerId: string, id: string, input: MembersUpdateInput, context?: CoreTransactionContext): Promise<MembersMemberDomain> {
    const { joinDate, expiryDate, assignedDietId, assignedWorkoutId, ...fields } = input;
    const assignments = await this.resolveAssignmentPersistence(trainerId, assignedDietId, assignedWorkoutId, context);
    const persistence: Partial<TrainerMembersMemberEntity> = { ...fields, ...assignments, ...(joinDate !== undefined ? { joinDate: new Date(joinDate) } : {}), ...(expiryDate !== undefined ? { expiryDate: new Date(expiryDate) } : {}) };
    const repo = context?.getRepository(TrainerMembersMemberEntity) ?? await this.resolver.getRepository(TrainerMembersMemberEntity);
    const result = await repo.update({ id, assignedTrainerId: trainerId, deletedAt: IsNull() }, persistence as any);
    if (!result.affected) throw new CoreNotFoundException('MEMBERS.MEMBER', id);
    const entity = await repo.findOneBy({ id, assignedTrainerId: trainerId, deletedAt: IsNull() });
    if (!entity) throw new CoreNotFoundException('MEMBERS.MEMBER', id);
    return MembersMemberMapper(entity);
  }

  /** Resolves authoritative relationship snapshots inside the supplied transaction when available. */
  private async resolveAssignmentPersistence(trainerId: string, dietId?: string | null, workoutId?: string | null, context?: CoreTransactionContext): Promise<Partial<TrainerMembersMemberEntity>> {
    return {
      ...(dietId !== undefined ? { assignedDietId: dietId, assignedDietSnapshot: dietId === null ? null : await this.readRepository.findDietSnapshotOrThrow(dietId, context) } : {}),
      ...(workoutId !== undefined ? { assignedWorkoutId: workoutId, assignedWorkoutSnapshot: workoutId === null ? null : await this.readRepository.findWorkoutSnapshotOrThrow(trainerId, workoutId, context) } : {}),
    };
  }

  /** Persists a trainer-authored note inside the caller transaction when supplied. */
  async createNote(memberId: string, authorId: string, text: string, context?: CoreTransactionContext): Promise<{ id: string }> {
    const repo = context?.getRepository(TrainerMembersMemberNoteEntity) ?? await this.resolver.getRepository(TrainerMembersMemberNoteEntity);
    const saved = await repo.save(repo.create({ memberId, authorId, text }));
    return { id: saved.id };
  }

  /** Delegates secondary read projections to the dedicated read repository. */
  async findNotes(memberId: string): Promise<MembersMemberNoteDomain[]> { return this.readRepository.findNotes(memberId); }
  /** Delegates member attendance projection to the dedicated read repository. */
  async findAttendance(memberId: string): Promise<Array<{ day: number; status: 'P' }>> { return this.readRepository.findAttendance(memberId); }
  /** Delegates diet-plan projection to the dedicated read repository. */
  async findDietPlans(): Promise<Array<Record<string, unknown>>> { return this.readRepository.findDietPlans(); }
  /** Delegates workout projection to the dedicated read repository. */
  async findWorkouts(trainerId: string): Promise<Array<Record<string, unknown>>> { return this.readRepository.findWorkouts(trainerId); }
  /** Delegates progress projection to the dedicated read repository. */
  async findProgress(memberId: string): Promise<Array<Record<string, unknown>>> { return this.readRepository.findProgress(memberId); }
  /** Delegates workout history projection to the dedicated read repository. */
  async findWorkoutHistory(trainerId: string, memberId: string): Promise<Array<{ id: string; name: string; date: string; level: string; status: string }>> { return this.readRepository.findWorkoutHistory(trainerId, memberId); }
  /** Delegates member KPI aggregation to the dedicated read repository. */
  async findStats(trainerId: string): Promise<{ totalMembers: number; activeMembers: number; pendingMembers: number; expiredMembers: number }> { return this.readRepository.findStats(trainerId); }
}
