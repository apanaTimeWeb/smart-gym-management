import { IsNull } from 'typeorm';
// RESPONSIBILITY: Owns Trainer attendance persistence, member selectors, and trainer-scoped attendance queries.
// FLOW: Attendance service → repository → tenant TypeORM/query builder.

import { Injectable } from '@nestjs/common';
import { CoreBaseRepository } from '@/backend_trainer/core/database/core-base.repository';
import { CoreNotFoundException } from '@/backend_trainer/core/errors/core-not-found.exception';
import { CoreTenantDataSourceResolver } from '@/backend_trainer/core/database/core-tenant-datasource.resolver';
import { AttendanceRecordEntity } from '@/backend_trainer/modules/backend_trainer/attendance/attendance-record.entity';
import { AttendanceRecordType } from '@/backend_trainer/modules/backend_trainer/attendance/attendance-enums';

export interface AttendanceListQuery { page:number;limit:number;startDate?:string;endDate?:string;date?:string;search?:string;type?:string;staffId?:string;sortBy:string;sortDirection:string; }

@Injectable()
export class AttendanceRepository extends CoreBaseRepository {
  constructor(private readonly resolver:CoreTenantDataSourceResolver){super();}
  /** Lists trainer-created attendance records with optional member search and date filtering. */
  async findMany(trainerId:string,q:AttendanceListQuery):Promise<{rows:AttendanceRecordEntity[];total:number}>{
    const repo=await this.resolver.getRepository(AttendanceRecordEntity); const allowed={name:'m.name',type:'a.type',date:'a.date',checkIn:'a.check_in',checkOut:'a.check_out',durationMinutes:'a.duration_minutes',checkInMethod:'a.check_in_method'} as const;
    const qb=repo.createQueryBuilder('a').leftJoin('trainer_members','m','m.id = a.member_id AND m.deleted_at IS NULL').where('a.created_by=:trainerId AND a.deleted_at IS NULL',{trainerId});
    if(q.staffId)qb.andWhere('a.staff_id=:staffId',{staffId:q.staffId}); if(q.date)qb.andWhere('a.date=:date',{date:q.date}); if(q.startDate)qb.andWhere('a.date>=:startDate',{startDate:q.startDate}); if(q.endDate)qb.andWhere('a.date<=:endDate',{endDate:q.endDate}); if(q.type)qb.andWhere('a.type=:type',{type:q.type});
    if(q.search)qb.andWhere(`(a.member_id IN (SELECT m.id FROM trainer_members m WHERE m.assigned_trainer_id=:trainerId AND m.deleted_at IS NULL AND (m.name ILIKE :search OR m.phone ILIKE :search)))`,{trainerId,search:`%${q.search}%`});
    qb.orderBy(allowed[q.sortBy as keyof typeof allowed]??allowed.date,q.sortDirection==='asc'?'ASC':'DESC').skip((q.page-1)*q.limit).take(q.limit); const [rows,total]=await qb.getManyAndCount(); const ids=rows.map((r:AttendanceRecordEntity)=>r.memberId).filter((v:string|null):v is string=>Boolean(v)); if(ids.length){const members=await repo.query(`SELECT id,name,phone FROM trainer_members WHERE id = ANY($1) AND assigned_trainer_id = $2 AND deleted_at IS NULL`,[ids,trainerId]); const byId=new Map(members.map((m:{id:string;name:string;phone:string|null})=>[m.id,m])); for(const row of rows) row.member=(byId.get(row.memberId??'')??null) as any;} const staffIds=rows.map((r:AttendanceRecordEntity)=>r.staffId).filter((v:string|null):v is string=>Boolean(v)); if(staffIds.length){const staff=await repo.query(`SELECT user_id AS id,name,email,phone FROM trainer_profiles WHERE user_id = ANY($1) AND deleted_at IS NULL`,[staffIds]); const byId=new Map(staff.map((m:{id:string;name:string;email:string|null;phone:string|null})=>[m.id,m])); for(const row of rows) row.staff=(byId.get(row.staffId??'')??null) as any;} return {rows,total};
  }
  /** Finds an active attendance row by ID. */
  async findById(id:string):Promise<AttendanceRecordEntity|null>{return (await this.resolver.getRepository(AttendanceRecordEntity)).findOneBy({id,deletedAt: IsNull()});}
  /** Returns one active attendance row or typed not-found. */
  async findByIdOrThrow(id:string):Promise<AttendanceRecordEntity>{return this.requireEntity(await this.findById(id), 'ATTENDANCE.RECORD',id);}
  /** Finds the current open staff row for the authenticated trainer. */
  async findOpenByStaffId(staffId:string):Promise<AttendanceRecordEntity|null>{return (await this.resolver.getRepository(AttendanceRecordEntity)).createQueryBuilder('a').where('a.staff_id=:staffId AND a.created_by=:staffId AND a.check_out IS NULL AND a.deleted_at IS NULL',{staffId}).orderBy('a.check_in','DESC').getOne();}
  /** Creates an attendance row. */
  async createRecord(input:Partial<AttendanceRecordEntity>):Promise<AttendanceRecordEntity>{const repo=await this.resolver.getRepository(AttendanceRecordEntity); return repo.save(repo.create(input));}
  /** Checks whether a member is assigned to a trainer. */
  async memberBelongsToTrainer(memberId:string,trainerId:string):Promise<boolean>{const ds=await this.resolver.getDataSource(); const row=await ds.createQueryBuilder().select('m.id','id').from('trainer_members','m').where('m.id=:memberId AND m.assigned_trainer_id=:trainerId AND m.deleted_at IS NULL',{memberId,trainerId}).getRawOne(); return Boolean(row);}
  /** Updates checkout data for one trainer-owned staff record. */
  async checkoutById(id:string,trainerId:string,checkOut:Date,durationMinutes:number):Promise<void>{const repo=await this.resolver.getRepository(AttendanceRecordEntity); const result=await repo.update({id,createdBy:trainerId,deletedAt: IsNull()},{checkOut,durationMinutes}); if(!result.affected)throw new CoreNotFoundException('ATTENDANCE.RECORD',id);}
  /** Returns basic member identities limited to trainer-owned members. */
  async findMemberOptions(trainerId:string):Promise<Array<{id:string;name:string;phone:string}>>{const ds=await this.resolver.getDataSource(); return ds.createQueryBuilder().select(['m.id AS id','m.name AS name','m.phone AS phone']).from('trainer_members','m').where('m.deleted_at IS NULL AND m.assigned_trainer_id=:trainerId',{trainerId}).orderBy('m.name','ASC').getRawMany();}
  /** Returns attendance KPI counts scoped to the authenticated trainer. */
  async findStats(trainerId:string):Promise<{totalCheckIns:number;memberCheckIns:number;staffCheckIns:number}>{const ds=await this.resolver.getDataSource(); const base='a.deleted_at IS NULL AND a.created_by=:trainerId'; const total=Number((await ds.createQueryBuilder().select('COUNT(1)','count').from('trainer_attendance_records','a').where(base,{trainerId}).getRawOne<{count:string}>())?.count??0); const member=Number((await ds.createQueryBuilder().select('COUNT(1)','count').from('trainer_attendance_records','a').where(`${base} AND a.type=:type`,{trainerId,type:AttendanceRecordType.MEMBER}).getRawOne<{count:string}>())?.count??0); return {totalCheckIns:total,memberCheckIns:member,staffCheckIns:Math.max(0,total-member)};}
  /** Returns bounded CSV rows for the trainer. */
  async findExportRows(trainerId:string):Promise<Array<{id:string;date:Date|string;type:string;checkIn:Date|string|null;checkOut:Date|string|null;durationMinutes:number|null}>>{const ds=await this.resolver.getDataSource();return ds.createQueryBuilder().select(['a.id AS id','a.date AS date','a.type AS type','a.check_in AS "checkIn"','a.check_out AS "checkOut"','a.duration_minutes AS "durationMinutes"']).from('trainer_attendance_records','a').where('a.deleted_at IS NULL AND a.created_by=:trainerId',{trainerId}).orderBy('a.date','DESC').limit(5000).getRawMany();}
}
