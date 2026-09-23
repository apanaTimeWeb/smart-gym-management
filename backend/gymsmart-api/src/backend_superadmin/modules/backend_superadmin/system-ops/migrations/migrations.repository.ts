// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the migrations feature; no business logic.
// FLOW: migrations service -> MigrationsRepository -> TypeORM Repository<MigrationsEntity> -> PostgreSQL `migration_logs`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { MigrationsEntity } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/migrations.entity';
import type { MigrationsListQuery, MigrationsCreateInput, MigrationsUpdateInput } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/types/migrations.interfaces';

@Injectable()
export class MigrationsRepository extends BaseRepository<MigrationsEntity> {
  constructor(@InjectRepository(MigrationsEntity) repository: Repository<MigrationsEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: MigrationsListQuery): Promise<{ items: MigrationsEntity[]; total: number }> {
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
  async findById(id: string): Promise<MigrationsEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<MigrationsEntity> { return super.findByIdOrThrow(id, 'Migrations record not found'); }

  /** Creates and persists a migrations record. */
  async createMigrations(input: MigrationsCreateInput): Promise<MigrationsEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a migrations record. */
  async updateMigrationsById(id: string, input: MigrationsUpdateInput): Promise<MigrationsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one migrations record. */
  async deleteMigrationsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}