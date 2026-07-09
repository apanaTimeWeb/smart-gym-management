import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Attendance } from '@/modules/attendance/entities/attendance.entity';
import { AttendanceRepository } from '@/modules/attendance/services/attendance.repository';

import { MarkAttendanceService } from '@/modules/attendance/services/mark-attendance.service';
import { FindAttendanceService } from '@/modules/attendance/services/find-attendance.service';
import { AttendanceStatsService } from '@/modules/attendance/services/attendance-stats.service';

import { MarkAttendanceController } from '@/modules/attendance/controllers/mark-attendance.controller';
import { FindAttendanceController } from '@/modules/attendance/controllers/find-attendance.controller';
import { AttendanceStatsController } from '@/modules/attendance/controllers/attendance-stats.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance])],
  controllers: [
    MarkAttendanceController,
    FindAttendanceController,
    AttendanceStatsController,
  ],
  providers: [
    AttendanceRepository,
    MarkAttendanceService,
    FindAttendanceService,
    AttendanceStatsService,
  ],
})
export class AttendanceModule {}
