// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the integrations feature; no business logic.
// FLOW: integrations service -> IntegrationsRepository -> TypeORM Repository<IntegrationKeyEntity> -> PostgreSQL `integration_keys`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { IntegrationKeyEntity } from '@/backend_superadmin/modules/superadmin/integrations/integrations.entity';
import type { IntegrationsListQuery, IntegrationsCreateInput, IntegrationsUpdateInput } from '@/backend_superadmin/modules/superadmin/integrations/types/integrations.interfaces';

@Injectable()
export class IntegrationsRepository extends BaseRepository<IntegrationKeyEntity> {
  constructor(@InjectRepository(IntegrationKeyEntity) repository: Repository<IntegrationKeyEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: IntegrationsListQuery): Promise<{ items: IntegrationKeyEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.tenant_id ILIKE :search OR item.label ILIKE :search', { search: `%${search}%` });
    if (query.status) qb.andWhere('item.status = :status', { status: query.status });
    if (query.tenantId) qb.andWhere('item.tenant_id = :tenantId', { tenantId: query.tenantId });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'tenantId': 'item.tenant_id', 'label': 'item.label'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<IntegrationKeyEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<IntegrationKeyEntity> { return super.findByIdOrThrow(id, 'Integrations record not found'); }

  /** Creates and persists a integrations record. */
  async createIntegrations(input: IntegrationsCreateInput): Promise<IntegrationKeyEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity as any) as any; }

  /** Applies an intention-revealing update to a integrations record. */
  async updateIntegrationsById(id: string, input: IntegrationsUpdateInput): Promise<IntegrationKeyEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one integrations record. */
  async deleteIntegrationsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}
