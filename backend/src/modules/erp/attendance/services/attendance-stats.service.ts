import { Injectable, Logger } from '@nestjs/common';
import { AttendanceRepository } from '@/modules/erp/attendance/attendance.repository';
import { ATTENDANCE_MESSAGES } from '@/modules/erp/attendance/attendance.constants';
import type { AttendanceResponse } from '@/modules/erp/attendance/attendance.interfaces';

@Injectable()
export class AttendanceStatsService {
  private readonly logger = new Logger(AttendanceStatsService.name);

  constructor(private readonly attendanceRepository: AttendanceRepository) {}

  async getTodayStats(): Promise<AttendanceResponse> {
    this.logger.log('Fetching today stats for attendance');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const stats = await this.attendanceRepository.getStatsForDateRange(
      today,
      tomorrow,
    );

    return {
      success: true,
      message: ATTENDANCE_MESSAGES.STATS_FETCHED_SUCCESS,
      data: stats,
    };
  }
}
