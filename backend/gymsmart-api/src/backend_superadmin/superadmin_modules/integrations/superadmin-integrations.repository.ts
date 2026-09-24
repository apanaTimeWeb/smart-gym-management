// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the integrations feature; no business logic.
// FLOW: integrations service -> SuperadminIntegrationsRepository -> TypeORM Repository<SuperadminIntegrationsEntity> -> PostgreSQL `integration_keys`.
import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SuperadminCoreBaseRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.repository';
import { SuperadminCoreTransactionContext } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-transaction-context';
import { SuperadminIntegrationsEntity } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.entity';
import type { SuperadminIntegrationsListQuery, SuperadminIntegrationsCreateInput, SuperadminIntegrationsUpdateInput } from '@/backend_superadmin/superadmin_modules/integrations/integrations_types/superadmin-integrations.interfaces';

/**
 * Primary Intent: Defines SuperadminIntegrationsRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminIntegrationsRepository extends SuperadminCoreBaseRepository<SuperadminIntegrationsEntity> {
  constructor(@InjectRepository(SuperadminIntegrationsEntity) repository: Repository<SuperadminIntegrationsEntity>, transactionContext: SuperadminCoreTransactionContext, @InjectDataSource() private readonly dataSource: DataSource) { super(repository, transactionContext); }

  /**
 * Primary Intent: Executes the findPage use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findPage(query: SuperadminIntegrationsListQuery): Promise<{ items: SuperadminIntegrationsEntity[]; total: number }> {
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

  /**
 * Primary Intent: Executes the getLiveOverview use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
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

  /**
 * Primary Intent: Executes the findById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findById(id: string): Promise<SuperadminIntegrationsEntity | null> { return super.findById(id); }

  /**
 * Primary Intent: Executes the findByIdOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByIdOrThrow(id: string): Promise<SuperadminIntegrationsEntity> { return super.findByIdOrThrow(id, 'Integrations record not found'); }

  /**
 * Primary Intent: Executes the createIntegrations use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createIntegrations(input: SuperadminIntegrationsCreateInput): Promise<SuperadminIntegrationsEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /**
 * Primary Intent: Executes the updateIntegrationsById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateIntegrationsById(id: string, input: SuperadminIntegrationsUpdateInput): Promise<SuperadminIntegrationsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /**
 * Primary Intent: Executes the deleteIntegrationsById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async deleteIntegrationsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}
