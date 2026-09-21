// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the profile feature; no business logic.
// FLOW: profile service -> ProfileRepository -> TypeORM Repository<SuperadminProfileEntity> -> PostgreSQL `superadmin_profiles`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/core/database/base.repository';
import { TransactionContext } from '@/core/database/transaction-context';
import { SuperadminProfileEntity } from '@/modules/superadmin/profile/profile.entity';
import type { ProfileListQuery, ProfileCreateInput, ProfileUpdateInput } from '@/modules/superadmin/profile/types/profile.interfaces';

@Injectable()
export class ProfileRepository extends BaseRepository<SuperadminProfileEntity> {
  constructor(@InjectRepository(SuperadminProfileEntity) repository: Repository<SuperadminProfileEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: ProfileListQuery): Promise<{ items: SuperadminProfileEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.name ILIKE :search OR item.email ILIKE :search', { search: `%${search}%` });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'name': 'item.name', 'email': 'item.email'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<SuperadminProfileEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<SuperadminProfileEntity> { return super.findByIdOrThrow(id, 'Profile record not found'); }

  /** Creates and persists a profile record. */
  async createProfile(input: ProfileCreateInput): Promise<SuperadminProfileEntity> { const entity = this.activeRepository.create(input as never); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a profile record. */
  async updateProfileById(id: string, input: ProfileUpdateInput): Promise<SuperadminProfileEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one profile record. */
  async deleteProfileById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}
