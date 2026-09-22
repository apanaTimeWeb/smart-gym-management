import { IsNull } from 'typeorm';
// RESPONSIBILITY: Owns Trainer progress member/entry queries and persistence behind the feature boundary.
// FLOW: Progress service → repository → tenant TypeORM/query builder.

import { Injectable } from '@nestjs/common';
import { CoreBaseRepository } from '@/backend_trainer/core/database/core-base.repository';
import { CoreTenantDataSourceResolver } from '@/backend_trainer/core/database/core-tenant-datasource.resolver';
import { CoreNotFoundException } from '@/backend_trainer/core/errors/core-not-found.exception';
import { ProgressTrackingProgressEntryEntity } from '@/backend_trainer/modules/backend_trainer/progress-tracking/progress-tracking-progress-entry.entity';

export interface ProgressEntriesQuery { page:number; limit:number; startDate?:string; endDate?:string; sortBy:string; sortDirection:string; }
export interface ProgressTrackingMemberSummary { id:string; name:string; weightKg:number|null; progressStatus:string|null; }
export interface ProgressTrackingSummary { memberId:string; totalEntries:number; latestEntry:Record<string,unknown>|null; firstEntry:Record<string,unknown>|null; weightChangeKg:number; bmiChange:number; targetWeightKg:number|null; targetBodyFatPercent:number|null|undefined; targetDate:string|null|undefined; goalStatus:string|undefined; }

@Injectable()
export class ProgressTrackingRepository extends CoreBaseRepository {
  constructor(private readonly resolver: CoreTenantDataSourceResolver) { super(); }

  /** Lists members assigned to the authenticated trainer. */
  async findMembers(trainerId:string):Promise<ProgressTrackingMemberSummary[]>{
    const ds=await this.resolver.getDataSource();
    const rows=await ds.createQueryBuilder().select(['m.id AS id','m.name AS name','m.weight_kg AS "weightKg"','m.progress_status AS "progressStatus"']).from('trainer_members','m').where('m.deleted_at IS NULL AND m.assigned_trainer_id=:trainerId',{trainerId}).orderBy('m.name','ASC').getRawMany<{id:string;name:string;weightKg:number|null;progressStatus:string|null}>(); return rows;
  }

  /** Ensures a member is visible to the trainer before any progress access. */
  async assertMemberOwnedByTrainer(trainerId:string,memberId:string):Promise<void>{
    const ds=await this.resolver.getDataSource();
    const row=await ds.createQueryBuilder().select('m.id','id').from('trainer_members','m').where('m.id=:memberId AND m.assigned_trainer_id=:trainerId AND m.deleted_at IS NULL',{memberId,trainerId}).getRawOne();
    if(!row) throw new CoreNotFoundException('PROGRESS.MEMBER',memberId);
  }

  /** Lists progress entries with date and allowlisted sort filters. */
  async findEntries(memberId:string,query:ProgressEntriesQuery):Promise<{rows:ProgressTrackingProgressEntryEntity[];total:number}>{
    const repo=await this.resolver.getRepository(ProgressTrackingProgressEntryEntity);
    const allowed={date:'p.date',weightKg:'p.weight_kg',heightCm:'p.height_cm',bmi:'p.bmi',bodyFatPercent:'p.body_fat_percent',muscleMassKg:'p.muscle_mass_kg'} as const;
    const qb=repo.createQueryBuilder('p').where('p.member_id=:memberId AND p.deleted_at IS NULL',{memberId});
    if(query.startDate) qb.andWhere('p.date>=:startDate',{startDate:query.startDate});
    if(query.endDate) qb.andWhere('p.date<=:endDate',{endDate:query.endDate});
    qb.orderBy(allowed[query.sortBy as keyof typeof allowed]??allowed.date,query.sortDirection==='asc'?'ASC':'DESC').skip((query.page-1)*query.limit).take(query.limit);
    const [rows,total]=await qb.getManyAndCount(); return {rows,total};
  }

