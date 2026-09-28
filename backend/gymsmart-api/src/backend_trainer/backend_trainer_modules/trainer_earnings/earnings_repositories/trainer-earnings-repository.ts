// RESPONSIBILITY: Owns Trainer earnings query mechanics and integer-minor-unit financial reads.
// FLOW: Earnings query service → repository → tenant TypeORM.

import { IsNull } from 'typeorm';
// RESPONSIBILITY: Owns all earnings persistence and query mechanics behind a feature-local repository boundary.
// FLOW: earnings service → named repository method → tenant TypeORM repository/query builder.

import { CoreBaseRepository } from '@/backend_trainer/backend_core/core_database/core-base.repository';
import { Injectable } from '@nestjs/common';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver';
import { TrainerEarningsHistoryEntity } from '@/backend_trainer/backend_trainer_modules/trainer_earnings/trainer-earnings-history.entity';
import { TrainerEarningsPayoutEntity } from '@/backend_trainer/backend_trainer_modules/trainer_earnings/trainer-earnings-payout.entity';
import { EarningsRelatedSessionStatus } from '@/backend_trainer/backend_trainer_modules/trainer_earnings/trainer-earnings-enums';

/**
 * Intent: Defines the TrainerEarningsRepository boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerEarningsRepository extends CoreBaseRepository {
  constructor(private readonly resolver: CoreTenantDatasourceResolver) {super();}
  /** Returns trainer earnings history with filters and integer minor-unit amounts. */
  async findHistory(trainerId:string,query:{page:number;limit:number;startDate?:string;endDate?:string;search?:string;sortBy:string;sortDirection:string}):Promise<{rows:TrainerEarningsHistoryEntity[];total:number}>{ const repo=await this.resolver.getRepository(TrainerEarningsHistoryEntity); const allowed={date:'event_date',description:'description',amount:'amount_minor',status:'status'} as const; const qb=repo.createQueryBuilder('e').where('e.trainer_id = :trainerId AND e.deleted_at IS NULL',{trainerId}); if(query.startDate) qb.andWhere('e.event_date >= :startDate',{startDate: query.startDate}); if(query.endDate) qb.andWhere('e.event_date <= :endDate',{endDate: query.endDate}); if(query.search) qb.andWhere('(e.description ILIKE :search OR e.external_reference ILIKE :search)',{search:`%${query.search}%`}); qb.orderBy(allowed[query.sortBy as keyof typeof allowed]??allowed.date,query.sortDirection==='asc'?'ASC':'DESC').skip((query.page-1)*query.limit).take(query.limit); return {rows:await qb.getMany(),total:await qb.getCount()}; }
  /** Returns the trainer's persisted compensation configuration without exposing full bank details. */ async findCompensation(trainerId:string):Promise<{commissionRate:number;commissionTier:string;bankAccount:string|null}>{ const ds=await this.resolver.getDataSource(); const row=await ds.createQueryBuilder().select(['p.commission_rate AS "commissionRate"','p.commission_tier AS "commissionTier"','p.bank_account_masked AS "bankAccount"']).from('trainer_profiles','p').where('p.user_id=:trainerId AND p.deleted_at IS NULL',{trainerId}).getRawOne<{commissionRate:string;commissionTier:string;bankAccount:string|null}>(); return {commissionRate:Number(row?.commissionRate??0),commissionTier:row?.commissionTier??'Standard',bankAccount:row?.bankAccount??null}; }
  /** Returns payout records for the trainer. */
  async findPending(trainerId:string):Promise<TrainerEarningsPayoutEntity[]>{ return (await this.resolver.getRepository(TrainerEarningsPayoutEntity)).find({where:{trainerId,deletedAt: IsNull()},order:{dueDate:'ASC'}}); }
  /** Computes total and TDS aggregates for a trainer history. */
  async findTotals(trainerId:string,startDate?:string,endDate?:string):Promise<{totalEarnings:number;taxDeduction:number}>{ const qb=(await this.resolver.getRepository(TrainerEarningsHistoryEntity)).createQueryBuilder('e').select('COALESCE(SUM(e.amount_minor),0)','totalEarnings').addSelect('COALESCE(SUM(e.tds_deducted_minor),0)','taxDeduction').where('e.trainer_id = :trainerId AND e.deleted_at IS NULL',{trainerId}); if(startDate) qb.andWhere('e.event_date >= :startDate',{startDate}); if(endDate) qb.andWhere('e.event_date <= :endDate',{endDate}); const row=await qb.getRawOne<{totalEarnings:string;taxDeduction:string}>(); return {totalEarnings:Number(row?.totalEarnings??0),taxDeduction:Number(row?.taxDeduction??0)}; }
  /** Counts completed trainer sessions for the earnings KPI. */
  async countCompletedSessions(trainerId:string,startDate?:string,endDate?:string):Promise<number>{ const ds=await this.resolver.getDataSource(); const qb=ds.createQueryBuilder().select('COUNT(1)','count').from('trainer_sessions','s').where('s.trainer_id = :trainerId AND s.status = :status AND s.deleted_at IS NULL',{trainerId,status:EarningsRelatedSessionStatus.COMPLETED}); if(startDate) qb.andWhere('s.session_date >= :startDate',{startDate}); if(endDate) qb.andWhere('s.session_date <= :endDate',{endDate}); const row=await qb.getRawOne<{count:string}>(); return Number(row?.count??0); }

 /** Returns bounded CSV source rows for the authenticated trainer without exposing ORM entities. */ async findExportRows(trainerId:string):Promise<Array<{id:string;date:string;type:string;description:string;amount:number|string;status:string}>>{const ds=await this.resolver.getDataSource(); return ds.createQueryBuilder().select(['e.id AS id','e.event_date AS date','e.type AS type','e.description AS description','e.amount_minor AS amount','e.status AS status']).from('trainer_earnings_history','e').where('e.trainer_id=:trainerId AND e.deleted_at IS NULL',{trainerId}).orderBy('e.event_date','DESC').limit(5000).getRawMany<{id:string;date:string;type:string;description:string;amount:number|string;status:string}>();}
}
