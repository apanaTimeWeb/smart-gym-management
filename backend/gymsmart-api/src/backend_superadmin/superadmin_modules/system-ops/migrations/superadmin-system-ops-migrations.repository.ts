// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the migrations feature; no business logic.
// FLOW: migrations service -> SuperadminMigrationsRepository -> TypeORM Repository<SuperadminMigrationsEntity> -> PostgreSQL `migration_logs`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.repository';
import { SuperadminTransactionContext } from '@/backend_superadmin/superadmin_core/database/superadmin-core-transaction-context';
import { SuperadminMigrationsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.entity';
import type { SuperadminMigrationsListQuery, SuperadminMigrationsCreateInput, SuperadminMigrationsUpdateInput } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/types/superadmin-system-ops-migrations.interfaces';

@Injectable()
export class SuperadminMigrationsRepository extends BaseRepository<SuperadminMigrationsEntity> {
  constructor(@InjectRepository(SuperadminMigrationsEntity) repository: Repository<SuperadminMigrationsEntity>, transactionContext: SuperadminTransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: SuperadminMigrationsListQuery): Promise<{ items: SuperadminMigrationsEntity[]; total: number }> {
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

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<SuperadminMigrationsEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<SuperadminMigrationsEntity> { return super.findByIdOrThrow(id, 'Migrations record not found'); }

  /** Creates and persists a migrations record. */
  async createMigrations(input: SuperadminMigrationsCreateInput): Promise<SuperadminMigrationsEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a migrations record. */
  async updateMigrationsById(id: string, input: SuperadminMigrationsUpdateInput): Promise<SuperadminMigrationsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one migrations record. */
  async deleteMigrationsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}