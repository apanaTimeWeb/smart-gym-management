import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Attendance } from '@/modules/erp/attendance/entities/attendance.entity';
import { AttendanceRepository } from '@/modules/erp/attendance/attendance.repository';

import { MarkAttendanceService } from '@/modules/erp/attendance/services/mark-attendance.service';
import { FindAttendanceService } from '@/modules/erp/attendance/services/find-attendance.service';
import { AttendanceStatsService } from '@/modules/erp/attendance/services/attendance-stats.service';

import { MarkAttendanceController } from '@/modules/erp/attendance/controllers/mark-attendance.controller';
import { FindAttendanceController } from '@/modules/erp/attendance/controllers/find-attendance.controller';
import { AttendanceStatsController } from '@/modules/erp/attendance/controllers/attendance-stats.controller';

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
