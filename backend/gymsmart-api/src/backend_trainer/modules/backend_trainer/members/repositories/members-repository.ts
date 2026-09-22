import { IsNull } from 'typeorm';
// RESPONSIBILITY: Owns Trainer member persistence and trainer-scoped read queries.
// FLOW: Members service → MembersRepository → tenant TypeORM/query builder.

import { Injectable } from '@nestjs/common';
import { CoreBaseRepository } from '@/backend_trainer/core/database/core-base.repository';
import { CoreNotFoundException } from '@/backend_trainer/core/errors/core-not-found.exception';
import { CoreTenantDataSourceResolver } from '@/backend_trainer/core/database/core-tenant-datasource.resolver';
import { MembersMemberEntity } from '@/backend_trainer/modules/backend_trainer/members/members-member.entity';
import { MembersMemberNoteEntity } from '@/backend_trainer/modules/backend_trainer/members/members-member-note.entity';
import type { MembersUpdateInput } from '@/backend_trainer/modules/backend_trainer/members/members.interfaces';

export interface MembersListQuery {
  page: number; limit: number; search?: string; status?: string; progressStatus?: string;
  sortBy: string; sortDirection: string;
}

@Injectable()
export class MembersRepository extends CoreBaseRepository {
  constructor(private readonly resolver: CoreTenantDataSourceResolver) { super(); }

