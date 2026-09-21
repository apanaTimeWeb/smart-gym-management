// RESPONSIBILITY: Registers the isolated Admin coupons feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminCouponsQueryController } from '@/backend_admin/modules/admin/coupons/controllers/admin-coupons-query.controller';
import { AdminCouponsQueryService } from '@/backend_admin/modules/admin/coupons/services/admin-coupons-query.service';
import { AdminCouponsRepository } from '@/backend_admin/modules/admin/coupons/repositories/admin-coupons-repository';
import { AdminCouponsMapper } from '@/backend_admin/modules/admin/coupons/mappers/admin-coupons.mapper';
import { AdminCouponsCommandController } from '@/backend_admin/modules/admin/coupons/controllers/admin-coupons-command.controller';
import { AdminCouponsCommandService } from '@/backend_admin/modules/admin/coupons/services/admin-coupons-command.service';

@Module({
  controllers: [AdminCouponsQueryController, AdminCouponsCommandController],
  providers: [AdminCouponsQueryService, AdminCouponsRepository, AdminCouponsMapper, AdminCouponsCommandService],
  exports: [],
})
export class AdminCouponsModule {}
