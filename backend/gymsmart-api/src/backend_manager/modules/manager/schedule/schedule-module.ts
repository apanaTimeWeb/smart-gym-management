// RESPONSIBILITY: Registers the isolated Manager schedule feature boundary.
// FLOW: ManagerDomainModule -> ScheduleModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { ScheduleCommandController } from '@/modules/manager/schedule/schedule-command.controller';
import { ScheduleCreateShiftService } from '@/modules/manager/schedule/services/schedule-create-shift.service';
import { ScheduleDeleteShiftService } from '@/modules/manager/schedule/services/schedule-delete-shift.service';
import { ScheduleFetchScheduleService } from '@/modules/manager/schedule/services/schedule-fetch-schedule.service';
import { ScheduleOrchestratorService } from '@/modules/manager/schedule/services/schedule-orchestrator.service';
import { ScheduleQueryController } from '@/modules/manager/schedule/schedule-query.controller';
import { ScheduleRepository } from '@/modules/manager/schedule/repositories/schedule-repository';
import { ScheduleUpdateShiftService } from '@/modules/manager/schedule/services/schedule-update-shift.service';

@Module({
  controllers: [ScheduleQueryController, ScheduleCommandController],
  providers: [ScheduleCreateShiftService, ScheduleUpdateShiftService, ScheduleDeleteShiftService, ScheduleFetchScheduleService, ScheduleRepository, ScheduleOrchestratorService],
  exports: [ScheduleRepository],
})
export class ScheduleModule {}
