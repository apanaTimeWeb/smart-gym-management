// RESPONSIBILITY: Registers the isolated Admin sales feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminSalesQueryController } from '@/backend_admin/admin_modules/admin_sales/sales_controllers/admin-sales-query.controller'
import { AdminSalesMapper } from '@/backend_admin/admin_modules/admin_sales/sales_mappers/admin-sales.mapper'
import { AdminSalesResponsePresenter } from '@/backend_admin/admin_modules/admin_sales/sales_mappers/admin-sales.response.presenter'
import { AdminSalesRepository } from '@/backend_admin/admin_modules/admin_sales/sales_repositories/admin-sales-repository'
import { AdminSalesQueryService } from '@/backend_admin/admin_modules/admin_sales/sales_services/admin-sales-query.service'

@Module({
  controllers: [AdminSalesQueryController],
  providers: [AdminSalesQueryService, AdminSalesRepository, AdminSalesMapper, AdminSalesResponsePresenter],
  exports: [],
})
/**
 * @description Defines the AdminSalesModule boundary for the admin_sales backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSalesModule {}
