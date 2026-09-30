// RESPONSIBILITY: Owns Trainer progress-entry persistence and trainer-scoped queries.
// FLOW: Progress service → repository → tenant TypeORM/query builder.

import type { ProgressEntriesQuery, ProgressTrackingMemberSummary, ProgressTrackingSummary } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_types/trainer-progress-tracking-repository-query.types';
// RESPONSIBILITY: Owns Trainer progress member/entry queries and persistence behind the feature boundary.
// FLOW: Progress service → repository → tenant TypeORM/query builder.

import { IsNull } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { ProgressTrackingProgressEntryMapper } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/trainer-progress-tracking-progress-entry.mapper';
import type { ProgressTrackingProgressEntryDomain } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/trainer-progress-tracking-progress-entry.domain';
import { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';
import { CoreBaseRepository } from '@/backend_trainer/backend_core/core_database/core-base.repository';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver';
import { CoreNotFoundException } from '@/backend_trainer/backend_core/core_errors/core-not-found.exception';
import { TrainerProgressTrackingProgressEntryEntity } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/trainer-progress-tracking-progress-entry.entity';






/**
 * Intent: Defines the TrainerProgressTrackingRepository boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerProgressTrackingRepository extends CoreBaseRepository {
  constructor(private readonly resolver: CoreTenantDatasourceResolver) { super(); }

  /** Lists members assigned to the authenticated trainer. */
  async findMembers(trainerId:string):Promise<ProgressTrackingMemberSummary[]>{
    const ds=await this.resolver.getDataSource();
    const rows=await ds.createQueryBuilder().select(['m.id AS id','m.name AS name','m.weight_kg AS "weightKg"','m.progress_status AS "progressStatus"']).from('trainer_members','m').where('m.deleted_at IS NULL AND m.assigned_trainer_id=:trainerId',{trainerId}).orderBy('m.name','ASC').getRawMany<{id:string;name:string;weightKg:number|null;progressStatus:string|null}>(); return rows;
  }

  /** Ensures a member is visible to the trainer before any progress access. */
  async assertMemberOwnedByTrainer(trainerId:string,memberId:string):Promise<void>{
    const ds=await this.resolver.getDataSource();
    const row=await ds.createQueryBuilder().select('m.id','id').from('trainer_members','m').where('m.id=:memberId AND m.assigned_trainer_id=:trainerId AND m.deleted_at IS NULL',{memberId,trainerId}).getRawOne<{id:string}>();
    if(!row) throw new CoreNotFoundException('PROGRESS.MEMBER',memberId);
  }

  /** Lists progress entries with date and allowlisted sort filters. */
  async findEntries(memberId:string,query:ProgressEntriesQuery):Promise<{rows:ProgressTrackingProgressEntryDomain[];total:number}>{
    const repo=await this.resolver.getRepository(TrainerProgressTrackingProgressEntryEntity);
    const allowed={date:'p.date',weightKg:'p.weight_kg',heightCm:'p.height_cm',bmi:'p.bmi',bodyFatPercent:'p.body_fat_percent',muscleMassKg:'p.muscle_mass_kg'} as const;
    const qb=repo.createQueryBuilder('p').where('p.member_id=:memberId AND p.deleted_at IS NULL',{memberId});
    if(query.startDate) qb.andWhere('p.date>=:startDate',{startDate:query.startDate});
    if(query.endDate) qb.andWhere('p.date<=:endDate',{endDate:query.endDate});
    qb.orderBy(allowed[query.sortBy as keyof typeof allowed]??allowed.date,query.sortDirection==='asc'?'ASC':'DESC').skip((query.page-1)*query.limit).take(query.limit);
    const [rows,total]=await qb.getManyAndCount(); return {rows: rows.map(ProgressTrackingProgressEntryMapper), total};
  }

  /** Finds one active entry inside member scope. */
  async findById(memberId:string,id:string):Promise<ProgressTrackingProgressEntryDomain|null>{return (await this.resolver.getRepository(TrainerProgressTrackingProgressEntryEntity)).findOneBy({id,memberId,deletedAt: IsNull()}).then((row) => row ? ProgressTrackingProgressEntryMapper(row) : null);}
  /** Returns one active progress entry or a typed not-found error. */
  async findByIdOrThrow(memberId:string,id:string):Promise<ProgressTrackingProgressEntryDomain>{const row=await this.findById(memberId,id);if(!row)throw new CoreNotFoundException('PROGRESS.ENTRY',id);return row;}
  /** Creates one progress entry. */
  async createProgressEntry(memberId:string,input:Partial<TrainerProgressTrackingProgressEntryEntity>,context?:CoreTransactionContext):Promise<ProgressTrackingProgressEntryDomain>{const repo=context?.getRepository(TrainerProgressTrackingProgressEntryEntity) ?? await this.resolver.getRepository(TrainerProgressTrackingProgressEntryEntity); const row=await repo.save(repo.create({...input,memberId})); return ProgressTrackingProgressEntryMapper(row);}
  /** Updates one progress entry. */
  async updateProgressEntryById(id:string,memberId:string,input:Partial<TrainerProgressTrackingProgressEntryEntity>,context?:CoreTransactionContext):Promise<ProgressTrackingProgressEntryDomain>{const repo=context?.getRepository(TrainerProgressTrackingProgressEntryEntity) ?? await this.resolver.getRepository(TrainerProgressTrackingProgressEntryEntity); const result=await repo.update({id,memberId,deletedAt: IsNull()},input); if(!result.affected) throw new CoreNotFoundException('PROGRESS.ENTRY',id); const row=context?await repo.findOneBy({id,memberId,deletedAt:IsNull()}):await this.resolver.getRepository(TrainerProgressTrackingProgressEntryEntity).then((r)=>r.findOneBy({id,memberId,deletedAt:IsNull()})); if(!row) throw new CoreNotFoundException('PROGRESS.ENTRY',id); return ProgressTrackingProgressEntryMapper(row);}
  /** Soft-deletes one progress entry. */
  async softDelete(id:string,memberId:string,context?:CoreTransactionContext):Promise<void>{const result=await (context?.getRepository(TrainerProgressTrackingProgressEntryEntity) ?? await this.resolver.getRepository(TrainerProgressTrackingProgressEntryEntity)).softDelete({id,memberId,deletedAt: IsNull()}); if(!result.affected) throw new CoreNotFoundException('PROGRESS.ENTRY',id);}
  /** Returns summary measurements for one trainer-visible member with the same mapped entry shape as entry reads. */
  async findSummary(memberId:string):Promise<ProgressTrackingSummary>{
    const ds=await this.resolver.getDataSource();
    const rows=await ds.createQueryBuilder().select(['p.id AS id','p.member_id AS "memberId"','p.date AS date','p.weight_kg AS "weightKg"','p.height_cm AS "heightCm"','p.bmi AS bmi','p.body_fat_percent AS "bodyFatPercent"','p.muscle_mass_kg AS "muscleMassKg"','p.chest_cm AS "chestCm"','p.waist_cm AS "waistCm"','p.hip_cm AS "hipCm"','p.notes AS notes','p.recorded_by AS "recordedBy"','p.blood_pressure AS "bloodPressure"','p.resting_heart_rate AS "restingHeartRate"','p.vo2_max AS "vo2Max"','p.progress_photos AS "progressPhotos"']).from('trainer_progress_entries','p').where('p.member_id=:memberId AND p.deleted_at IS NULL',{memberId}).orderBy('p.date','DESC').addOrderBy('p.created_at','DESC').getRawMany<Record<string,unknown>>();
    const toEntry=(row:Record<string,unknown>):ProgressTrackingProgressEntryDomain=>({
      id:String(row.id), memberId:String(row.memberId), date:String(row.date), weightKg:Number(row.weightKg), heightCm:Number(row.heightCm), bmi:Number(row.bmi),
      bodyFatPercent:row.bodyFatPercent===null||row.bodyFatPercent===undefined?null:Number(row.bodyFatPercent),
      muscleMassKg:row.muscleMassKg===null||row.muscleMassKg===undefined?null:Number(row.muscleMassKg),
      chestCm:row.chestCm===null||row.chestCm===undefined?null:Number(row.chestCm), waistCm:row.waistCm===null||row.waistCm===undefined?null:Number(row.waistCm), hipCm:row.hipCm===null||row.hipCm===undefined?null:Number(row.hipCm),
      notes:row.notes===null||row.notes===undefined?null:String(row.notes), recordedBy:String(row.recordedBy), bloodPressure:row.bloodPressure===null||row.bloodPressure===undefined?null:String(row.bloodPressure),
      restingHeartRate:row.restingHeartRate===null||row.restingHeartRate===undefined?null:Number(row.restingHeartRate), vo2Max:row.vo2Max===null||row.vo2Max===undefined?null:Number(row.vo2Max), progressPhotos:Array.isArray(row.progressPhotos)?row.progressPhotos.map(String):null,
    });
    const latest=rows[0] ? toEntry(rows[0]) : null; const first=rows.at(-1) ? toEntry(rows.at(-1)!) : null;
    const member=await ds.createQueryBuilder().select(['m.name AS "memberName"','m.target_weight_kg AS "targetWeightKg"']).from('trainer_members','m').where('m.id=:memberId AND m.deleted_at IS NULL',{memberId}).getRawOne<{memberName:string;targetWeightKg:number|string|null}>();
    const targetWeightKg=member?.targetWeightKg===null||member?.targetWeightKg===undefined?null:Number(member.targetWeightKg);
    const goalStatus:ProgressTrackingSummary['goalStatus']=targetWeightKg===null||latest===null?undefined:(Math.abs(latest.weightKg-targetWeightKg)<=1?'Achieved':latest.weightKg<=targetWeightKg?'On Track':'Off Track');
    const weightChangeKg=latest&&first?latest.weightKg-first.weightKg:0; const bmiChange=latest&&first?latest.bmi-first.bmi:0;
    return {memberName:member?.memberName??'',memberId,totalEntries:rows.length,latestEntry:latest,firstEntry:first,weightChangeKg,bmiChange,...(targetWeightKg!==null?{targetWeightKg}:{}),...(goalStatus?{goalStatus}:{})};
  }

}
