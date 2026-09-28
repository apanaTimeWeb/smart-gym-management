// RESPONSIBILITY: Owns Trainer session persistence, ownership checks, and concurrency-safe attendance updates.
// FLOW: Sessions service → TrainerSessionsRepository → tenant TypeORM/query builder.

import type { SessionsListQuery } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_types/trainer-sessions-list-query.type';
// RESPONSIBILITY: Owns Trainer session persistence, ownership checks, and concurrency-safe attendance updates.
// FLOW: Sessions service → TrainerSessionsRepository → tenant TypeORM/query builder.

import { IsNull } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { SessionsSessionMapper } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-session.mapper';
import type { SessionsSessionDomain } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-session.domain';
import { CoreBaseRepository } from '@/backend_trainer/backend_core/core_database/core-base.repository';
import { CoreNotFoundException } from '@/backend_trainer/backend_core/core_errors/core-not-found.exception';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver';
import { TrainerSessionsSessionEntity } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-session.entity';
import { SessionStatus } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-enums';
import { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';



/**
 * Intent: Defines the TrainerSessionsRepository boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerSessionsRepository extends CoreBaseRepository {
  constructor(private readonly resolver:CoreTenantDatasourceResolver){super();}

  /** Lists active sessions owned by the authenticated trainer. */
  async findMany(trainerId:string,q:SessionsListQuery):Promise<{rows:SessionsSessionDomain[];total:number}>{
    const repo=await this.resolver.getRepository(TrainerSessionsSessionEntity); const allowed={sessionDate:'s.session_date',time:'s.time',status:'s.status'} as const;
    const qb=repo.createQueryBuilder('s').where('s.trainer_id=:trainerId AND s.deleted_at IS NULL',{trainerId}); if(q.date)qb.andWhere('s.session_date=:date',{date:q.date}); if(q.startDate)qb.andWhere('s.session_date>=:startDate',{startDate:q.startDate}); if(q.endDate)qb.andWhere('s.session_date<=:endDate',{endDate:q.endDate}); if(q.status)qb.andWhere('s.status=:status',{status:q.status});
    qb.orderBy(allowed[q.sortBy as keyof typeof allowed]??allowed.sessionDate,q.sortDirection==='asc'?'ASC':'DESC').skip((q.page-1)*q.limit).take(q.limit); const [rows,total]=await qb.getManyAndCount(); const memberIds=rows.map((row)=>row.memberId).filter((id):id is string=>Boolean(id)); if(memberIds.length){const members=await repo.manager.createQueryBuilder().select(['m.id AS id','m.name AS name']).from('trainer_members','m').where('m.id IN (:...memberIds) AND m.assigned_trainer_id=:trainerId AND m.deleted_at IS NULL',{memberIds,trainerId}).getRawMany<{id:string;name:string}>(); const byId=new Map(members.map((member)=>[member.id,member.name])); for(const row of rows){const memberName=row.memberId?byId.get(row.memberId):undefined; if(memberName)(row as TrainerSessionsSessionEntity & {memberName?:string}).memberName=memberName;}} return {rows: rows.map(SessionsSessionMapper), total};
  }

  /** Finds a trainer-owned session or null. */
  async findById(trainerId:string,id:string):Promise<SessionsSessionDomain|null>{return (await this.resolver.getRepository(TrainerSessionsSessionEntity)).findOneBy({id,trainerId,deletedAt: IsNull()}).then((row) => row ? SessionsSessionMapper(row) : null);}
  /** Returns a trainer-owned session or typed not-found. */
  async findByIdOrThrow(trainerId:string,id:string):Promise<SessionsSessionDomain>{const row=await this.findById(trainerId,id);if(!row)throw new CoreNotFoundException('SESSIONS.SESSION',id);return row;}
  /** Verifies a member belongs to the trainer. */
  async memberBelongsToTrainer(trainerId:string,memberId:string):Promise<boolean>{const ds=await this.resolver.getDataSource();const row=await ds.createQueryBuilder().select('m.id','id').from('trainer_members','m').where('m.id=:memberId AND m.assigned_trainer_id=:trainerId AND m.deleted_at IS NULL',{memberId,trainerId}).getRawOne<{id:string}>();return Boolean(row?.id);}
  /** Finds one trainer-owned member identity for session enrollment. */
  async findMemberById(trainerId:string,memberId:string):Promise<{id:string;name:string}|null>{const ds=await this.resolver.getDataSource();return await ds.createQueryBuilder().select(['m.id AS id','m.name AS name']).from('trainer_members','m').where('m.id=:memberId AND m.assigned_trainer_id=:trainerId AND m.deleted_at IS NULL',{memberId,trainerId}).getRawOne<{id:string;name:string}>() ?? null;}
  /** Returns trainer-owned members for session selection. */
  async findMembers(trainerId:string):Promise<Array<{id:string;name:string}>>{const ds=await this.resolver.getDataSource();return ds.createQueryBuilder().select(['m.id AS id','m.name AS name']).from('trainer_members','m').where('m.deleted_at IS NULL AND m.assigned_trainer_id=:trainerId',{trainerId}).orderBy('m.name','ASC').getRawMany<{id:string;name:string}>();}
  /** Creates a trainer-owned session. */
  async createSession(input:Partial<TrainerSessionsSessionEntity>,context?:CoreTransactionContext):Promise<SessionsSessionDomain>{const repo=context?.getRepository(TrainerSessionsSessionEntity) ?? await this.resolver.getRepository(TrainerSessionsSessionEntity);return repo.save(repo.create(input)).then(SessionsSessionMapper);}
  /** Updates a trainer-owned session through a repository-owned mutation. */
  async updateSessionById(id:string,trainerId:string,input:Partial<TrainerSessionsSessionEntity>,context?:CoreTransactionContext):Promise<SessionsSessionDomain>{const repo=context?.getRepository(TrainerSessionsSessionEntity) ?? await this.resolver.getRepository(TrainerSessionsSessionEntity);const result=await repo.update({id,trainerId,deletedAt: IsNull()},input);if(!result.affected)throw new CoreNotFoundException('SESSIONS.SESSION',id);const row=await repo.findOneBy({id,trainerId,deletedAt:IsNull()}); if(!row) throw new CoreNotFoundException('SESSIONS.SESSION',id); return SessionsSessionMapper(row);}
  /** Soft-cancels a trainer-owned session. */
  async cancelSession(id:string,trainerId:string,reason:string,context?:CoreTransactionContext):Promise<SessionsSessionDomain>{const repo=context?.getRepository(TrainerSessionsSessionEntity) ?? await this.resolver.getRepository(TrainerSessionsSessionEntity);const result=await repo.update({id,trainerId,deletedAt: IsNull()},{status:SessionStatus.NO_SHOW,cancellationReason:reason});if(!result.affected)throw new CoreNotFoundException('SESSIONS.SESSION',id);const row=await repo.findOneBy({id,trainerId,deletedAt:IsNull()}); if(!row) throw new CoreNotFoundException('SESSIONS.SESSION',id); return SessionsSessionMapper(row);}
  /** Updates enrolled attendance under a pessimistic write lock after member ownership checks. */
  async markMemberAttendance(id:string,trainerId:string,memberIds:string[],context:CoreTransactionContext):Promise<void>{
    await context.run(async(manager)=>{
      const repo=manager.getRepository(TrainerSessionsSessionEntity); const row=await repo.createQueryBuilder('s').setLock('pessimistic_write').where('s.id=:id AND s.trainer_id=:trainerId AND s.deleted_at IS NULL',{id,trainerId}).getOne();
      if(!row)throw new CoreNotFoundException('SESSIONS.SESSION',id);
      if(memberIds.length>0){const valid=await manager.createQueryBuilder().select('m.id','id').from('trainer_members','m').where('m.assigned_trainer_id=:trainerId AND m.deleted_at IS NULL AND m.id IN (:...memberIds)',{trainerId,memberIds}).getRawMany<{id:string}>(); if(valid.length!==memberIds.length)throw new CoreNotFoundException('SESSIONS.MEMBER_NOT_ENROLLED',memberIds[0] ?? '');}
      const enrolledIds=new Set((row.enrolledMembers??[]).map((member: {id:string;name:string})=>member.id)); if(memberIds.some((memberId)=>!enrolledIds.has(memberId)))throw new CoreNotFoundException('SESSIONS.MEMBER_NOT_ENROLLED',memberIds.find((memberId)=>!enrolledIds.has(memberId))??''); row.attendees=memberIds.length; await repo.update({id,trainerId,deletedAt: IsNull()},{attendees:row.attendees});
    });
  }
}
