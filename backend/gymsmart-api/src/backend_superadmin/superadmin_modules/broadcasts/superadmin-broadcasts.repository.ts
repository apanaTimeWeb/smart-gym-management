// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the broadcasts feature; no business logic.
// FLOW: broadcasts service -> SuperadminBroadcastsRepository -> TypeORM Repository<SuperadminBroadcastsEntity> -> PostgreSQL `broadcasts`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.repository';
import { SuperadminTransactionContext } from '@/backend_superadmin/superadmin_core/database/superadmin-core-transaction-context';
import { SuperadminBroadcastsEntity } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.entity';
import type { SuperadminBroadcastsListQuery, SuperadminBroadcastsCreateInput, SuperadminBroadcastsUpdateInput } from '@/backend_superadmin/superadmin_modules/broadcasts/types/superadmin-broadcasts.interfaces';

@Injectable()
export class SuperadminBroadcastsRepository extends BaseRepository<SuperadminBroadcastsEntity> {
  constructor(@InjectRepository(SuperadminBroadcastsEntity) repository: Repository<SuperadminBroadcastsEntity>, transactionContext: SuperadminTransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: SuperadminBroadcastsListQuery): Promise<{ items: SuperadminBroadcastsEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.title ILIKE :search', { search: `%${search}%` });
    if (query.status) qb.andWhere('item.status = :status', { status: query.status });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'title': 'item.title', 'content': 'item.content'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<SuperadminBroadcastsEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<SuperadminBroadcastsEntity> { return super.findByIdOrThrow(id, 'Broadcasts record not found'); }

  /** Creates and persists a broadcasts record. */
  async createBroadcasts(input: SuperadminBroadcastsCreateInput): Promise<SuperadminBroadcastsEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a broadcasts record. */
  async updateBroadcastsById(id: string, input: SuperadminBroadcastsUpdateInput): Promise<SuperadminBroadcastsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one broadcasts record. */
  async deleteBroadcastsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }


  /** Returns audience and channel delivery aggregates from persisted broadcasts. */
  async getAudienceInsights(): Promise<{ segments: Array<{ name: string; count: number; description: string }>; channels: Array<{ name: string; sent: number; delivered: number; opened: number; clicked: number }>; templates: string[] }> {
    const rows = await this.activeRepository.find({ where: { deletedAt: null } as never, order: { createdAt: 'DESC' } as never });
    const segmentMap = new Map<string, number>();
    const channelMap = new Map<string, { sent: number; delivered: number; opened: number; clicked: number }>();
    const templates: string[] = Array.from(new Set<string>(rows.map((row) => String(row.title ?? '')).filter((value) => value.length > 0))).slice(0, 50);
    for (const row of rows) {
      segmentMap.set(row.audience, (segmentMap.get(row.audience) ?? 0) + row.totalRecipients);
      const current = channelMap.get(row.channel) ?? { sent: 0, delivered: 0, opened: 0, clicked: 0 };
      current.sent += row.totalRecipients;
      current.delivered += row.deliveredCount;
      current.opened += row.openedCount;
      current.clicked += row.clickedCount;
      channelMap.set(row.channel, current);
    }
    const segments = [...segmentMap.entries()].map(([name, count]) => ({ name, count, description: `Recipients targeted by ${name.replaceAll('_', ' ').toLowerCase()} broadcasts.` }));
    const channels = [...channelMap.entries()].map(([name, value]) => ({ name, ...value }));
    return { segments, channels, templates };
  }

  /** Counts current broadcast recipients from the target tenant IDs. */
  async countRecipients(): Promise<number> {
    const rows = await this.activeRepository.createQueryBuilder('item').select('COALESCE(SUM(item.total_recipients), 0)', 'count').getRawOne<{ count: string }>();
    return Number(rows?.count ?? 0);
  }

  /** Updates one broadcast delivery counter inside a pessimistic row lock. */
  async recordDeliveryWithLock(id: string, delivered: boolean): Promise<void> {
    await this.findByIdForUpdateOrThrow(id, 'Broadcasts record not found');
    if (delivered) await this.activeRepository.increment({ id } as never, 'deliveredCount', 1);
    else await this.activeRepository.increment({ id } as never, 'failedCount', 1);
  }

}
