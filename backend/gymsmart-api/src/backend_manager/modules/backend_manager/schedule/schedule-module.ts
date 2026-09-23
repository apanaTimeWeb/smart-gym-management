// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { ScheduleRepository } from '@/backend_manager/modules/backend_manager/schedule/repositories/schedule-repository';
import { ScheduleCommandController } from '@/backend_manager/modules/backend_manager/schedule/schedule-command.controller';
import { ScheduleQueryController } from '@/backend_manager/modules/backend_manager/schedule/schedule-query.controller';
import { ScheduleCreateShiftService } from '@/backend_manager/modules/backend_manager/schedule/services/schedule-create-shift.service';
import { ScheduleDeleteShiftService } from '@/backend_manager/modules/backend_manager/schedule/services/schedule-delete-shift.service';
import { ScheduleFetchScheduleService } from '@/backend_manager/modules/backend_manager/schedule/services/schedule-fetch-schedule.service';
import { ScheduleOrchestratorService } from '@/backend_manager/modules/backend_manager/schedule/services/schedule-orchestrator.service';
import { ScheduleUpdateShiftService } from '@/backend_manager/modules/backend_manager/schedule/services/schedule-update-shift.service';

@Module({
  controllers: [ScheduleQueryController, ScheduleCommandController],
  providers: [ScheduleCreateShiftService, ScheduleUpdateShiftService, ScheduleDeleteShiftService, ScheduleFetchScheduleService, ScheduleRepository, ScheduleOrchestratorService],
  exports: [ScheduleRepository],
})
export class ScheduleModule {}
