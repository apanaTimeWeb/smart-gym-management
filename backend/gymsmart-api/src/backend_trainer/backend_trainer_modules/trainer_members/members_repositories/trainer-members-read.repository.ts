// RESPONSIBILITY: Owns Trainer member-related read projections that are not core member persistence.
// FLOW: Members query service → read repository → tenant datasource → frontend-shaped projection.
import { Injectable } from '@nestjs/common';
import { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';
import { IsNull } from 'typeorm';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver';
import { TrainerMembersMemberEntity } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member.entity';
import { TrainerMembersMemberNoteEntity } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member-note.entity';
import type { MembersMemberNoteDomain } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member-note.domain';
import { MembersMemberNoteMapper } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member-note.mapper';
import { CoreNotFoundException } from '@/backend_trainer/backend_core/core_errors/core-not-found.exception';
/**
 * Intent: Isolates secondary member projections from the transactional member repository.
 * Edge Cases: Every read must remain tenant-scoped, exclude soft-deleted rows, and preserve frontend field semantics.
 * Side Effects: None; this repository is read-only.
 * AI Note: Keep SQL/query-builder access here; never move ORM objects into business services.
 */
@Injectable()
export class TrainerMembersReadRepository {
  constructor(private readonly resolver: CoreTenantDatasourceResolver) {}
  /**
   * Intent: Returns trainer-authored notes for one active member.
   * Edge Cases: Soft-deleted notes must remain invisible and ordering must remain newest-first.
   * AI Note: Return domain objects, never TypeORM entities.
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
    const rows = await (await this.resolver.getRepository(TrainerMembersMemberNoteEntity)).find({ where: { memberId, deletedAt: IsNull() }, order: { createdAt: 'DESC' } });
    return rows.map((row) => MembersMemberNoteMapper(row));
  }
  /**
   * Intent: Returns the current-month attendance calendar projection used by the member detail screen.
   * Edge Cases: Ignore malformed dates and duplicate days; only checked-in rows become present days.
   * AI Note: Preserve day/status field names exactly.
   */
  /**
 * @description Executes findAttendance inside the owning backend service/repository boundary without exposing ORM details.
 * @param memberId - Input for findAttendance.
 * @returns {Promise<Array<{ day: number; status: 'P' }>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findAttendance(memberId: string): Promise<Array<{ day: number; status: 'P' }>> {
    const ds = await this.resolver.getDataSource();
    const rows = await ds.createQueryBuilder().select(['a.date AS date', 'a.check_in AS "checkIn"']).from('trainer_attendance_records', 'a')
      .where("a.member_id = :memberId AND a.deleted_at IS NULL AND a.date >= date_trunc('month', CURRENT_DATE)::date AND a.date < (date_trunc('month', CURRENT_DATE) + INTERVAL '1 month')::date", { memberId })
      .orderBy('a.date', 'ASC').getRawMany<{ date: string; checkIn: Date | string | null }>();
    const seenDays = new Set<number>();
    return rows.flatMap((row) => { const day = Number(String(row.date).slice(8, 10)); if (!Number.isInteger(day) || day < 1 || day > 31 || seenDays.has(day)) return []; seenDays.add(day); return row.checkIn !== null ? [{ day, status: 'P' as const }] : []; });
  }
  /**
   * Intent: Returns active diet plans as the frontend nutrition-card contract.
   * Edge Cases: Null nutrition fields remain omitted rather than fabricated.
   * AI Note: Keep values normalized to numbers and exclude soft-deleted plans.
   */
  /**
 * @description Executes findDietPlans inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {Promise<Array<Record<string, unknown>>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findDietPlans(): Promise<Array<Record<string, unknown>>> {
    const ds = await this.resolver.getDataSource();
    const rows = await ds.createQueryBuilder().select(['d.id AS id', 'd.name AS name', 'd.goal AS goal', 'd.calories AS calories', 'd.protein AS protein', 'd.carbs AS carbs', 'd.fats AS fats', 'd.description AS description', 'd.meals AS meals']).from('trainer_diet_plans', 'd').where('d.deleted_at IS NULL AND d.is_active = true').orderBy('d.name', 'ASC').getRawMany<{ id:string; name:string; goal:string; calories:number|string|null; protein:number|string|null; carbs:number|string|null; fats:number|string|null; description:string|null; meals:unknown[]|null }>();
    return rows.map((row) => ({ id: row.id, name: row.name, goal: row.goal, ...(row.calories !== null ? { calories: Number(row.calories) } : {}), ...(row.protein !== null ? { protein: Number(row.protein) } : {}), ...(row.carbs !== null ? { carbs: Number(row.carbs) } : {}), ...(row.fats !== null ? { fats: Number(row.fats) } : {}), ...(row.description !== null ? { description: row.description } : {}), ...(row.meals !== null ? { meals: row.meals } : {}) }));
  }
  /**
   * Intent: Returns active workouts belonging to the authenticated Trainer.
   * Edge Cases: Deleted/inactive workouts are excluded and nested exercise numeric fields are normalized.
   * AI Note: Never remove trainer scope from this query.
   */
  /**
 * @description Executes findWorkouts inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for findWorkouts.
 * @returns {Promise<Array<Record<string, unknown>>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findWorkouts(trainerId: string): Promise<Array<Record<string, unknown>>> {
    const ds = await this.resolver.getDataSource();
    const rows = await ds.createQueryBuilder().select(['w.id AS id', 'w.name AS name', 'w.level AS level', 'w.duration AS duration', 'w.focus AS focus', 'w.days AS days', 'w.instructions AS instructions', 'w.workout_exercises AS "workoutExercises"']).from('trainer_workouts', 'w').where('w.deleted_at IS NULL AND w.is_active = true AND w.trainer_id = :trainerId', { trainerId }).orderBy('w.name', 'ASC').getRawMany<{id:string;name:string;level:string;duration:number|string;focus:string|null;days:number|string|null;instructions:string|null;workoutExercises:unknown}>();
    return rows.map((row) => ({ id: row.id, name: row.name, level: row.level, duration: String(row.duration), ...(row.focus ? { focus: row.focus } : {}), ...(row.days !== null ? { days: Number(row.days) } : {}), ...(row.instructions !== null ? { instructions: row.instructions } : {}), workoutExercises: Array.isArray(row.workoutExercises) ? row.workoutExercises.filter((exercise): exercise is Record<string, unknown> => Boolean(exercise) && typeof exercise === 'object').map((exercise) => ({ ...exercise, ...(exercise.sets != null ? { sets: Number(exercise.sets) } : {}), ...(exercise.sortOrder != null ? { sortOrder: Number(exercise.sortOrder) } : {}) })) : [] }));
  }
  /**
   * Intent: Returns member progress history for charts and detail tables.
   * Edge Cases: Null measurements remain omitted; soft-deleted records remain hidden.
   * AI Note: Preserve exact frontend field names and numeric normalization.
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
    const ds = await this.resolver.getDataSource();
    const rows = await ds.createQueryBuilder().select(['p.id AS id', 'p.member_id AS "memberId"', 'p.date AS date', 'p.weight_kg AS "weightKg"', 'p.height_cm AS "heightCm"', 'p.bmi AS bmi', 'p.body_fat_percent AS "bodyFatPercent"', 'p.muscle_mass_kg AS "muscleMassKg"', 'p.chest_cm AS "chestCm"', 'p.waist_cm AS "waistCm"', 'p.hip_cm AS "hipCm"', 'p.notes AS notes', 'p.blood_pressure AS "bloodPressure"', 'p.resting_heart_rate AS "restingHeartRate"', 'p.vo2_max AS "vo2Max"', 'p.recorded_by AS "recordedBy"', 'p.progress_photos AS "progressPhotos"']).from('trainer_progress_entries', 'p').where('p.member_id = :memberId AND p.deleted_at IS NULL', { memberId }).orderBy('p.date', 'DESC').limit(100).getRawMany<{ id:string; memberId:string; date:string; weightKg:number|string; heightCm:number|string|null; bmi:number|string|null; bodyFatPercent:number|string|null; muscleMassKg:number|string|null; chestCm:number|string|null; waistCm:number|string|null; hipCm:number|string|null; notes:string|null; bloodPressure:string|null; restingHeartRate:number|string|null; vo2Max:number|string|null; recordedBy:string; progressPhotos:string[]|null }>();
    return rows.map((row) => ({ id: row.id, memberId: row.memberId, date: row.date, weightKg: Number(row.weightKg), ...(row.heightCm !== null ? { heightCm: Number(row.heightCm) } : {}), ...(row.bmi !== null ? { bmi: Number(row.bmi) } : {}), ...(row.bodyFatPercent !== null ? { bodyFatPercent: Number(row.bodyFatPercent) } : {}), ...(row.muscleMassKg !== null ? { muscleMassKg: Number(row.muscleMassKg) } : {}), ...(row.chestCm !== null ? { chestCm: Number(row.chestCm) } : {}), ...(row.waistCm !== null ? { waistCm: Number(row.waistCm) } : {}), ...(row.hipCm !== null ? { hipCm: Number(row.hipCm) } : {}), ...(row.notes !== null ? { notes: row.notes } : {}), ...(row.bloodPressure !== null ? { bloodPressure: row.bloodPressure } : {}), ...(row.restingHeartRate !== null ? { restingHeartRate: Number(row.restingHeartRate) } : {}), ...(row.vo2Max !== null ? { vo2Max: Number(row.vo2Max) } : {}), ...(row.recordedBy ? { recordedBy: row.recordedBy } : {}), ...(row.progressPhotos ? { progressPhotos: row.progressPhotos } : {}) }));
  }
  /**
   * Intent: Returns historical workout assignments for a trainer-owned member.
   * Edge Cases: Ended plans are reported completed; active plans retain Active status.
   * AI Note: Keep trainer and member ownership predicates in the SQL query.
   */
  /**
 * @description Executes findWorkoutHistory inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for findWorkoutHistory.
 * @param memberId - Input for findWorkoutHistory.
 * @returns {Promise<Array<{ id: string; name: string; date: string; level: string; status: string }>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findWorkoutHistory(trainerId: string, memberId: string): Promise<Array<{ id: string; name: string; date: string; level: string; status: string }>> {
    const rows = await (await this.resolver.getDataSource()).createQueryBuilder().select(['w.id AS id', 'w.name AS name', 'w.level AS level', 'w.start_date AS startDate', 'w.end_date AS endDate', 'w.is_active AS isActive']).from('trainer_workouts', 'w').where('w.trainer_id=:trainerId AND w.assigned_member_id=:memberId AND w.deleted_at IS NULL', { trainerId, memberId }).orderBy('w.start_date', 'DESC').addOrderBy('w.created_at', 'DESC').limit(100).getRawMany<{id:string;name:string;level:string;startDate:string|null;endDate:string|null;isActive:boolean}>();
    return rows.map((row) => ({ id: row.id, name: row.name, date: `${row.startDate ?? ''}${row.endDate ? ` - ${row.endDate}` : ''}`, level: row.level, status: row.endDate && row.endDate < new Date().toISOString().slice(0, 10) ? 'Completed' : row.isActive ? 'Active' : 'Completed' }));
  }
  /**
   * Intent: Returns member-page KPI counts restricted to the selected Trainer.
   * Edge Cases: Unknown statuses remain excluded from named counters while totalMembers still reflects all active records.
   * AI Note: Do not compute these counts from the current pagination page.
   */
  /**
 * @description Executes findStats inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for findStats.
 * @returns {Promise<{ totalMembers: number; activeMembers: number; pendingMembers: number; expiredMembers: number }>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findStats(trainerId: string): Promise<{ totalMembers: number; activeMembers: number; pendingMembers: number; expiredMembers: number }> {
    const repo = await this.resolver.getRepository(TrainerMembersMemberEntity);
    const rows = await repo.createQueryBuilder('m').select('m.status', 'status').addSelect('COUNT(1)', 'count').where('m.deleted_at IS NULL AND m.assigned_trainer_id = :trainerId', { trainerId }).groupBy('m.status').getRawMany<{ status: string; count: string }>();
    const counts = { totalMembers: 0, activeMembers: 0, pendingMembers: 0, expiredMembers: 0 };
    for (const row of rows) { const count = Number(row.count); counts.totalMembers += count; if (row.status === 'ACTIVE') counts.activeMembers = count; if (row.status === 'PENDING') counts.pendingMembers = count; if (row.status === 'EXPIRED') counts.expiredMembers = count; }
    return counts;
  }
  /**
   * Intent: Resolves the authoritative diet assignment snapshot used in member persistence.
   * Edge Cases: Deleted or inactive plans must not be assignable.
   * AI Note: This remains repository-owned because it accesses tenant ORM/query-builder state.
   */
  /**
 * @description Executes findDietSnapshotOrThrow inside the owning backend service/repository boundary without exposing ORM details.
 * @param id - Input for findDietSnapshotOrThrow.
 * @param context - Input for findDietSnapshotOrThrow.
 * @returns {Promise<Record<string, unknown>>} The typed result defined by the owning contract.
 * @throws CoreNotFoundException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findDietSnapshotOrThrow(id: string, context?: CoreTransactionContext): Promise<Record<string, unknown>> {
    const runner = context ? context.getRepository(TrainerMembersMemberEntity).manager : await this.resolver.getDataSource();
    const row = await runner.createQueryBuilder().select(['d.id AS id','d.name AS name','d.goal AS goal','d.calories AS calories','d.protein AS protein','d.carbs AS carbs','d.fats AS fats','d.description AS description','d.meals AS meals']).from('trainer_diet_plans','d').where('d.id=:id AND d.deleted_at IS NULL AND d.is_active=true',{id}).getRawOne<{id:string;name:string;goal:string;calories:number|string|null;protein:number|string|null;carbs:number|string|null;fats:number|string|null;description:string|null;meals:unknown[]|null}>();
    if (!row) throw new CoreNotFoundException('MEMBERS.DIET_PLAN', id);
    return { id: row.id, name: row.name, goal: row.goal, ...(row.calories !== null ? { calories: Number(row.calories) } : {}), ...(row.protein !== null ? { protein: Number(row.protein) } : {}), ...(row.carbs !== null ? { carbs: Number(row.carbs) } : {}), ...(row.fats !== null ? { fats: Number(row.fats) } : {}), ...(row.description !== null ? { description: row.description } : {}), ...(row.meals !== null ? { meals: row.meals } : {}) };
  }
  /**
   * Intent: Resolves an authoritative workout assignment snapshot for a Trainer member update.
   * Edge Cases: Cross-Trainer workout IDs must be rejected and inactive/deleted workouts ignored.
   * AI Note: Keep trainer scope in the SQL predicate.
   */
  /**
 * @description Executes findWorkoutSnapshotOrThrow inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for findWorkoutSnapshotOrThrow.
 * @param id - Input for findWorkoutSnapshotOrThrow.
 * @param context - Input for findWorkoutSnapshotOrThrow.
 * @returns {Promise<Record<string, unknown>>} The typed result defined by the owning contract.
 * @throws CoreNotFoundException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findWorkoutSnapshotOrThrow(trainerId: string, id: string, context?: CoreTransactionContext): Promise<Record<string, unknown>> {
    const runner = context ? context.getRepository(TrainerMembersMemberEntity).manager : await this.resolver.getDataSource();
    const row = await runner.createQueryBuilder().select(['w.id AS id','w.name AS name','w.level AS level','w.duration AS duration','w.focus AS focus','w.days AS days','w.instructions AS instructions','w.workout_exercises AS "workoutExercises"']).from('trainer_workouts','w').where('w.id=:id AND w.trainer_id=:trainerId AND w.deleted_at IS NULL AND w.is_active=true',{id,trainerId}).getRawOne<{id:string;name:string;level:string;duration:string|number;focus:string|null;days:string|number|null;instructions:string|null;workoutExercises:unknown}>();
    if (!row) throw new CoreNotFoundException('MEMBERS.WORKOUT', id);
    return { id: row.id, name: row.name, level: row.level, duration: String(row.duration), ...(row.focus !== null ? { focus: row.focus } : {}), ...(row.days !== null ? { days: Number(row.days) } : {}), ...(row.instructions !== null ? { instructions: row.instructions } : {}), workoutExercises: Array.isArray(row.workoutExercises) ? row.workoutExercises.filter((exercise): exercise is Record<string, unknown> => Boolean(exercise) && typeof exercise === 'object').map((exercise) => ({ ...exercise, ...(exercise.sets !== undefined ? { sets: Number(exercise.sets) } : {}) })) : [] };
  }
}
