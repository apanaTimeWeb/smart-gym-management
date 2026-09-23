// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the coupons feature; no business logic.
// FLOW: coupons service -> CouponsRepository -> TypeORM Repository<CouponsEntity> -> PostgreSQL `coupons`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { CouponsEntity } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/coupons.entity';
import type { CouponsListQuery, CouponsCreateInput, CouponsUpdateInput } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/types/coupons.interfaces';

@Injectable()
export class CouponsRepository extends BaseRepository<CouponsEntity> {
  constructor(@InjectRepository(CouponsEntity) repository: Repository<CouponsEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: CouponsListQuery): Promise<{ items: CouponsEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.code ILIKE :search', { search: `%${search}%` });
    if (query.status) qb.andWhere('item.status = :status', { status: query.status });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'code': 'item.code'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<CouponsEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<CouponsEntity> { return super.findByIdOrThrow(id, 'Coupons record not found'); }

  /** Creates and persists a coupons record. */
  async createCoupons(input: CouponsCreateInput): Promise<CouponsEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a coupons record. */
  async updateCouponsById(id: string, input: CouponsUpdateInput): Promise<CouponsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one coupons record. */
  async deleteCouponsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

  /** Returns redemptions stored with the coupon contract. */
  async findRedemptionsByCouponId(id: string): Promise<unknown[]> { const entity = await this.findByIdOrThrow(id); return Array.isArray(entity.redemptions) ? entity.redemptions : []; }

  /** Restores a previously soft-deleted coupon. */
  async restoreCouponsById(id: string): Promise<CouponsEntity> { return this.restoreById(id); }

  

  

}