// RESPONSIBILITY: Builds Trainer member list, detail, and related read contracts.
// FLOW: Members query controller → MembersQueryService → MembersRepository → mapper/domain.

import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { MembersRepository, type MembersListQuery } from '@/backend_trainer/modules/backend_trainer/members/repositories/members-repository';
import { MembersMemberMapper } from '@/backend_trainer/modules/backend_trainer/members/members-member.mapper';
import { buildCorePaginationMeta } from '@/backend_trainer/core/utils/core-pagination.utils';
import { MembersMemberNoteMapper } from '@/backend_trainer/modules/backend_trainer/members/members-member-note.mapper';

@Injectable()
export class MembersQueryService {
  constructor(private readonly repo: MembersRepository) {}

  /** Returns the trainer member list with pagination metadata. */
  async findMany(query: MembersListQuery): Promise<{ members: unknown[]; total: number; page: number; limit: number; pagination: ReturnType<typeof buildCorePaginationMeta> }> {
    const trainerId = CoreRequestContext.get().userId ?? '';
    const result = await this.repo.findMany(trainerId, query);
    return { members: result.rows.map(MembersMemberMapper), total: result.total, page: query.page, limit: query.limit, pagination: buildCorePaginationMeta(result.total, query.page, query.limit) };
  }

  /** Returns a trainer-owned member detail record. */
  async findById(id: string): Promise<ReturnType<typeof MembersMemberMapper> & { trainerNotes: ReturnType<typeof MembersMemberNoteMapper>[] }> {
    const trainerId = CoreRequestContext.get().userId ?? '';
    const member = MembersMemberMapper(await this.repo.findByIdForTrainerOrThrow(trainerId, id));
    const notes = (await this.repo.findNotes(id)).map(MembersMemberNoteMapper);
    return { ...member, trainerNotes: notes };
  }

  /** Returns trainer-scoped member-page KPI statistics. */
  async findStats(): Promise<{ total: number; active: number; pending: number; expired: number }> {
    const stats = await this.repo.findStats(CoreRequestContext.get().userId ?? ''); return { total: stats.totalMembers, active: stats.activeMembers, pending: stats.pendingMembers, expired: stats.expiredMembers };
  }

  /** Returns notes for a trainer-owned member. */
  async findNotes(memberId: string): Promise<ReturnType<typeof MembersMemberNoteMapper>[]> {
    await this.repo.findByIdForTrainerOrThrow(CoreRequestContext.get().userId ?? '', memberId);
    return (await this.repo.findNotes(memberId)).map(MembersMemberNoteMapper);
  }

  /** Returns trainer-owned member attendance history. */
  async findAttendance(memberId: string): Promise<Array<Record<string, unknown>>> {
    await this.repo.findByIdForTrainerOrThrow(CoreRequestContext.get().userId ?? '', memberId);
    return this.repo.findAttendance(memberId);
  }

  /** Returns active diet plan options. */
  async findDietPlans(memberId:string): Promise<Array<Record<string, unknown>>> { await this.repo.findByIdForTrainerOrThrow(CoreRequestContext.get().userId ?? '', memberId); return this.repo.findDietPlans(); }

  /** Returns active workout options. */
  async findWorkouts(memberId:string): Promise<Array<Record<string, unknown>>> { await this.repo.findByIdForTrainerOrThrow(CoreRequestContext.get().userId ?? '', memberId); return this.repo.findWorkouts(); }

  /** Returns trainer-owned member progress history. */
  async findProgress(memberId: string): Promise<Array<Record<string, unknown>>> {
    await this.repo.findByIdForTrainerOrThrow(CoreRequestContext.get().userId ?? '', memberId);
    return this.repo.findProgress(memberId);
  }
}
