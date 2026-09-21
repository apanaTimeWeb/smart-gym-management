// RESPONSIBILITY: Registers the isolated Admin finance feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminFinanceQueryController } from '@/backend_admin/modules/admin/finance/controllers/admin-finance-query.controller';
import { AdminFinanceQueryService } from '@/backend_admin/modules/admin/finance/services/admin-finance-query.service';
import { AdminFinanceRepository } from '@/backend_admin/modules/admin/finance/repositories/admin-finance-repository';
import { AdminFinanceMapper } from '@/backend_admin/modules/admin/finance/mappers/admin-finance.mapper';

@Module({
  controllers: [AdminFinanceQueryController],
  providers: [AdminFinanceQueryService, AdminFinanceRepository, AdminFinanceMapper],
  exports: [],
})
export class AdminFinanceModule {}