  /** Finds one active entry inside member scope. */
  async findById(memberId:string,id:string):Promise<ProgressTrackingProgressEntryEntity|null>{return (await this.resolver.getRepository(ProgressTrackingProgressEntryEntity)).findOneBy({id,memberId,deletedAt: IsNull()});}
  /** Returns one active progress entry or a typed not-found error. */
  async findByIdOrThrow(memberId:string,id:string):Promise<ProgressTrackingProgressEntryEntity>{return this.requireEntity(await this.findById(memberId,id), 'PROGRESS.ENTRY',id);}
  /** Creates one progress entry. */
  async createProgressEntry(memberId:string,input:Partial<ProgressTrackingProgressEntryEntity>):Promise<ProgressTrackingProgressEntryEntity>{const repo=await this.resolver.getRepository(ProgressTrackingProgressEntryEntity); return repo.save(repo.create({...input,memberId}));}
  /** Updates one progress entry. */
  async updateProgressEntryById(id:string,memberId:string,input:Partial<ProgressTrackingProgressEntryEntity>):Promise<ProgressTrackingProgressEntryEntity>{const repo=await this.resolver.getRepository(ProgressTrackingProgressEntryEntity); const result=await repo.update({id,memberId,deletedAt: IsNull()},input); if(!result.affected) throw new CoreNotFoundException('PROGRESS.ENTRY',id); return this.requireEntity(await this.findById(memberId,id), 'PROGRESS.ENTRY',id);}
  /** Soft-deletes one progress entry. */
  async softDelete(id:string,memberId:string):Promise<void>{const result=await (await this.resolver.getRepository(ProgressTrackingProgressEntryEntity)).softDelete({id,memberId,deletedAt: IsNull()}); if(!result.affected) throw new CoreNotFoundException('PROGRESS.ENTRY',id);}
  /** Returns summary measurements for one trainer-visible member. */
  async findSummary(memberId:string):Promise<ProgressTrackingSummary>{
    const ds=await this.resolver.getDataSource();
    const rows=await ds.createQueryBuilder().select(['p.id AS id','p.member_id AS "memberId"','p.date AS date','p.weight_kg AS "weightKg"','p.height_cm AS "heightCm"','p.bmi AS bmi','p.body_fat_percent AS "bodyFatPercent"','p.muscle_mass_kg AS "muscleMassKg"','p.chest_cm AS "chestCm"','p.waist_cm AS "waistCm"','p.hip_cm AS "hipCm"','p.notes AS notes','p.recorded_by AS "recordedBy"','p.blood_pressure AS "bloodPressure"','p.resting_heart_rate AS "restingHeartRate"','p.vo2_max AS "vo2Max"','p.progress_photos AS "progressPhotos"']).from('trainer_progress_entries','p').where('p.member_id=:memberId AND p.deleted_at IS NULL',{memberId}).orderBy('p.date','DESC').addOrderBy('p.created_at','DESC').getRawMany();
    const latest=rows[0]??null; const first=rows.at(-1)??null;
    const member=await ds.createQueryBuilder().select(['m.target_weight_kg AS \"targetWeightKg\"']).from('trainer_members','m').where('m.id=:memberId AND m.deleted_at IS NULL',{memberId}).getRawOne<{targetWeightKg:number|null}>();
    const targetWeightKg=member?.targetWeightKg===null||member?.targetWeightKg===undefined?null:Number(member.targetWeightKg);
    const latestWeight=latest?.weightKg===null||latest?.weightKg===undefined?null:Number(latest.weightKg);
    const goalStatus=targetWeightKg===null||latestWeight===null?undefined:(Math.abs(latestWeight-targetWeightKg)<=1?'Achieved':latestWeight<=targetWeightKg?'On Track':'Off Track');
    const weightChangeKg=latest&&first?Number(latest.weightKg)-Number(first.weightKg):0; const bmiChange=latest&&first?Number(latest.bmi)-Number(first.bmi):0;
    return {memberId,totalEntries:rows.length,latestEntry:latest,firstEntry:first,weightChangeKg,bmiChange,targetWeightKg,targetBodyFatPercent:undefined,targetDate:undefined,goalStatus};
  }
}
