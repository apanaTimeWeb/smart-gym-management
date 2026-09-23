// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the global-audit feature; no business logic.
// FLOW: global-audit service -> GlobalAuditRepository -> TypeORM Repository<GlobalAuditEntity> -> PostgreSQL `audit_logs`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { GlobalAuditEntity } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit.entity';
import type { GlobalAuditListQuery, GlobalAuditCreateInput, GlobalAuditUpdateInput } from '@/backend_superadmin/modules/superadmin/global-audit/types/global-audit.interfaces';

@Injectable()
export class GlobalAuditRepository extends BaseRepository<GlobalAuditEntity> {
  constructor(@InjectRepository(GlobalAuditEntity) repository: Repository<GlobalAuditEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: GlobalAuditListQuery): Promise<{ items: GlobalAuditEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.actor_id ILIKE :search OR item.actor_role ILIKE :search OR item.action ILIKE :search OR item.entity_type ILIKE :search', { search: `%${search}%` });
    if (query.tenantId) qb.andWhere('item.tenant_id = :tenantId', { tenantId: query.tenantId });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'actorId': 'item.actor_id', 'actorRole': 'item.actor_role', 'action': 'item.action', 'entityType': 'item.entity_type', 'entityId': 'item.entity_id', 'ipAddress': 'item.ip_address'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<GlobalAuditEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<GlobalAuditEntity> { return super.findByIdOrThrow(id, 'GlobalAudit record not found'); }

  /** Creates and persists a global-audit record. */
  async createGlobalAudit(input: GlobalAuditCreateInput): Promise<GlobalAuditEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a global-audit record. */
  async updateGlobalAuditById(id: string, input: GlobalAuditUpdateInput): Promise<GlobalAuditEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one global-audit record. */
  async deleteGlobalAuditById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}