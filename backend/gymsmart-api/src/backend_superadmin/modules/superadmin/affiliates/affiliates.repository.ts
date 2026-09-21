// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the affiliates feature; no business logic.
// FLOW: affiliates service -> AffiliatesRepository -> TypeORM Repository<AffiliateEntity> -> PostgreSQL `affiliates`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { AffiliateEntity } from '@/backend_superadmin/modules/superadmin/affiliates/affiliates.entity';
import type { AffiliatesListQuery, AffiliatesCreateInput, AffiliatesUpdateInput } from '@/backend_superadmin/modules/superadmin/affiliates/types/affiliates.interfaces';

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
  async createAffiliates(input: AffiliatesCreateInput): Promise<AffiliateEntity> { const entity = this.activeRepository.create({ name: input.name ?? '', email: input.email ?? '', phone: input.phone ?? '', referralCode: input.referralCode ?? '', totalReferred: 0, commissionEarned: 0, commissionRate: 0, pendingPayout: 0, bankDetails: {}, status: 'ACTIVE', joinedAt: input.joinedAt ?? new Date(), referralCount: 0, conversionRate: 0, payoutHistory: [] } as never); return this.activeRepository.save(entity as any) as any; }

  /** Applies an intention-revealing update to a affiliates record. */
  async updateAffiliatesById(id: string, input: AffiliatesUpdateInput): Promise<AffiliateEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Records a completed commission payout and zeroes the pending balance atomically within the repository boundary. */
  async payPendingPayout(id: string, entry: unknown): Promise<void> { const current = await this.findByIdOrThrow(id); const history = Array.isArray(current.payoutHistory) ? current.payoutHistory : []; await this.activeRepository.update({ id } as never, { pendingPayout: 0, payoutHistory: [...history, entry] } as never); }

  /** Returns every recorded payout entry across active affiliate records. */
  async findPayoutHistory(): Promise<unknown[]> { const rows = await this.activeRepository.find({ where: { deletedAt: null } as never, order: { updatedAt: 'DESC' } as never }); return rows.flatMap((item) => Array.isArray(item.payoutHistory) ? item.payoutHistory : []); }

  /** Soft-deletes one affiliates record. */
  async deleteAffiliatesById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}
