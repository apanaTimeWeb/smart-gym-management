// RESPONSIBILITY: Registers the isolated Admin payouts feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminPayoutsQueryController } from '@/backend_admin/admin_modules/admin_payouts/payouts_controllers/admin-payouts-query.controller.js';
import { AdminPayoutsMapper } from '@/backend_admin/admin_modules/admin_payouts/payouts_mappers/admin-payouts.mapper.js';
import { AdminPayoutsResponsePresenter } from '@/backend_admin/admin_modules/admin_payouts/payouts_mappers/admin-payouts.response.presenter.js';
import { AdminPayoutsRepository } from '@/backend_admin/admin_modules/admin_payouts/payouts_repositories/admin-payouts-repository.js';
import { AdminPayoutsQueryService } from '@/backend_admin/admin_modules/admin_payouts/payouts_services/admin-payouts-query.service.js';

@Module({
  controllers: [AdminPayoutsQueryController],
  providers: [AdminPayoutsQueryService, AdminPayoutsRepository, AdminPayoutsMapper, AdminPayoutsResponsePresenter],
  exports: [],
})
/**
 * @description Defines the AdminPayoutsModule boundary for the admin_payouts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPayoutsModule {}
