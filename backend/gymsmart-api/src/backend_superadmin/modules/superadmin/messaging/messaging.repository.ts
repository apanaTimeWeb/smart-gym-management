// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the messaging feature; no business logic.
// FLOW: messaging service -> MessagingRepository -> TypeORM Repository<TenantMessageEntity> -> PostgreSQL `tenant_messages`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { TenantMessageEntity } from '@/backend_superadmin/modules/superadmin/messaging/messaging.entity';
import type { MessagingListQuery, MessagingCreateInput, MessagingUpdateInput } from '@/backend_superadmin/modules/superadmin/messaging/types/messaging.interfaces';

@Injectable()
export class MessagingRepository extends BaseRepository<TenantMessageEntity> {
  constructor(@InjectRepository(TenantMessageEntity) repository: Repository<TenantMessageEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: MessagingListQuery): Promise<{ items: TenantMessageEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.subject ILIKE :search', { search: `%${search}%` });
    if (query.status) qb.andWhere('item.status = :status', { status: query.status });
    if (query.tenantId) qb.andWhere('item.tenant_id = :tenantId', { tenantId: query.tenantId });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'tenantId': 'item.tenant_id', 'tenantName': 'item.tenant_name', 'subject': 'item.subject', 'body': 'item.body'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<TenantMessageEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<TenantMessageEntity> { return super.findByIdOrThrow(id, 'Messaging record not found'); }

  /** Creates and persists a messaging record. */
  async createMessaging(input: MessagingCreateInput): Promise<TenantMessageEntity> { const entity = this.activeRepository.create(input as any); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a messaging record. */
  async updateMessagingById(id: string, input: MessagingUpdateInput): Promise<TenantMessageEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one messaging record. */
  async deleteMessagingById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}
