// RESPONSIBILITY: Owns Trainer attendance persistence and trainer-scoped attendance queries.
// FLOW: Attendance service → repository → tenant TypeORM/query builder.

import type { AttendanceListQuery } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_types/trainer-attendance-list-query.type';
// RESPONSIBILITY: Owns Trainer attendance persistence, member selectors, and trainer-scoped attendance queries.
// FLOW: Attendance service → repository → tenant TypeORM.

import { IsNull } from 'typeorm';
// RESPONSIBILITY: Owns Trainer attendance persistence, member selectors, and trainer-scoped attendance queries.
// FLOW: Attendance service → repository → tenant TypeORM/query builder.

import { Injectable } from '@nestjs/common';
import { AttendanceRecordMapper } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/trainer-attendance-record.mapper';
import type { AttendanceRecordDomain } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/trainer-attendance-record.domain';
import { CoreBaseRepository } from '@/backend_trainer/backend_core/core_database/core-base.repository';
import { CoreNotFoundException } from '@/backend_trainer/backend_core/core_errors/core-not-found.exception';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver';
import { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';
import { TrainerAttendanceRecordEntity } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/trainer-attendance-record.entity';
import { AttendanceRecordType } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/trainer-attendance-enums';



/**
 * Intent: Defines the TrainerAttendanceRepository boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerAttendanceRepository extends CoreBaseRepository {
  constructor(private readonly resolver:CoreTenantDatasourceResolver){super();}
  /** Lists trainer-created attendance records with optional member search and date filtering. */
  async findMany(trainerId:string,q:AttendanceListQuery):Promise<{rows:AttendanceRecordDomain[];total:number}>{
    const repo=await this.resolver.getRepository(TrainerAttendanceRecordEntity); const allowed={name:'m.name',type:'a.type',date:'a.date',checkIn:'a.check_in',checkOut:'a.check_out',durationMinutes:'a.duration_minutes',checkInMethod:'a.check_in_method'} as const;
    const qb=repo.createQueryBuilder('a').leftJoin('trainer_members','m','m.id = a.member_id AND m.deleted_at IS NULL').where('a.created_by=:trainerId AND a.deleted_at IS NULL',{trainerId});
    if(q.staffId)qb.andWhere('a.staff_id=:staffId',{staffId:q.staffId}); if(q.date)qb.andWhere('a.date=:date',{date:q.date}); if(q.startDate)qb.andWhere('a.date>=:startDate',{startDate:q.startDate}); if(q.endDate)qb.andWhere('a.date<=:endDate',{endDate:q.endDate}); if(q.type)qb.andWhere('a.type=:type',{type:q.type});
    if(q.search)qb.andWhere(`(a.member_id IN (SELECT m.id FROM trainer_members m WHERE m.assigned_trainer_id=:trainerId AND m.deleted_at IS NULL AND (m.name ILIKE :search OR m.phone ILIKE :search)))`,{trainerId,search:`%${q.search}%`});
    qb.orderBy(allowed[q.sortBy as keyof typeof allowed] ?? allowed.date, q.sortDirection === 'asc' ? 'ASC' : 'DESC').skip((q.page - 1) * q.limit).take(q.limit);
    const [rows, total] = await qb.getManyAndCount();
    const memberIds = rows.map((row) => row.memberId).filter((id): id is string => Boolean(id));
    if (memberIds.length) {
      const members = (await repo.query(`SELECT id,name,phone FROM trainer_members WHERE id = ANY($1) AND assigned_trainer_id = $2 AND deleted_at IS NULL`, [memberIds, trainerId])) as Array<{ id: string; name: string; phone: string | null }>;
      const byId = new Map(members.map((member) => [member.id, member]));
      for (const row of rows) row.member = byId.get(row.memberId ?? '') ?? null;
    }
    const staffIds = rows.map((row) => row.staffId).filter((id): id is string => Boolean(id));
    if (staffIds.length) {
      const staff = (await repo.query(`SELECT user_id AS id,name,email,phone FROM trainer_profiles WHERE user_id = ANY($1) AND deleted_at IS NULL`, [staffIds])) as Array<{ id: string; name: string; email: string | null; phone: string | null }>;
      const byId = new Map(staff.map((person) => [person.id, person]));
      for (const row of rows) row.staff = byId.get(row.staffId ?? '') ?? null;
    }
    return { rows, total };
  }
  /** Finds an active attendance row by ID. */
  async findById(id:string):Promise<AttendanceRecordDomain|null>{return (await this.resolver.getRepository(TrainerAttendanceRecordEntity)).findOneBy({id,deletedAt: IsNull()}).then((row) => row ? AttendanceRecordMapper(row) : null);}
  /** Returns one active attendance row or typed not-found. */
  async findByIdOrThrow(id:string):Promise<AttendanceRecordDomain>{const row=await this.findById(id);if(!row)throw new CoreNotFoundException('ATTENDANCE.RECORD',id);return row;}
  /** Finds the current open staff row for the authenticated trainer. */
  async findOpenByStaffId(staffId:string):Promise<AttendanceRecordDomain|null>{return (await this.resolver.getRepository(TrainerAttendanceRecordEntity)).createQueryBuilder('a').where('a.staff_id=:staffId AND a.created_by=:staffId AND a.check_out IS NULL AND a.deleted_at IS NULL',{staffId}).orderBy('a.check_in','DESC').getOne().then((row) => row ? AttendanceRecordMapper(row) : null);}
  /** Creates an attendance row. */
  async createRecord(input:Partial<TrainerAttendanceRecordEntity>,context?:CoreTransactionContext):Promise<AttendanceRecordDomain>{const repo=context?.getRepository(TrainerAttendanceRecordEntity) ?? await this.resolver.getRepository(TrainerAttendanceRecordEntity); return repo.save(repo.create(input)).then(AttendanceRecordMapper);}
  /** Checks whether a member is assigned to a trainer. */
  async memberBelongsToTrainer(memberId:string,trainerId:string):Promise<boolean>{const ds=await this.resolver.getDataSource(); const row=await ds.createQueryBuilder().select('m.id','id').from('trainer_members','m').where('m.id=:memberId AND m.assigned_trainer_id=:trainerId AND m.deleted_at IS NULL',{memberId,trainerId}).getRawOne<{id:string}>(); return Boolean(row?.id);}
  /** Updates checkout data for one trainer-owned staff record. */
  async checkoutById(id:string,trainerId:string,checkOut:Date,durationMinutes:number,context?:CoreTransactionContext):Promise<void>{const repo=context?.getRepository(TrainerAttendanceRecordEntity) ?? await this.resolver.getRepository(TrainerAttendanceRecordEntity); const result=await repo.update({id,createdBy:trainerId,deletedAt: IsNull()},{checkOut,durationMinutes}); if(!result.affected)throw new CoreNotFoundException('ATTENDANCE.RECORD',id);}
  /** Returns basic member identities limited to trainer-owned members. */
  async findMemberOptions(trainerId:string):Promise<Array<{id:string;name:string;phone:string}>>{const ds=await this.resolver.getDataSource(); return ds.createQueryBuilder().select(['m.id AS id','m.name AS name','m.phone AS phone']).from('trainer_members','m').where('m.deleted_at IS NULL AND m.assigned_trainer_id=:trainerId',{trainerId}).orderBy('m.name','ASC').getRawMany<{id:string;name:string;phone:string}>();}
  /** Returns attendance KPI counts scoped to the authenticated trainer. */
  async findStats(trainerId:string):Promise<{totalCheckIns:number;memberCheckIns:number;staffCheckIns:number}>{const ds=await this.resolver.getDataSource(); const base='a.deleted_at IS NULL AND a.created_by=:trainerId'; const total=Number((await ds.createQueryBuilder().select('COUNT(1)','count').from('trainer_attendance_records','a').where(base,{trainerId}).getRawOne<{count:string}>())?.count??0); const member=Number((await ds.createQueryBuilder().select('COUNT(1)','count').from('trainer_attendance_records','a').where(`${base} AND a.type=:type`,{trainerId,type:AttendanceRecordType.MEMBER}).getRawOne<{count:string}>())?.count??0); return {totalCheckIns:total,memberCheckIns:member,staffCheckIns:Math.max(0,total-member)};}

}
