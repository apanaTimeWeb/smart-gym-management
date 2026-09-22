// RESPONSIBILITY: Registers the isolated Manager attendance feature boundary.
// FLOW: ManagerDomainModule -> AttendanceModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { AttendanceCommandController } from '@/modules/manager/attendance/attendance-command.controller';
import { AttendanceFetchAttendanceHistoryService } from '@/modules/manager/attendance/services/attendance-fetch-attendance-history.service';
import { AttendanceFetchAttendanceMembersService } from '@/modules/manager/attendance/services/attendance-fetch-attendance-members.service';
import { AttendanceFetchAttendanceRecordsService } from '@/modules/manager/attendance/services/attendance-fetch-attendance-records.service';
import { AttendanceFetchAttendanceStaffService } from '@/modules/manager/attendance/services/attendance-fetch-attendance-staff.service';
import { AttendanceFetchAttendanceStatsService } from '@/modules/manager/attendance/services/attendance-fetch-attendance-stats.service';
import { AttendanceMarkAttendanceService } from '@/modules/manager/attendance/services/attendance-mark-attendance.service';
import { AttendanceOrchestratorService } from '@/modules/manager/attendance/services/attendance-orchestrator.service';
import { AttendanceQueryController } from '@/modules/manager/attendance/attendance-query.controller';
import { AttendanceRepository } from '@/modules/manager/attendance/repositories/attendance-repository';

@Module({
  controllers: [AttendanceQueryController, AttendanceCommandController],
  providers: [AttendanceMarkAttendanceService, AttendanceFetchAttendanceRecordsService, AttendanceFetchAttendanceStatsService, AttendanceFetchAttendanceHistoryService, AttendanceFetchAttendanceMembersService, AttendanceFetchAttendanceStaffService, AttendanceRepository, AttendanceOrchestratorService],
  exports: [AttendanceRepository],
})
export class AttendanceModule {}
