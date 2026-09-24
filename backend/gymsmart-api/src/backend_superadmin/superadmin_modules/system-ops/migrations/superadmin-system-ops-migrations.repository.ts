// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the migrations feature; no business logic.
// FLOW: migrations service -> SuperadminSystemOpsMigrationsRepository -> TypeORM Repository<SuperadminSystemOpsMigrationsEntity> -> PostgreSQL `migration_logs`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperadminCoreBaseRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.repository';
import { SuperadminCoreTransactionContext } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-transaction-context';
import { SuperadminSystemOpsMigrationsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.entity';
import type { SuperadminMigrationsListQuery, SuperadminMigrationsCreateInput, SuperadminMigrationsUpdateInput } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/migrations_types/superadmin-system-ops-migrations.interfaces';

/**
 * Primary Intent: Defines SuperadminSystemOpsMigrationsRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsMigrationsRepository extends SuperadminCoreBaseRepository<SuperadminSystemOpsMigrationsEntity> {
  constructor(@InjectRepository(SuperadminSystemOpsMigrationsEntity) repository: Repository<SuperadminSystemOpsMigrationsEntity>, transactionContext: SuperadminCoreTransactionContext) { super(repository, transactionContext); }

  /**
 * Primary Intent: Executes the findPage use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findPage(query: SuperadminMigrationsListQuery): Promise<{ items: SuperadminSystemOpsMigrationsEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.version ILIKE :search OR item.description ILIKE :search OR item.executed_by ILIKE :search', { search: `%${search}%` });
    if (query.status) qb.andWhere('item.status = :status', { status: query.status });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'version': 'item.version', 'description': 'item.description', 'executedBy': 'item.executed_by'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /**
 * Primary Intent: Executes the findById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findById(id: string): Promise<SuperadminSystemOpsMigrationsEntity | null> { return super.findById(id); }

  /**
 * Primary Intent: Executes the findByIdOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByIdOrThrow(id: string): Promise<SuperadminSystemOpsMigrationsEntity> { return super.findByIdOrThrow(id, 'Migrations record not found'); }

  /**
 * Primary Intent: Executes the createMigrations use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createMigrations(input: SuperadminMigrationsCreateInput): Promise<SuperadminSystemOpsMigrationsEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /**
 * Primary Intent: Executes the updateMigrationsById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateMigrationsById(id: string, input: SuperadminMigrationsUpdateInput): Promise<SuperadminSystemOpsMigrationsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /**
 * Primary Intent: Executes the deleteMigrationsById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async deleteMigrationsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}
