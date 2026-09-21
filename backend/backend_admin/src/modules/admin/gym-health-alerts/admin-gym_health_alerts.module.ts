// RESPONSIBILITY: Registers the isolated Admin gym-health-alerts feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminGymHealthAlertsQueryController } from '@/modules/admin/gym-health-alerts/controllers/admin-gym_health_alerts-query.controller';
import { AdminGymHealthAlertsQueryService } from '@/modules/admin/gym-health-alerts/services/admin-gym_health_alerts-query.service';
import { AdminGymHealthAlertsRepository } from '@/modules/admin/gym-health-alerts/repositories/admin-gym_health_alerts-repository';
import { AdminGymHealthAlertsMapper } from '@/modules/admin/gym-health-alerts/mappers/admin-gym_health_alerts.mapper';
import { AdminGymHealthAlertsCommandController } from '@/modules/admin/gym-health-alerts/controllers/admin-gym_health_alerts-command.controller';
import { AdminGymHealthAlertsCommandService } from '@/modules/admin/gym-health-alerts/services/admin-gym_health_alerts-command.service';

@Module({
  controllers: [AdminGymHealthAlertsQueryController, AdminGymHealthAlertsCommandController],
  providers: [AdminGymHealthAlertsQueryService, AdminGymHealthAlertsRepository, AdminGymHealthAlertsMapper, AdminGymHealthAlertsCommandService],
  exports: [],
})
export class AdminGymHealthAlertsModule {}
