import { TypeOrmModule } from '@nestjs/typeorm';
// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerAttendanceEntity } from '@/backend_manager/manager_modules/attendance/manager-attendance.entity';
import { ManagerAttendanceMutationService } from '@/backend_manager/manager_modules/attendance/attendance_services/manager-attendance-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerAttendanceAuthorizationService } from '@/backend_manager/manager_modules/attendance/attendance_services/manager-attendance-authorization.service';

import { ManagerAttendanceCommandController } from '@/backend_manager/manager_modules/attendance/manager-attendance-command.controller';
import { ManagerAttendanceQueryController } from '@/backend_manager/manager_modules/attendance/manager-attendance-query.controller';
import { ManagerAttendanceRepository } from '@/backend_manager/manager_modules/attendance/manager-attendance.repository';
import { ManagerAttendanceFindAttendanceHistoryService } from '@/backend_manager/manager_modules/attendance/attendance_services/manager-attendance-find-attendance-history.service';
import { ManagerAttendanceFindAttendanceMembersService } from '@/backend_manager/manager_modules/attendance/attendance_services/manager-attendance-find-attendance-members.service';
import { ManagerAttendanceFindAttendanceRecordsService } from '@/backend_manager/manager_modules/attendance/attendance_services/manager-attendance-find-attendance-records.service';
import { ManagerAttendanceFindAttendanceStaffService } from '@/backend_manager/manager_modules/attendance/attendance_services/manager-attendance-find-attendance-staff.service';
import { ManagerAttendanceFindAttendanceStatsService } from '@/backend_manager/manager_modules/attendance/attendance_services/manager-attendance-find-attendance-stats.service';
import { ManagerAttendanceMarkAttendanceService } from '@/backend_manager/manager_modules/attendance/attendance_services/manager-attendance-mark-attendance.service';
import { ManagerAttendanceOrchestratorService } from '@/backend_manager/manager_modules/attendance/attendance_services/manager-attendance-orchestrator.service';

/**
 * Primary Intent: Defines ManagerAttendanceModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([ManagerAttendanceEntity])],
  controllers: [ManagerAttendanceQueryController, ManagerAttendanceCommandController],
  providers: [ManagerAttendanceMutationService, ManagerAttendanceMarkAttendanceService, ManagerAttendanceFindAttendanceRecordsService, ManagerAttendanceFindAttendanceStatsService, ManagerAttendanceFindAttendanceHistoryService, ManagerAttendanceFindAttendanceMembersService, ManagerAttendanceFindAttendanceStaffService, ManagerAttendanceRepository, ManagerAttendanceOrchestratorService,
  ManagerAttendanceAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:attendance`, useFactory: (authorization: ManagerAttendanceAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('attendance', authorization); return authorization; }, inject: [ManagerAttendanceAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerAttendanceRepository],
})
export class ManagerAttendanceModule {}

export { ManagerAttendanceModule as AttendanceModule };