  /** Lists active members assigned to the authenticated trainer. */
  async findMany(trainerId: string, query: MembersListQuery): Promise<{ rows: MembersMemberEntity[]; total: number }> {
    const repo = await this.resolver.getRepository(MembersMemberEntity);
    const allowed = { id: 'm.id', name: 'm.name', status: 'm.status', expiryDate: 'm.expiry_date', progressStatus: 'm.progress_status' } as const;
    const qb = repo.createQueryBuilder('m').where('m.deleted_at IS NULL AND m.assigned_trainer_id = :trainerId', { trainerId });
    if (query.search) qb.andWhere('(m.name ILIKE :search OR m.email ILIKE :search OR m.phone ILIKE :search)', { search: `%${query.search}%` });
    if (query.status === 'EXPIRING_SOON') qb.andWhere("m.expiry_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'"); else if (query.status === 'NEW') qb.andWhere("m.join_date >= CURRENT_DATE - INTERVAL '30 days'"); else if (query.status) qb.andWhere('m.status = :status', { status: query.status });
    if (query.progressStatus) qb.andWhere('m.progress_status = :progressStatus', { progressStatus: query.progressStatus });
    qb.orderBy(allowed[query.sortBy as keyof typeof allowed] ?? allowed.name, query.sortDirection === 'asc' ? 'ASC' : 'DESC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [rows, total] = await qb.getManyAndCount();
    return { rows, total };
  }

  /** Finds one active member only when it belongs to the authenticated trainer. */
  async findByIdForTrainer(trainerId: string, id: string): Promise<MembersMemberEntity | null> {
    return (await this.resolver.getRepository(MembersMemberEntity)).findOneBy({ id, assignedTrainerId: trainerId, deletedAt: IsNull() });
  }

  /** Returns a trainer-owned active member or raises a typed not-found exception. */
  async findByIdForTrainerOrThrow(trainerId: string, id: string): Promise<MembersMemberEntity> {
    return this.requireEntity(await this.findByIdForTrainer(trainerId, id), 'MEMBERS.MEMBER', id);
  }

  /** Updates a trainer-owned member with application-level fields only. */
  async updateMemberById(trainerId: string, id: string, input: MembersUpdateInput): Promise<MembersMemberEntity> {
    const repo = await this.resolver.getRepository(MembersMemberEntity);
    const { joinDate, expiryDate, ...fields } = input;
    const persistence: Partial<MembersMemberEntity> = { ...fields, ...(joinDate !== undefined ? { joinDate: new Date(joinDate) } : {}), ...(expiryDate !== undefined ? { expiryDate: new Date(expiryDate) } : {}) };
    const result = await repo.update({ id, assignedTrainerId: trainerId, deletedAt: IsNull() }, persistence as any);
    if (!result.affected) throw new CoreNotFoundException('MEMBERS.MEMBER', id);
    return this.findByIdForTrainerOrThrow(trainerId, id);
  }

  /** Creates a member note for a trainer-owned member. */
  async createNote(memberId: string, authorId: string, text: string): Promise<MembersMemberNoteEntity> {
    const repo = await this.resolver.getRepository(MembersMemberNoteEntity);
    return repo.save(repo.create({ memberId, authorId, text }));
  }

  /** Lists notes for a trainer-owned member. */
  async findNotes(memberId: string): Promise<MembersMemberNoteEntity[]> {
    return (await this.resolver.getRepository(MembersMemberNoteEntity)).find({ where: { memberId, deletedAt: IsNull() }, order: { createdAt: 'DESC' } });
  }

  /** Returns attendance history for a trainer-owned member without importing another business module. */
  async findAttendance(memberId: string): Promise<Array<{ date: string; checkIn: string | null; checkOut: string | null; durationMinutes: number | null }>> {
    const ds = await this.resolver.getDataSource();
    return ds.createQueryBuilder().select([
      'a.date AS date', 'a.check_in AS "checkIn"', 'a.check_out AS "checkOut"', 'a.duration_minutes AS "durationMinutes"',
    ]).from('trainer_attendance_records', 'a').where('a.member_id = :memberId AND a.deleted_at IS NULL', { memberId }).orderBy('a.date', 'DESC').limit(100).getRawMany();
  }

  /** Returns active diet plans used by the member detail selector. */
  async findDietPlans(): Promise<Array<Record<string, unknown>>> {
    const ds = await this.resolver.getDataSource();
    return ds.createQueryBuilder().select([
      'd.id AS id', 'd.name AS name', 'd.goal AS goal', 'd.calories AS calories', 'd.protein AS protein', 'd.carbs AS carbs', 'd.fats AS fats', 'd.description AS description', 'd.meals AS meals',
    ]).from('trainer_diet_plans', 'd').where('d.deleted_at IS NULL AND d.is_active = true').orderBy('d.name', 'ASC').getRawMany();
  }

  /** Returns active workout plans used by the member detail selector. */
  async findWorkouts(): Promise<Array<Record<string, unknown>>> {
    const ds = await this.resolver.getDataSource();
    return ds.createQueryBuilder().select([
      'w.id AS id', 'w.name AS name', 'w.level AS level', 'w.duration AS duration', 'w.focus AS focus', 'w.days AS days', 'w.instructions AS instructions', 'w.workout_exercises AS "workoutExercises"',
    ]).from('trainer_workouts', 'w').where('w.deleted_at IS NULL AND w.is_active = true').orderBy('w.name', 'ASC').getRawMany();
  }

  /** Returns progress history for a trainer-owned member. */
  async findProgress(memberId: string): Promise<Array<Record<string, unknown>>> {
    const ds = await this.resolver.getDataSource();
    return ds.createQueryBuilder().select([
      'p.id AS id', 'p.date AS date', 'p.weight_kg AS "weightKg"', 'p.height_cm AS "heightCm"', 'p.bmi AS bmi', 'p.body_fat_percent AS "bodyFatPercent"', 'p.muscle_mass_kg AS "muscleMassKg"',
    ]).from('trainer_progress_entries', 'p').where('p.member_id = :memberId AND p.deleted_at IS NULL', { memberId }).orderBy('p.date', 'DESC').limit(100).getRawMany();
  }

  /** Returns KPI counts restricted to trainer-owned members. */
  async findStats(trainerId: string): Promise<{ totalMembers: number; activeMembers: number; pendingMembers: number; expiredMembers: number }> {
    const repo = await this.resolver.getRepository(MembersMemberEntity);
    const rows = await repo.createQueryBuilder('m').select('m.status', 'status').addSelect('COUNT(1)', 'count').where('m.deleted_at IS NULL AND m.assigned_trainer_id = :trainerId', { trainerId }).groupBy('m.status').getRawMany<{ status: string; count: string }>();
    const counts = { totalMembers: 0, activeMembers: 0, pendingMembers: 0, expiredMembers: 0 };
    for (const row of rows) {
      const count = Number(row.count);
      counts.totalMembers += count;
      if (row.status === 'ACTIVE') counts.activeMembers = count;
      if (row.status === 'PENDING') counts.pendingMembers = count;
      if (row.status === 'EXPIRED') counts.expiredMembers = count;
    }
    return counts;
  }
}
