// RESPONSIBILITY: Registers the isolated Admin attendance feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminAttendanceQueryController } from '@/backend_admin/modules/admin/attendance/controllers/admin-attendance-query.controller';
import { AdminAttendanceQueryService } from '@/backend_admin/modules/admin/attendance/services/admin-attendance-query.service';
import { AdminAttendanceRepository } from '@/backend_admin/modules/admin/attendance/repositories/admin-attendance-repository';
import { AdminAttendanceMapper } from '@/backend_admin/modules/admin/attendance/mappers/admin-attendance.mapper';

@Module({
  controllers: [AdminAttendanceQueryController],
  providers: [AdminAttendanceQueryService, AdminAttendanceRepository, AdminAttendanceMapper],
  exports: [],
})
export class AdminAttendanceModule {}
