// RESPONSIBILITY: Registers the isolated Admin gym-health-alerts feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminGymHealthAlertsCommandController } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_controllers/admin-gym-health-alerts-command.controller.js';
import { AdminGymHealthAlertsQueryController } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_controllers/admin-gym-health-alerts-query.controller.js';
import { AdminGymHealthAlertsMapper } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_mappers/admin-gym-health-alerts.mapper.js';
import { AdminGymHealthAlertsResponsePresenter } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_mappers/admin-gym-health-alerts.response.presenter.js';
import { AdminGymHealthAlertsRepository } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_repositories/admin-gym-health-alerts-repository.js';
import { AdminGymHealthAlertsCommandService } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_services/admin-gym-health-alerts-command.service.js';
import { AdminGymHealthAlertsQueryService } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_services/admin-gym-health-alerts-query.service.js';

@Module({
  controllers: [AdminGymHealthAlertsQueryController, AdminGymHealthAlertsCommandController],
  providers: [AdminGymHealthAlertsQueryService, AdminGymHealthAlertsRepository, AdminGymHealthAlertsMapper, AdminGymHealthAlertsResponsePresenter, AdminGymHealthAlertsCommandService],
  exports: [],
})
/**
 * @description Defines the AdminGymHealthAlertsModule boundary for the admin_gym-health-alerts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminGymHealthAlertsModule {}
