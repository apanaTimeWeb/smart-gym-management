// RESPONSIBILITY: Executes isolated Trainer session mutations and records critical state changes.
// FLOW: Sessions command controller → command service → ownership checks → repository → audit.

import { Injectable } from '@nestjs/common';
import { CoreNotFoundException } from '@/backend_trainer/core/errors/core-not-found.exception';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { CoreAuditService } from '@/backend_trainer/core/audit/core-audit.service';
import { SessionsRepository } from '@/backend_trainer/modules/backend_trainer/sessions/repositories/sessions-repository';
import { SessionsCreateSessionDto } from '@/backend_trainer/modules/backend_trainer/sessions/dtos/sessions-create-session.dto';
import { SessionsUpdateSessionDto } from '@/backend_trainer/modules/backend_trainer/sessions/dtos/sessions-update-session.dto';
import { SessionsCancelSessionDto } from '@/backend_trainer/modules/backend_trainer/sessions/dtos/sessions-cancel-session.dto';
import { SessionsMarkSessionAttendanceDto } from '@/backend_trainer/modules/backend_trainer/sessions/dtos/sessions-mark-session-attendance.dto';
import { SessionRecurrence, SessionStatus } from '@/backend_trainer/modules/backend_trainer/sessions/sessions-enums';
import { SessionsSessionMapper } from '@/backend_trainer/modules/backend_trainer/sessions/sessions-session.mapper';
import { SessionsMemberForbiddenException } from '@/backend_trainer/modules/backend_trainer/sessions/sessions-exceptions';

@Injectable()
export class SessionsCommandService {
  constructor(private readonly repo:SessionsRepository,private readonly audit:CoreAuditService){}
  /** Creates a trainer-owned session and records its audit event. */
  async createSession(dto:SessionsCreateSessionDto):Promise<ReturnType<typeof SessionsSessionMapper>>{const trainerId=CoreRequestContext.get().userId??'';if(dto.memberId&&!(await this.repo.memberBelongsToTrainer(trainerId,dto.memberId)))throw new SessionsMemberForbiddenException();const enrolledMember=dto.memberId?await this.repo.findMemberById(trainerId,dto.memberId):null;const row=await this.repo.createSession({trainerId,title:dto.type==='PT'?'Personal Training':'Group Session',type:dto.type,time:dto.time,sessionDate:dto.date,duration:dto.duration,status:SessionStatus.Upcoming,attendees:0,maxAttendees:null,memberId:dto.memberId??null,isOnline:false,enrolledMembers:enrolledMember?[enrolledMember]:[],sessionNotes:null,location:dto.location??null,room:dto.room??null,trainerNotes:null,memberRating:null,cancellationReason:null,recurrenceRule:dto.recurrenceType??SessionRecurrence.None});await this.audit.record('SESSION_CREATED','SESSION',row.id,null,{type:row.type,date:row.sessionDate});return SessionsSessionMapper(row);}
  /** Updates a trainer-owned session using an application input mapping. */
  async updateSession(id:string,dto:SessionsUpdateSessionDto):Promise<ReturnType<typeof SessionsSessionMapper>>{const trainerId=CoreRequestContext.get().userId??'';const memberId=dto.memberId;if(memberId&&!(await this.repo.memberBelongsToTrainer(trainerId,memberId)))throw new SessionsMemberForbiddenException();const before=await this.repo.findByIdOrThrow(trainerId,id);const row=await this.repo.updateSessionById(id,trainerId,{time:dto.time,sessionDate:dto.date,duration:dto.duration,type:dto.type,memberId,location:dto.location,room:dto.room,recurrenceRule:dto.recurrenceType});await this.audit.record('SESSION_UPDATED','SESSION',id,{status:before.status},{status:row.status});return SessionsSessionMapper(row);}
  /** Soft-cancels a trainer-owned session with a canonical default reason. */
  async cancelSession(id:string,dto:SessionsCancelSessionDto):Promise<ReturnType<typeof SessionsSessionMapper>>{const trainerId=CoreRequestContext.get().userId??'';await this.repo.findByIdOrThrow(trainerId,id);const row=await this.repo.cancelSession(id,trainerId,dto.reason?.trim()||'Trainer cancelled session');await this.audit.record('SESSION_CANCELLED','SESSION',id,{status:SessionStatus.Upcoming},{status:row.status});return SessionsSessionMapper(row);}
  /** Records attendance only for trainer-owned, enrolled members. */
  async markAttendance(id:string,dto:SessionsMarkSessionAttendanceDto):Promise<null>{const trainerId=CoreRequestContext.get().userId??'';await this.repo.findByIdOrThrow(trainerId,id);await this.repo.markMemberAttendance(id,trainerId,dto.memberIds);await this.audit.record('SESSION_ATTENDANCE_RECORDED','SESSION',id,null,{memberCount:dto.memberIds.length});return null;}
}
