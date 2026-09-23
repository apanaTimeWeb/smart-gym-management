// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the infrastructure feature; no business logic.
// FLOW: infrastructure service -> SuperadminInfrastructureRepository -> TypeORM Repository<SuperadminInfrastructureEntity> -> PostgreSQL `infrastructure_nodes`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.repository';
import { SuperadminTransactionContext } from '@/backend_superadmin/superadmin_core/database/superadmin-core-transaction-context';
import { SuperadminInfrastructureEntity } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.entity';
import type { SuperadminInfrastructureListQuery, SuperadminInfrastructureCreateInput, SuperadminInfrastructureUpdateInput } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/types/superadmin-system-ops-infrastructure.interfaces';

@Injectable()
export class SuperadminInfrastructureRepository extends BaseRepository<SuperadminInfrastructureEntity> {
  constructor(@InjectRepository(SuperadminInfrastructureEntity) repository: Repository<SuperadminInfrastructureEntity>, transactionContext: SuperadminTransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: SuperadminInfrastructureListQuery): Promise<{ items: SuperadminInfrastructureEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.name ILIKE :search', { search: `%${search}%` });
    if (query.status) qb.andWhere('item.status = :status', { status: query.status });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'name': 'item.name', 'region': 'item.region', 'uptime': 'item.uptime'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<SuperadminInfrastructureEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<SuperadminInfrastructureEntity> { return super.findByIdOrThrow(id, 'Infrastructure record not found'); }

  /** Creates and persists a infrastructure record. */
  async createInfrastructure(input: SuperadminInfrastructureCreateInput): Promise<SuperadminInfrastructureEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a infrastructure record. */
  async updateInfrastructureById(id: string, input: SuperadminInfrastructureUpdateInput): Promise<SuperadminInfrastructureEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one infrastructure record. */
  async deleteInfrastructureById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}