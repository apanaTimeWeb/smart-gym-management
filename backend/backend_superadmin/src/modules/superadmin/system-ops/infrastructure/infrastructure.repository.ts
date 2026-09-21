// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the infrastructure feature; no business logic.
// FLOW: infrastructure service -> InfrastructureRepository -> TypeORM Repository<InfrastructureNodeEntity> -> PostgreSQL `infrastructure_nodes`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/core/database/base.repository';
import { TransactionContext } from '@/core/database/transaction-context';
import { InfrastructureNodeEntity } from '@/modules/superadmin/system-ops/infrastructure/infrastructure.entity';
import type { InfrastructureListQuery, InfrastructureCreateInput, InfrastructureUpdateInput } from '@/modules/superadmin/system-ops/infrastructure/types/infrastructure.interfaces';

@Injectable()
export class InfrastructureRepository extends BaseRepository<InfrastructureNodeEntity> {
  constructor(@InjectRepository(InfrastructureNodeEntity) repository: Repository<InfrastructureNodeEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: InfrastructureListQuery): Promise<{ items: InfrastructureNodeEntity[]; total: number }> {
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
  async findById(id: string): Promise<InfrastructureNodeEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<InfrastructureNodeEntity> { return super.findByIdOrThrow(id, 'Infrastructure record not found'); }

  /** Creates and persists a infrastructure record. */
  async createInfrastructure(input: InfrastructureCreateInput): Promise<InfrastructureNodeEntity> { const entity = this.activeRepository.create(input as never); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a infrastructure record. */
  async updateInfrastructureById(id: string, input: InfrastructureUpdateInput): Promise<InfrastructureNodeEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one infrastructure record. */
  async deleteInfrastructureById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}
