// RESPONSIBILITY: Registers the isolated Admin attendance feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminAttendanceQueryController } from '@/backend_admin/admin_modules/admin_attendance/attendance_controllers/admin-attendance-query.controller.js';
import { AdminAttendanceMapper } from '@/backend_admin/admin_modules/admin_attendance/attendance_mappers/admin-attendance.mapper.js';
import { AdminAttendanceResponsePresenter } from '@/backend_admin/admin_modules/admin_attendance/attendance_mappers/admin-attendance.response.presenter.js';
import { AdminAttendanceRepository } from '@/backend_admin/admin_modules/admin_attendance/attendance_repositories/admin-attendance-repository.js';
import { AdminAttendanceQueryService } from '@/backend_admin/admin_modules/admin_attendance/attendance_services/admin-attendance-query.service.js';

@Module({
  controllers: [AdminAttendanceQueryController],
  providers: [AdminAttendanceQueryService, AdminAttendanceRepository, AdminAttendanceMapper, AdminAttendanceResponsePresenter],
  exports: [],
})
/**
 * @description Defines the AdminAttendanceModule boundary for the admin_attendance backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAttendanceModule {}
