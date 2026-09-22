// RESPONSIBILITY: Closes only the authenticated Trainer's own open staff attendance row.
// FLOW: Attendance command controller → checkout service → scoped repository mutation.

import { BadRequestException, Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { CoreAuditService } from '@/backend_trainer/core/audit/core-audit.service';
import { AttendanceRepository } from '@/backend_trainer/modules/backend_trainer/attendance/repositories/attendance-repository';

@Injectable()
export class AttendanceCheckoutService {
  constructor(private readonly repo: AttendanceRepository, private readonly audit: CoreAuditService) {}
  /** Closes the authenticated trainer's current open attendance record. */
  async checkout(staffId:string,checkoutAt?:string):Promise<null>{
    const actorId=CoreRequestContext.get().userId;
    if(!actorId||staffId!==actorId)throw new BadRequestException('DOMAIN.ATTENDANCE.RECORD.OWNERSHIP_REQUIRED');
    const row=await this.repo.findOpenByStaffId(actorId); if(!row)throw new BadRequestException('DOMAIN.ATTENDANCE.RECORD.NOT_FOUND'); if(row.checkOut)throw new BadRequestException('DOMAIN.ATTENDANCE.RECORD.ALREADY_CLOSED');
    const end=checkoutAt?new Date(checkoutAt):new Date(); if(Number.isNaN(end.getTime()))throw new BadRequestException('DOMAIN.ATTENDANCE.RECORD.INVALID_CHECKOUT_TIME');
    const start=row.checkIn??end; const duration=Math.max(0,Math.round((end.getTime()-start.getTime())/60000)); await this.repo.checkoutById(row.id,actorId,end,duration); await this.audit.record('ATTENDANCE_CHECKED_OUT','ATTENDANCE',row.id,{checkOut:null},{checkOut:end.toISOString(),durationMinutes:duration}); return null;
  }
}
