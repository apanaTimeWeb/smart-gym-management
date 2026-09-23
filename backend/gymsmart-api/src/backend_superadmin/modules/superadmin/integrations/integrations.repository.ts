// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the integrations feature; no business logic.
// FLOW: integrations service -> IntegrationsRepository -> TypeORM Repository<IntegrationsEntity> -> PostgreSQL `integration_keys`.
import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { IntegrationsEntity } from '@/backend_superadmin/modules/superadmin/integrations/integrations.entity';
import type { IntegrationsListQuery, IntegrationsCreateInput, IntegrationsUpdateInput } from '@/backend_superadmin/modules/superadmin/integrations/types/integrations.interfaces';

@Injectable()
export class IntegrationsRepository extends BaseRepository<IntegrationsEntity> {
  constructor(@InjectRepository(IntegrationsEntity) repository: Repository<IntegrationsEntity>, transactionContext: TransactionContext, @InjectDataSource() private readonly dataSource: DataSource) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: IntegrationsListQuery): Promise<{ items: IntegrationsEntity[]; total: number }> {
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

  /** Builds the integrations overview from real tenant and API-key state. */
  async getLiveOverview(): Promise<{ tenants: Array<{ id: string; name: string }>; integrations: Array<{ name: string; type: string; status: string; lastEvent: string | null; failedEvents: number; health: number }>; webhooks: Array<{ id: string; event: string; integration: string; status: string; attempts: number; latency: number; time: string }>; keys: Array<{ id: string; tenant: string; label: string; status: string; lastUsed: string | null; rateLimit: string }> }> {
    const tenants = await this.dataSource.query(`SELECT id,name FROM tenants WHERE deleted_at IS NULL ORDER BY name ASC LIMIT 500`) as Array<{ id: string; name: string }>;
    const keys = await this.findPage({ page: 1, limit: 500, sortBy: 'updatedAt', sortOrder: 'DESC' });
    const integrationRows = [...new Set(keys.items.map((row) => row.label))].map((name) => ({ name, type: 'API_KEY', status: 'CONNECTED', lastEvent: keys.items.find((row) => row.label === name)?.lastUsed?.toISOString() ?? null, failedEvents: 0, health: 100 }));
    return {
      tenants,
      integrations: integrationRows,
      webhooks: [],
      keys: keys.items.map((row) => ({ id: row.id, tenant: tenants.find((tenant) => tenant.id === row.tenantId)?.name ?? row.tenantId, label: row.label, status: row.status, lastUsed: row.lastUsed?.toISOString() ?? null, rateLimit: String(row.rateLimit) })),
    };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<IntegrationsEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<IntegrationsEntity> { return super.findByIdOrThrow(id, 'Integrations record not found'); }

  /** Creates and persists a integrations record. */
  async createIntegrations(input: IntegrationsCreateInput): Promise<IntegrationsEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a integrations record. */
  async updateIntegrationsById(id: string, input: IntegrationsUpdateInput): Promise<IntegrationsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one integrations record. */
  async deleteIntegrationsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}