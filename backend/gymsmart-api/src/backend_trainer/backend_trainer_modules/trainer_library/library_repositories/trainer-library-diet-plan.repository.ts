// RESPONSIBILITY: Owns Trainer diet-plan persistence, assignment state, and trainer-scoped lookup queries.
// FLOW: Library service → TrainerLibraryDietPlanRepository → tenant datasource/transaction → domain mapper.

import { Injectable } from '@nestjs/common';
import { IsNull } from 'typeorm';
import { CoreBaseRepository } from '@/backend_trainer/backend_core/core_database/core-base.repository';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver';
import { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';
import { CoreNotFoundException } from '@/backend_trainer/backend_core/core_errors/core-not-found.exception';
import { TrainerLibraryDietPlanAssignmentEntity } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library-diet-plan-assignment.entity';
import { TrainerLibraryDietPlanEntity } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library-diet-plan.entity';
import { LibraryDietPlanMapper } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library-diet-plan.mapper';
import type { LibraryDietPlanDomain } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library-diet-plan.domain';

/**
 * Intent: Keeps TypeORM access isolated to the library persistence boundary while exposing typed domain results.
 * Edge Cases: All reads ignore soft-deleted rows; trainer-owned assignment queries require explicit trainer scoping.
 * Side Effects: Mutations use the caller transaction when supplied and preserve audit/event transaction boundaries.
 * AI Note: Never import this repository into another feature or return raw ORM entities to a service.
 */
@Injectable()
export class TrainerLibraryDietPlanRepository extends CoreBaseRepository {
  constructor(private readonly resolver: CoreTenantDatasourceResolver) {
    super();
  }

  /**
   * @description Lists active diet plans with allowlisted search, goal, sorting, and pagination.
   * @param q - Validated library list query.
   * @returns {Promise<{ rows: LibraryDietPlanDomain[]; total: number }>} Domain rows plus total count.
   * @throws Infrastructure exceptions propagated by the tenant datasource.
   * AI Note: Keep ORM access inside this repository and return domain data to services.
   */
  async findDietPlans(q: { page: number; limit: number; search?: string; goal?: string; sortBy: string; sortDirection: string }): Promise<{ rows: LibraryDietPlanDomain[]; total: number }> {
    const repo = await this.resolver.getRepository(TrainerLibraryDietPlanEntity);
    const allowed = { name: 'd.name', goal: 'd.goal', calories: 'd.calories' } as const;
    const qb = repo.createQueryBuilder('d').where('d.deleted_at IS NULL AND d.is_active=true');
    if (q.search) qb.andWhere('(d.name ILIKE :s OR d.description ILIKE :s)', { s: `%${q.search}%` });
    if (q.goal) qb.andWhere('d.goal=:goal', { goal: q.goal });
    qb.orderBy(allowed[q.sortBy as keyof typeof allowed] ?? allowed.name, q.sortDirection === 'asc' ? 'ASC' : 'DESC');
    qb.skip((q.page - 1) * q.limit).take(q.limit);
    const rows = await qb.getMany();
    return { rows: rows.map(LibraryDietPlanMapper), total: await qb.getCount() };
  }

  /**
   * @description Finds one active diet plan by identifier.
   * @param id - Diet plan UUID.
   * @returns {Promise<LibraryDietPlanDomain | null>} Domain model when present, otherwise null.
   * @throws Infrastructure exceptions propagated by the tenant datasource.
   * AI Note: Keep ORM access inside this repository and return domain data to services.
   */
  async findById(id: string): Promise<LibraryDietPlanDomain | null> {
    const row = await (await this.resolver.getRepository(TrainerLibraryDietPlanEntity)).findOneBy({ id, deletedAt: IsNull() });
    return row ? LibraryDietPlanMapper(row) : null;
  }

  /**
   * @description Finds one active diet plan or raises the canonical not-found exception.
   * @param id - Diet plan UUID.
   * @returns {Promise<LibraryDietPlanDomain>} The active diet-plan domain model.
   * @throws CoreNotFoundException when the plan does not exist or is soft-deleted.
   * AI Note: Preserve soft-delete filtering and the repository → mapper → domain boundary.
   */
  async findByIdOrThrow(id: string): Promise<LibraryDietPlanDomain> {
    const row = await this.findById(id);
    if (!row) throw new CoreNotFoundException('LIBRARY.DIET_PLAN', id);
    return row;
  }

  /**
   * @description Updates one active diet plan inside an optional caller transaction.
   * @param id - Diet plan UUID.
   * @param input - Validated persistence fields.
   * @param context - Optional transaction context supplied by the command orchestrator.
   * @returns {Promise<LibraryDietPlanDomain>} Updated domain model.
   * @throws CoreNotFoundException when the target is absent or soft-deleted.
   * AI Note: Do not expose TypeORM entities outside this repository.
   */
  async updateDietPlanById(id: string, input: Partial<TrainerLibraryDietPlanEntity>, context?: CoreTransactionContext): Promise<LibraryDietPlanDomain> {
    const repo = context?.getRepository(TrainerLibraryDietPlanEntity) ?? await this.resolver.getRepository(TrainerLibraryDietPlanEntity);
    const result = await repo.update({ id, deletedAt: IsNull() }, input as any);
    if (!result.affected) throw new CoreNotFoundException('LIBRARY.DIET_PLAN', id);
    return repo.findOneByOrFail({ id, deletedAt: IsNull() }).then(LibraryDietPlanMapper);
  }

  /**
   * @description Soft-deletes one active diet plan inside an optional transaction.
   * @param id - Diet plan UUID.
   * @param context - Optional transaction context.
   * @returns {Promise<void>} Completes after the soft-delete is persisted.
   * @throws CoreNotFoundException when the target is absent or already deleted.
   * AI Note: Soft deletion must remain tenant-scoped and transaction-aware.
   */
  async softDeleteDietPlan(id: string, context?: CoreTransactionContext): Promise<void> {
    const repo = context?.getRepository(TrainerLibraryDietPlanEntity) ?? await this.resolver.getRepository(TrainerLibraryDietPlanEntity);
    const result = await repo.softDelete({ id, deletedAt: IsNull() });
    if (!result.affected) throw new CoreNotFoundException('LIBRARY.DIET_PLAN', id);
  }

  /**
   * @description Lists diet assignments for members assigned to the authenticated Trainer.
   * @param trainerId - Trusted Trainer UUID from request context.
   * @returns {Promise<Array<Record<string, unknown>>>} Assignment rows for UI selection state.
   * @throws Infrastructure exceptions propagated by the tenant datasource.
   * AI Note: Keep ORM access inside this repository and return domain data to services.
   */
  async findAssignedMembers(trainerId: string): Promise<Array<Record<string, unknown>>> {
    const ds = await this.resolver.getDataSource();
    return ds.createQueryBuilder()
      .select(['m.id AS id', 'm.name AS name', 'm.assigned_diet_id AS "assignedDietPlanId"'])
      .from('trainer_members', 'm')
      .where('m.deleted_at IS NULL AND m.assigned_trainer_id=:trainerId', { trainerId })
      .orderBy('m.name', 'ASC')
      .getRawMany<{ id: string; name: string; assignedDietPlanId: string | null }>();
  }

  /**
   * @description Verifies that an active member is assigned to the authenticated Trainer.
   * @param memberId - Member UUID.
   * @param trainerId - Trusted Trainer UUID.
   * @returns {Promise<void>} Completes when ownership is proven.
   * @throws CoreNotFoundException when the member is outside the Trainer scope.
   * AI Note: Never weaken Trainer ownership or tenant scoping for convenience.
   */
  async assertMemberOwnedByTrainer(memberId: string, trainerId: string): Promise<void> {
    const ds = await this.resolver.getDataSource();
    const row = await ds.createQueryBuilder()
      .select('m.id', 'id')
      .from('trainer_members', 'm')
      .where('m.id=:memberId AND m.assigned_trainer_id=:trainerId AND m.deleted_at IS NULL', { memberId, trainerId })
      .getRawOne<{ id: string }>();
    if (!row?.id) throw new CoreNotFoundException('LIBRARY.MEMBER', memberId);
  }

  /**
   * @description Loads the current assigned diet and snapshot for one Trainer-owned member.
   * @param memberId - Member UUID.
   * @param trainerId - Trusted Trainer UUID.
   * @returns {Promise<{ assignedDietId: string | null; assignedDietSnapshot: Record<string, unknown> | null }>} Current assignment state.
   * @throws CoreNotFoundException when the member is outside the Trainer scope.
   * AI Note: Never weaken Trainer ownership or tenant scoping for convenience.
   */
  async findMemberDietAssignmentState(memberId: string, trainerId: string): Promise<{ assignedDietId: string | null; assignedDietSnapshot: Record<string, unknown> | null }> {
    const row = await (await this.resolver.getDataSource()).createQueryBuilder()
      .select(['m.assigned_diet_id AS "assignedDietId"', 'm.assigned_diet_snapshot AS "assignedDietSnapshot"'])
      .from('trainer_members', 'm')
      .where('m.id=:memberId AND m.assigned_trainer_id=:trainerId AND m.deleted_at IS NULL', { memberId, trainerId })
      .getRawOne<{ assignedDietId: string | null; assignedDietSnapshot: Record<string, unknown> | null }>();
    if (!row) throw new CoreNotFoundException('LIBRARY.MEMBER', memberId);
    return row;
  }

  /**
   * @description Atomically assigns a diet plan and its relationship row to a Trainer-owned member.
   * @param memberId - Member UUID.
   * @param dietPlanId - Diet plan UUID.
   * @param trainerId - Trusted Trainer UUID.
   * @param snapshot - Frozen UI snapshot for historical assignment display.
   * @param context - Required transaction context for atomicity.
   * @returns {Promise<void>} Completes after member state and assignment row are committed by the caller.
   * @throws CoreNotFoundException when the member is outside the Trainer scope.
   * AI Note: Never weaken Trainer ownership or tenant scoping for convenience.
   */
  async assignDiet(memberId: string, dietPlanId: string, trainerId: string, snapshot: Record<string, unknown>, context: CoreTransactionContext): Promise<void> {
    await context.run(async (manager) => {
      const memberResult = await manager.createQueryBuilder()
        .update('trainer_members')
        .set({ assigned_diet_id: dietPlanId, assigned_diet_snapshot: snapshot })
        .where('id=:memberId AND assigned_trainer_id=:trainerId AND deleted_at IS NULL', { memberId, trainerId })
        .execute();
      if (!memberResult.affected) throw new CoreNotFoundException('LIBRARY.MEMBER', memberId);
      const repo = manager.getRepository(TrainerLibraryDietPlanAssignmentEntity);
      await repo.save(repo.create({ memberId, dietPlanId, assignedBy: trainerId, assignedAt: new Date() }));
    });
  }
}
