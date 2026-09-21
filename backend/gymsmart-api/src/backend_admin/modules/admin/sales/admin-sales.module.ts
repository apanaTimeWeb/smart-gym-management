// RESPONSIBILITY: Registers the isolated Admin sales feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminSalesQueryController } from '@/backend_admin/modules/admin/sales/controllers/admin-sales-query.controller';
import { AdminSalesQueryService } from '@/backend_admin/modules/admin/sales/services/admin-sales-query.service';
import { AdminSalesRepository } from '@/backend_admin/modules/admin/sales/repositories/admin-sales-repository';
import { AdminSalesMapper } from '@/backend_admin/modules/admin/sales/mappers/admin-sales.mapper';

@Module({
  controllers: [AdminSalesQueryController],
  providers: [AdminSalesQueryService, AdminSalesRepository, AdminSalesMapper],
  exports: [],
})
export class AdminSalesModule {}
