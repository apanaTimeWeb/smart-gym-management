// RESPONSIBILITY: Registers the isolated Manager schedule feature boundary.
// FLOW: ManagerDomainModule -> ScheduleModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { ScheduleCommandController } from '@/backend_manager/modules/manager/schedule/schedule-command.controller';
import { ScheduleCreateShiftService } from '@/backend_manager/modules/manager/schedule/services/schedule-create-shift.service';
import { ScheduleDeleteShiftService } from '@/backend_manager/modules/manager/schedule/services/schedule-delete-shift.service';
import { ScheduleFetchScheduleService } from '@/backend_manager/modules/manager/schedule/services/schedule-fetch-schedule.service';
import { ScheduleOrchestratorService } from '@/backend_manager/modules/manager/schedule/services/schedule-orchestrator.service';
import { ScheduleQueryController } from '@/backend_manager/modules/manager/schedule/schedule-query.controller';
import { ScheduleRepository } from '@/backend_manager/modules/manager/schedule/repositories/schedule-repository';
import { ScheduleUpdateShiftService } from '@/backend_manager/modules/manager/schedule/services/schedule-update-shift.service';

@Module({
  controllers: [ScheduleQueryController, ScheduleCommandController],
  providers: [ScheduleCreateShiftService, ScheduleUpdateShiftService, ScheduleDeleteShiftService, ScheduleFetchScheduleService, ScheduleRepository, ScheduleOrchestratorService],
  exports: [ScheduleRepository],
})
export class ScheduleModule {}
