// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { AttendanceCommandController } from '@/backend_manager/modules/backend_manager/attendance/attendance-command.controller';
import { AttendanceQueryController } from '@/backend_manager/modules/backend_manager/attendance/attendance-query.controller';
import { AttendanceRepository } from '@/backend_manager/modules/backend_manager/attendance/repositories/attendance-repository';
import { AttendanceFetchAttendanceHistoryService } from '@/backend_manager/modules/backend_manager/attendance/services/attendance-fetch-attendance-history.service';
import { AttendanceFetchAttendanceMembersService } from '@/backend_manager/modules/backend_manager/attendance/services/attendance-fetch-attendance-members.service';
import { AttendanceFetchAttendanceRecordsService } from '@/backend_manager/modules/backend_manager/attendance/services/attendance-fetch-attendance-records.service';
import { AttendanceFetchAttendanceStaffService } from '@/backend_manager/modules/backend_manager/attendance/services/attendance-fetch-attendance-staff.service';
import { AttendanceFetchAttendanceStatsService } from '@/backend_manager/modules/backend_manager/attendance/services/attendance-fetch-attendance-stats.service';
import { AttendanceMarkAttendanceService } from '@/backend_manager/modules/backend_manager/attendance/services/attendance-mark-attendance.service';
import { AttendanceOrchestratorService } from '@/backend_manager/modules/backend_manager/attendance/services/attendance-orchestrator.service';

@Module({
  controllers: [AttendanceQueryController, AttendanceCommandController],
  providers: [AttendanceMarkAttendanceService, AttendanceFetchAttendanceRecordsService, AttendanceFetchAttendanceStatsService, AttendanceFetchAttendanceHistoryService, AttendanceFetchAttendanceMembersService, AttendanceFetchAttendanceStaffService, AttendanceRepository, AttendanceOrchestratorService],
  exports: [AttendanceRepository],
})
export class AttendanceModule {}
