import { Injectable, Logger } from '@nestjs/common';
import { AttendanceRepository } from '@/modules/attendance/services/attendance.repository';
import { FindAttendanceDto } from '@/modules/attendance/dto/find-attendance.dto';
import { ATTENDANCE_MESSAGES } from '@/modules/attendance/attendance.constants';
import type { AttendanceResponse } from '@/modules/attendance/attendance.interfaces';

@Injectable()
export class FindAttendanceService {
  private readonly logger = new Logger(FindAttendanceService.name);

  constructor(private readonly attendanceRepository: AttendanceRepository) {}

  async findAll(query: FindAttendanceDto): Promise<AttendanceResponse> {
    this.logger.log(`Fetching attendances with query: ${JSON.stringify(query)}`);
    const data = await this.attendanceRepository.findAllAttendances(query);

    return {
      message: ATTENDANCE_MESSAGES.FETCHED_SUCCESS,
      data,
    };
  }
}
