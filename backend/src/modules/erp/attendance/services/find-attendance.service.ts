import { Injectable, Logger } from '@nestjs/common';
import { AttendanceRepository } from '@/modules/erp/attendance/attendance.repository';
import { FindAttendanceDto } from '@/modules/erp/attendance/dto/find-attendance.dto';
import { ATTENDANCE_MESSAGES } from '@/modules/erp/attendance/attendance.constants';
import type { AttendanceResponse } from '@/modules/erp/attendance/attendance.interfaces';

@Injectable()
export class FindAttendanceService {
  private readonly logger = new Logger(FindAttendanceService.name);

  constructor(private readonly attendanceRepository: AttendanceRepository) {}

  async findAll(query: FindAttendanceDto): Promise<AttendanceResponse> {
    this.logger.log(
      `Fetching attendances with query: ${JSON.stringify(query)}`,
    );
    const data = await this.attendanceRepository.findAllAttendances(query);

    return {
      message: ATTENDANCE_MESSAGES.FETCHED_SUCCESS,
      data,
    };
  }
}
