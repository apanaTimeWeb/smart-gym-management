// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the settings feature; no business logic.
// FLOW: settings service -> SuperadminSettingsRepository -> TypeORM Repository<SuperadminSettingsEntity> -> PostgreSQL `platform_settings`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.repository';
import { SuperadminTransactionContext } from '@/backend_superadmin/superadmin_core/database/superadmin-core-transaction-context';
import { SuperadminSettingsEntity } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.entity';
import type { SuperadminSettingsListQuery, SuperadminSettingsCreateInput, SuperadminSettingsUpdateInput } from '@/backend_superadmin/superadmin_modules/settings/types/superadmin-settings.interfaces';

@Injectable()
export class SuperadminSettingsRepository extends BaseRepository<SuperadminSettingsEntity> {
  constructor(@InjectRepository(SuperadminSettingsEntity) repository: Repository<SuperadminSettingsEntity>, transactionContext: SuperadminTransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: SuperadminSettingsListQuery): Promise<{ items: SuperadminSettingsEntity[]; total: number }> {
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
  async findById(id: string): Promise<SuperadminSettingsEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<SuperadminSettingsEntity> { return super.findByIdOrThrow(id, 'Settings record not found'); }

  /** Creates and persists a settings record. */
  async createSettings(input: SuperadminSettingsCreateInput): Promise<SuperadminSettingsEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a settings record. */
  async updateSettingsById(id: string, input: SuperadminSettingsUpdateInput): Promise<SuperadminSettingsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }


  /** Returns current settings grouped into the governance categories consumed by the frontend. */
  async findGovernanceGroups(): Promise<Record<string, Array<{ label: string; value: string }>>> {
    const rows = await this.activeRepository.find({ where: { deletedAt: null } as never, order: { category: 'ASC', key: 'ASC' } as never });
    const groups: Record<string, Array<{ label: string; value: string }>> = { billing: [], security: [], data: [], communication: [] };
    for (const row of rows) {
      const category = row.category.toLowerCase();
      if (!(category in groups)) continue;
      groups[category].push({ label: row.key, value: row.value });
    }
    return groups;
  }

  /** Soft-deletes one settings record. */
  async deleteSettingsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}