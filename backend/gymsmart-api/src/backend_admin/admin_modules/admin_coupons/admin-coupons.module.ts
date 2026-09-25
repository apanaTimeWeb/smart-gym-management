// RESPONSIBILITY: Registers the isolated Admin coupons feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminCouponsCommandController } from '@/backend_admin/admin_modules/admin_coupons/coupons_controllers/admin-coupons-command.controller.js';
import { AdminCouponsQueryController } from '@/backend_admin/admin_modules/admin_coupons/coupons_controllers/admin-coupons-query.controller.js';
import { AdminCouponsMapper } from '@/backend_admin/admin_modules/admin_coupons/coupons_mappers/admin-coupons.mapper.js';
import { AdminCouponsResponsePresenter } from '@/backend_admin/admin_modules/admin_coupons/coupons_mappers/admin-coupons.response.presenter.js';
import { AdminCouponsRepository } from '@/backend_admin/admin_modules/admin_coupons/coupons_repositories/admin-coupons-repository.js';
import { AdminCouponsCommandService } from '@/backend_admin/admin_modules/admin_coupons/coupons_services/admin-coupons-command.service.js';
import { AdminCouponsQueryService } from '@/backend_admin/admin_modules/admin_coupons/coupons_services/admin-coupons-query.service.js';

@Module({
  controllers: [AdminCouponsQueryController, AdminCouponsCommandController],
  providers: [AdminCouponsQueryService, AdminCouponsRepository, AdminCouponsMapper, AdminCouponsResponsePresenter, AdminCouponsCommandService],
  exports: [],
})
/**
 * @description Defines the AdminCouponsModule boundary for the admin_coupons backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCouponsModule {}
