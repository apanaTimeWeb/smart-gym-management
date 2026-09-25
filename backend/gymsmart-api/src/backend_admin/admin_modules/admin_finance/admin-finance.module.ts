// RESPONSIBILITY: Registers the isolated Admin finance feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.
import { Module } from '@nestjs/common';

import { AdminFinanceQueryController } from '@/backend_admin/admin_modules/admin_finance/finance_controllers/admin-finance-query.controller.js';
import { AdminFinanceMapper } from '@/backend_admin/admin_modules/admin_finance/finance_mappers/admin-finance.mapper.js';
import { AdminFinanceResponsePresenter } from '@/backend_admin/admin_modules/admin_finance/finance_mappers/admin-finance.response.presenter.js';
import { AdminFinanceRepository } from '@/backend_admin/admin_modules/admin_finance/finance_repositories/admin-finance-repository.js';
import { AdminFinanceQueryService } from '@/backend_admin/admin_modules/admin_finance/finance_services/admin-finance-query.service.js';

@Module({
  controllers: [AdminFinanceQueryController],
  providers: [AdminFinanceQueryService, AdminFinanceRepository, AdminFinanceMapper, AdminFinanceResponsePresenter],
  exports: [],
})
/**
 * @description Defines the AdminFinanceModule boundary for the admin_finance backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminFinanceModule {}
