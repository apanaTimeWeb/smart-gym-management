import { TypeOrmModule } from '@nestjs/typeorm';
// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerScheduleEntity } from '@/backend_manager/manager_modules/schedule/manager-schedule.entity';
import { ManagerScheduleMutationService } from '@/backend_manager/manager_modules/schedule/schedule_services/manager-schedule-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerScheduleAuthorizationService } from '@/backend_manager/manager_modules/schedule/schedule_services/manager-schedule-authorization.service';

import { ManagerScheduleRepository } from '@/backend_manager/manager_modules/schedule/manager-schedule.repository';
import { ManagerScheduleCommandController } from '@/backend_manager/manager_modules/schedule/manager-schedule-command.controller';
import { ManagerScheduleQueryController } from '@/backend_manager/manager_modules/schedule/manager-schedule-query.controller';
import { ManagerScheduleCreateShiftService } from '@/backend_manager/manager_modules/schedule/schedule_services/manager-schedule-create-shift.service';
import { ManagerScheduleDeleteShiftService } from '@/backend_manager/manager_modules/schedule/schedule_services/manager-schedule-delete-shift.service';
import { ManagerScheduleFindScheduleService } from '@/backend_manager/manager_modules/schedule/schedule_services/manager-schedule-find-schedule.service';
import { ManagerScheduleOrchestratorService } from '@/backend_manager/manager_modules/schedule/schedule_services/manager-schedule-orchestrator.service';
import { ManagerScheduleUpdateShiftService } from '@/backend_manager/manager_modules/schedule/schedule_services/manager-schedule-update-shift.service';

/**
 * Primary Intent: Defines ManagerScheduleModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([ManagerScheduleEntity])],
  controllers: [ManagerScheduleQueryController, ManagerScheduleCommandController],
  providers: [ManagerScheduleMutationService, ManagerScheduleCreateShiftService, ManagerScheduleUpdateShiftService, ManagerScheduleDeleteShiftService, ManagerScheduleFindScheduleService, ManagerScheduleRepository, ManagerScheduleOrchestratorService,
  ManagerScheduleAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:schedule`, useFactory: (authorization: ManagerScheduleAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('schedule', authorization); return authorization; }, inject: [ManagerScheduleAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerScheduleRepository],
})
export class ManagerScheduleModule {}

export { ManagerScheduleModule as ScheduleModule };
