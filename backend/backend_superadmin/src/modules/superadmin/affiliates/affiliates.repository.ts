// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the affiliates feature; no business logic.
// FLOW: affiliates service -> AffiliatesRepository -> TypeORM Repository<AffiliateEntity> -> PostgreSQL `affiliates`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/core/database/base.repository';
import { TransactionContext } from '@/core/database/transaction-context';
import { AffiliateEntity } from '@/modules/superadmin/affiliates/affiliates.entity';
import type { AffiliatesListQuery, AffiliatesCreateInput, AffiliatesUpdateInput } from '@/modules/superadmin/affiliates/types/affiliates.interfaces';

@Injectable()
export class AffiliatesRepository extends BaseRepository<AffiliateEntity> {
  constructor(@InjectRepository(AffiliateEntity) repository: Repository<AffiliateEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: AffiliatesListQuery): Promise<{ items: AffiliateEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.name ILIKE :search OR item.email ILIKE :search OR item.phone ILIKE :search', { search: `%${search}%` });
    if (query.status) qb.andWhere('item.status = :status', { status: query.status });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'name': 'item.name', 'email': 'item.email', 'phone': 'item.phone', 'referralCode': 'item.referral_code'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<AffiliateEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<AffiliateEntity> { return super.findByIdOrThrow(id, 'Affiliates record not found'); }

  /** Creates and persists a affiliates record. */
  async createAffiliates(input: AffiliatesCreateInput): Promise<AffiliateEntity> { const entity = this.activeRepository.create(input as never); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a affiliates record. */
  async updateAffiliatesById(id: string, input: AffiliatesUpdateInput): Promise<AffiliateEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one affiliates record. */
  async deleteAffiliatesById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}
