import { IsNull } from 'typeorm';
// RESPONSIBILITY: Owns Trainer session persistence, ownership checks, and concurrency-safe attendance updates.
// FLOW: Sessions service → SessionsRepository → tenant TypeORM/query builder.

import { Injectable } from '@nestjs/common';
import { CoreBaseRepository } from '@/backend_trainer/core/database/core-base.repository';
import { CoreNotFoundException } from '@/backend_trainer/core/errors/core-not-found.exception';
import { CoreTenantDataSourceResolver } from '@/backend_trainer/core/database/core-tenant-datasource.resolver';
import { SessionsSessionEntity } from '@/backend_trainer/modules/backend_trainer/sessions/sessions-session.entity';
import { SessionStatus } from '@/backend_trainer/modules/backend_trainer/sessions/sessions-enums';

export interface SessionsListQuery { page:number; limit:number; date?:string; startDate?:string; endDate?:string; status?:string; sortBy:string; sortDirection:string; }

@Injectable()
export class SessionsRepository extends CoreBaseRepository {
  constructor(private readonly resolver:CoreTenantDataSourceResolver){super();}

  /** Lists active sessions owned by the authenticated trainer. */
  async findMany(trainerId:string,q:SessionsListQuery):Promise<{rows:SessionsSessionEntity[];total:number}>{
    const repo=await this.resolver.getRepository(SessionsSessionEntity); const allowed={sessionDate:'s.session_date',time:'s.time',status:'s.status'} as const;
    const qb=repo.createQueryBuilder('s').where('s.trainer_id=:trainerId AND s.deleted_at IS NULL',{trainerId}); if(q.date)qb.andWhere('s.session_date=:date',{date:q.date}); if(q.startDate)qb.andWhere('s.session_date>=:startDate',{startDate:q.startDate}); if(q.endDate)qb.andWhere('s.session_date<=:endDate',{endDate:q.endDate}); if(q.status)qb.andWhere('s.status=:status',{status:q.status});
    qb.orderBy(allowed[q.sortBy as keyof typeof allowed]??allowed.sessionDate,q.sortDirection==='asc'?'ASC':'DESC').skip((q.page-1)*q.limit).take(q.limit); const [rows,total]=await qb.getManyAndCount(); return {rows,total};
  }

  /** Finds a trainer-owned session or null. */
  async findById(trainerId:string,id:string):Promise<SessionsSessionEntity|null>{return (await this.resolver.getRepository(SessionsSessionEntity)).findOneBy({id,trainerId,deletedAt: IsNull()});}
  /** Returns a trainer-owned session or typed not-found. */
  async findByIdOrThrow(trainerId:string,id:string):Promise<SessionsSessionEntity>{return this.requireEntity(await this.findById(trainerId,id), 'SESSIONS.SESSION',id);}
  /** Verifies a member belongs to the trainer. */
  async memberBelongsToTrainer(trainerId:string,memberId:string):Promise<boolean>{const ds=await this.resolver.getDataSource();const row=await ds.createQueryBuilder().select('m.id','id').from('trainer_members','m').where('m.id=:memberId AND m.assigned_trainer_id=:trainerId AND m.deleted_at IS NULL',{memberId,trainerId}).getRawOne();return Boolean(row);}
  /** Finds one trainer-owned member identity for session enrollment. */
  async findMemberById(trainerId:string,memberId:string):Promise<{id:string;name:string}|null>{const ds=await this.resolver.getDataSource();return await ds.createQueryBuilder().select(['m.id AS id','m.name AS name']).from('trainer_members','m').where('m.id=:memberId AND m.assigned_trainer_id=:trainerId AND m.deleted_at IS NULL',{memberId,trainerId}).getRawOne() ?? null;}
  /** Returns trainer-owned members for session selection. */
  async findMembers(trainerId:string):Promise<Array<{id:string;name:string}>>{const ds=await this.resolver.getDataSource();return ds.createQueryBuilder().select(['m.id AS id','m.name AS name']).from('trainer_members','m').where('m.deleted_at IS NULL AND m.assigned_trainer_id=:trainerId',{trainerId}).orderBy('m.name','ASC').getRawMany();}
  /** Creates a trainer-owned session. */
  async createSession(input:Partial<SessionsSessionEntity>):Promise<SessionsSessionEntity>{const repo=await this.resolver.getRepository(SessionsSessionEntity);return repo.save(repo.create(input));}
  /** Updates a trainer-owned session through a repository-owned mutation. */
  async updateSessionById(id:string,trainerId:string,input:Partial<SessionsSessionEntity>):Promise<SessionsSessionEntity>{const repo=await this.resolver.getRepository(SessionsSessionEntity);const result=await repo.update({id,trainerId,deletedAt: IsNull()},input);if(!result.affected)throw new CoreNotFoundException('SESSIONS.SESSION',id);return this.findByIdOrThrow(trainerId,id);}
  /** Soft-cancels a trainer-owned session. */
  async cancelSession(id:string,trainerId:string,reason:string):Promise<SessionsSessionEntity>{const repo=await this.resolver.getRepository(SessionsSessionEntity);const result=await repo.update({id,trainerId,deletedAt: IsNull()},{status:SessionStatus.NoShow,cancellationReason:reason});if(!result.affected)throw new CoreNotFoundException('SESSIONS.SESSION',id);return this.findByIdOrThrow(trainerId,id);}
  /** Updates enrolled attendance under a pessimistic write lock after member ownership checks. */
  async markMemberAttendance(id:string,trainerId:string,memberIds:string[]):Promise<void>{
    const ds=await this.resolver.getDataSource();
    await ds.transaction(async(manager: import('typeorm').EntityManager)=>{
      const repo=manager.getRepository(SessionsSessionEntity); const row=await repo.createQueryBuilder('s').setLock('pessimistic_write').where('s.id=:id AND s.trainer_id=:trainerId AND s.deleted_at IS NULL',{id,trainerId}).getOne();
      if(!row)throw new CoreNotFoundException('SESSIONS.SESSION',id);
      if(memberIds.length>0){const valid=await manager.createQueryBuilder().select('m.id','id').from('trainer_members','m').where('m.assigned_trainer_id=:trainerId AND m.deleted_at IS NULL AND m.id IN (:...memberIds)',{trainerId,memberIds}).getRawMany(); if(valid.length!==memberIds.length)throw new CoreNotFoundException('SESSIONS.MEMBER_NOT_ENROLLED',memberIds[0] ?? '');}
      const enrolledIds=new Set((row.enrolledMembers??[]).map((member: {id:string;name:string})=>member.id)); if(memberIds.some((memberId)=>!enrolledIds.has(memberId)))throw new CoreNotFoundException('SESSIONS.MEMBER_NOT_ENROLLED',memberIds.find((memberId)=>!enrolledIds.has(memberId))??''); row.attendees=memberIds.length; await repo.update({id,trainerId,deletedAt: IsNull()},{attendees:row.attendees});
    });
  }
}
