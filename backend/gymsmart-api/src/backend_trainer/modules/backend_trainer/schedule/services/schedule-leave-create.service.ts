// RESPONSIBILITY: Creates a trainer leave request and applies date invariants.
// FLOW: ScheduleCommandController → ScheduleLeaveCreateService → ScheduleRepository → audit.

import { BadRequestException, Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { CoreAuditService } from '@/backend_trainer/core/audit/core-audit.service';
import { ScheduleRepository } from '@/backend_trainer/modules/backend_trainer/schedule/repositories/schedule-repository';
import { ScheduleCreateLeaveDto } from '@/backend_trainer/modules/backend_trainer/schedule/dtos/schedule-create-leave.dto';
import { ScheduleLeaveMapper } from '@/backend_trainer/modules/backend_trainer/schedule/schedule-leave.mapper';
import type { ScheduleLeaveDomain } from '@/backend_trainer/modules/backend_trainer/schedule/schedule-leave.domain';
import { LeaveStatus } from '@/backend_trainer/modules/backend_trainer/schedule/schedule-enums';

@Injectable()
export class ScheduleLeaveCreateService {
  constructor(private readonly repo: ScheduleRepository, private readonly audit: CoreAuditService) {}

  /** Creates a pending leave request only when end date is not before start date. */
  async create(dto: ScheduleCreateLeaveDto): Promise<ScheduleLeaveDomain> {
    if (dto.endDate < dto.startDate) throw new BadRequestException('SCHEDULE.LEAVE.INVALID_DATE_RANGE');
    const row = await this.repo.createLeave({ trainerId: CoreRequestContext.get().userId ?? '', startDate: dto.startDate, endDate: dto.endDate, reason: dto.reason, leaveType: dto.leaveType, status: LeaveStatus.PENDING, managerNotes: null, totalDays: Math.floor((Date.parse(dto.endDate) - Date.parse(dto.startDate)) / 86400000) + 1, attachmentUrl: null, approvedBy: null, rejectedReason: null });
    await this.audit.record('LEAVE_REQUEST_CREATED', 'LEAVE_REQUEST', row.id, null, { startDate: row.startDate, endDate: row.endDate, leaveType: row.leaveType });
    return ScheduleLeaveMapper(row);
  }
}
