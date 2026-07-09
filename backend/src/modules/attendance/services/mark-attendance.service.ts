import { Injectable, Logger } from '@nestjs/common';
import { AttendanceRepository } from '@/modules/attendance/attendance.repository';
import { MarkAttendanceDto } from '@/modules/attendance/dto/mark-attendance.dto';
import { UserNotLinkedException } from '@/modules/attendance/attendance.exceptions';
import { ATTENDANCE_MESSAGES } from '@/modules/attendance/attendance.constants';
import type { AttendanceResponse } from '@/modules/attendance/attendance.interfaces';

@Injectable()
export class MarkAttendanceService {
  private readonly logger = new Logger(MarkAttendanceService.name);

  constructor(private readonly attendanceRepository: AttendanceRepository) {}

  async mark(dto: MarkAttendanceDto): Promise<AttendanceResponse> {
    this.logger.log(`Marking attendance for ${dto.memberId ? 'Member: ' + dto.memberId : 'Staff: ' + dto.staffId}`);

    if (!dto.memberId && !dto.staffId) {
      this.logger.warn('Failed to mark attendance: No member or staff ID provided');
      throw new UserNotLinkedException();
    }

    const data = await this.attendanceRepository.createAttendance(dto);

    return {
      message: ATTENDANCE_MESSAGES.MARKED_SUCCESS,
      data,
    };
  }
}
