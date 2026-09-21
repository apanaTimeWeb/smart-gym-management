// RESPONSIBILITY: Registers the isolated Admin payouts feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminPayoutsQueryController } from '@/modules/admin/payouts/controllers/admin-payouts-query.controller';
import { AdminPayoutsQueryService } from '@/modules/admin/payouts/services/admin-payouts-query.service';
import { AdminPayoutsRepository } from '@/modules/admin/payouts/repositories/admin-payouts-repository';
import { AdminPayoutsMapper } from '@/modules/admin/payouts/mappers/admin-payouts.mapper';

@Module({
  controllers: [AdminPayoutsQueryController],
  providers: [AdminPayoutsQueryService, AdminPayoutsRepository, AdminPayoutsMapper],
  exports: [],
})
export class AdminPayoutsModule {}
