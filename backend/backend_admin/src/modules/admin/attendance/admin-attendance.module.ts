// RESPONSIBILITY: Registers the isolated Admin attendance feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminAttendanceQueryController } from '@/modules/admin/attendance/controllers/admin-attendance-query.controller';
import { AdminAttendanceQueryService } from '@/modules/admin/attendance/services/admin-attendance-query.service';
import { AdminAttendanceRepository } from '@/modules/admin/attendance/repositories/admin-attendance-repository';
import { AdminAttendanceMapper } from '@/modules/admin/attendance/mappers/admin-attendance.mapper';

@Module({
  controllers: [AdminAttendanceQueryController],
  providers: [AdminAttendanceQueryService, AdminAttendanceRepository, AdminAttendanceMapper],
  exports: [],
})
export class AdminAttendanceModule {}
