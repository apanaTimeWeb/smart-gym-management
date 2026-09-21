// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the settings feature; no business logic.
// FLOW: settings service -> SettingsRepository -> TypeORM Repository<PlatformSettingEntity> -> PostgreSQL `platform_settings`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { PlatformSettingEntity } from '@/backend_superadmin/modules/superadmin/settings/settings.entity';
import type { SettingsListQuery, SettingsCreateInput, SettingsUpdateInput } from '@/backend_superadmin/modules/superadmin/settings/types/settings.interfaces';

@Injectable()
export class SettingsRepository extends BaseRepository<PlatformSettingEntity> {
  constructor(@InjectRepository(PlatformSettingEntity) repository: Repository<PlatformSettingEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: SettingsListQuery): Promise<{ items: PlatformSettingEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.key ILIKE :search', { search: `%${search}%` });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'key': 'item.key', 'value': 'item.value', 'description': 'item.description', 'category': 'item.category', 'dataType': 'item.data_type'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<PlatformSettingEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<PlatformSettingEntity> { return super.findByIdOrThrow(id, 'Settings record not found'); }

  /** Creates and persists a settings record. */
  async createSettings(input: SettingsCreateInput): Promise<PlatformSettingEntity> { const entity = this.activeRepository.create(input as any); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a settings record. */
  async updateSettingsById(id: string, input: SettingsUpdateInput): Promise<PlatformSettingEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one settings record. */
  async deleteSettingsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}
