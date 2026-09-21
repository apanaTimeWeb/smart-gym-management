// RESPONSIBILITY: Registers the isolated Admin payouts feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminPayoutsQueryController } from '@/backend_admin/modules/admin/payouts/controllers/admin-payouts-query.controller';
import { AdminPayoutsQueryService } from '@/backend_admin/modules/admin/payouts/services/admin-payouts-query.service';
import { AdminPayoutsRepository } from '@/backend_admin/modules/admin/payouts/repositories/admin-payouts-repository';
import { AdminPayoutsMapper } from '@/backend_admin/modules/admin/payouts/mappers/admin-payouts.mapper';

@Module({
  controllers: [AdminPayoutsQueryController],
  providers: [AdminPayoutsQueryService, AdminPayoutsRepository, AdminPayoutsMapper],
  exports: [],
})
export class AdminPayoutsModule {}
